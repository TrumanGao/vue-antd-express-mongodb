var Movie = require("../modules/movie") // 导入mongodb数据库模块

// 上传文件
let fs = require('fs');
let formidable = require('formidable');
let sd = require('silly-datetime'); // 时间格式化插件

var express = require('express');
var router = express.Router();

/* 查询电影列表 */
router.get('/', function(req, res, next) {
	// console.log('查询电影参数', req.query)
	let {
		keyword,
		current,
		pageSize,
		sortField,
		sortOrder,
		genre
	} = req.query
	current = Number(current)
	pageSize = Number(pageSize)
	// console.log('分页', current, pageSize)

	let searchConfig = {}
	if (keyword || genre) {
		searchConfig['$or'] = []
		if (keyword) {
			// console.log('有关键字', keyword)
			searchConfig['$or'] = [{
					name: {
						$regex: keyword // $regex 正则，用于模糊查询
					}
				},
				{
					privateName: {
						$regex: keyword,
						$options: '$i' // 不区分大小写
					}
				},
				{
					director: {
						$elemMatch: {
							$eq: keyword // director数组内查询值为keyword的元素
						}
					}
				},
				{
					cast: {
						$elemMatch: {
							$eq: keyword // cast数组内查询值为keyword的元素
						}
					}
				},
			]
		}

		if (genre) {
			// console.log('有类型', JSON.parse(genre))
			if (keyword) {
				JSON.parse(genre).forEach(item => {
					searchConfig['$or'].forEach(item2 => {
						item2.genre = {
							$elemMatch: {
								$eq: item
							}
						}
					})
				})
			} else {
				JSON.parse(genre).forEach(item => {
					searchConfig['$or'].push({
						genre: {
							$elemMatch: {
								$eq: item
							}
						}
					})
				})
			}
		}
	}

	let sortConfig = {}
	if (sortField) {
		sortConfig[sortField] = sortOrder
		// console.log('有排序规则', sortConfig)
	}

	// console.log('最终查询配置', JSON.stringify(searchConfig))
	Movie.countDocuments(searchConfig, (err, total) => {
		if (err) {
			return res.json({
				message: '查询失败',
				code: 2000,
				data: err
			})
		}

		Movie.find(searchConfig).skip((current - 1) * pageSize).limit(pageSize).collation({
			locale: 'zh'
		}).sort(sortConfig).exec(function(err, doc) {
			if (err) {
				return res.json({
					message: '查询失败',
					code: 2000,
					data: err
				})
			}
			return res.json({
				message: '查询成功',
				code: 200,
				data: {
					list: doc,
					total,
				},
			})
		})
	})
});

// 上传电影图片
router.post('/picture', function(req, res, next) {
	// console.log('上传文件req:', req)
	// 创建上传表单对象
	var form = new formidable.IncomingForm();
	// 设置编码格式, 解决中文乱码
	form.encoding = 'utf-8';
	// 设置上传目录
	form.uploadDir = '../server/public/pictures/movie';
	// 保留后缀
	form.keepExtensions = true;
	// 限制所有存储表单字段域的大小（除去file字段），如果超出，则会触发error事件，默认为2M
	form.maxFieldsSize = 2 * 1024 * 1024;
	form.multiples = true; // 开启该功能，当调用form.parse()方法时，回调函数的files参数将会是一个file数组，数组每一个成员是一个File对象，此功能需要 html5中multiple特性支持。

	form.parse(req, function(err, fields, files) { // 该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
		filesFile = files.file
		if (err) {
			return res.json({
				code: 500,
				message: "内部服务器错误",
				data: err
			})
		}
		// 限制文件大小 单位默认字节 这里限制大小为2m
		if (filesFile.size > form.maxFieldsSize) {
			fs.unlink(filesFile.path) // 删除文件操作
			return res.json({
				code: 2000,
				message: "图片大小不能超过2M",
				data: filesFile
			})
		}
		// 设置后缀名
		var extName = '';
		switch (filesFile.type) {
			case 'image/pjpeg':
				extName = 'jpg';
				break;
			case 'image/jpeg':
				extName = 'jpg';
				break;
			case 'image/png':
				extName = 'png';
				break;
			case 'image/x-png':
				extName = 'png';
				break;
		}
		if (extName.length == 0) {
			return res.json({
				code: 2000,
				message: "只支持png和jpg格式图片",
				data: filesFile
			})
		}
		//使用第三方模块silly-datetime，生成当前时间
		var t = sd.format(new Date(), 'YYYYMMDDHHmmss');
		//生成随机数
		var ran = parseInt(Math.random() * 8999 + 10000);
		// 生成新图片名称
		var picName = t + '_' + ran + '.' + extName;
		// 新图片路径
		var newPath = form.uploadDir + '/' + picName;
		// 更改名字和路径 (原路径, 新路径, 回调-传递一个err异常参数)
		fs.rename(filesFile.path, newPath, function(err) {
			if (err) {
				return res.json({
					code: 2000,
					message: "图片上传失败",
					data: err
				})
			} else {
				return res.json({
					code: 200,
					message: "图片上传成功",
					data: '/pictures/movie/' + picName
				})
			}
		})
	})
})

// 添加电影
router.post('/', function(req, res, next) {
	var data = {
		name,
		privateName,
		director,
		writer,
		cast,
		genre,
		country,
		release_year,
		release_date,
		subjectId,
		imdbId,
		fileList,
	} = { ...req.body
	}
	data.director = data.director ? data.director.split(" ") : []
	data.writer = data.writer ? data.writer.split(" ") : []
	data.cast = data.cast ? data.cast.split(" ") : []
	data.country = data.country ? data.country.split(" ") : []
	data.fileList = data.fileList && data.fileList.length > 0 ? JSON.parse(data.fileList) : []
	Movie.create(data, (err) => {
		if (err) {
			return res.json({
				code: 2000,
				message: '添加电影失败',
				data: err,
			})
		}
		res.json({
			code: 200,
			message: '添加电影成功',
			data,
		})
	})
})

// 编辑电影
router.put('/', function(req, res, next) {
	// console.log('编辑电影参数', req.body)
	condiction = {
		subjectId: req.body.subjectId
	}
	query = {
		$set: req.body
	}

	Movie.update(condiction, query, (err, result) => {
		if (err) {
			return res.json({
				code: 2000,
				message: '编辑电影失败',
				data: err,
			})
		}
		res.json({
			code: 200,
			message: '编辑电影成功',
			data: result,
		})
	})
})

// 删除电影
router.delete('/delete', function(req, res, next) {
	Movie.remove({
		subjectId: req.query.subjectId
	}, (err, result) => {
		if (err) {
			return res.json({
				code: 2000,
				message: '删除电影失败',
				data: err,
			})
		}
		res.json({
			code: 200,
			message: '删除电影成功',
			data: result,
		})
	})
})


module.exports = router;
