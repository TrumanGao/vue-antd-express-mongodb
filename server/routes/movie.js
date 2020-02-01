var Movie = require("../modules/movie") // 导入mongodb数据库模块

var express = require('express');
var router = express.Router();

/* 查询电影列表 */
router.get('/', function(req, res, next) {
	Movie.find({}, function(err, doc) {
		if (err) {
			console.log('查询失败', err)
			return
		}
		console.log('查询电影成功', doc)

		res.send(doc)
	})
});

router.post('/add', function(req, res, next) {
	var data = {
		name: req.body.name,
		release_year: 1900,
	}
	Movie.create(data, (err) => {
		if (err) {
			console.log('添加电影失败', err)
			return
		}
		console.log('添加电影成功')
		res.send('添加电影成功')
	})
})


module.exports = router;
