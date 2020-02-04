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
		privateName: req.body.privateName, 
		director: req.body.director, 
		writer: req.body.writer, 
		cast: req.body.cast, 
		genre: req.body.genre, 
		country: req.body.country, 
		language: req.body.language, 
		release_year: req.body.release_year, 
		release_date: req.body.release_date, 
		doubanId: req.body.doubanId, 
		imdbId: req.body.imdbId, 
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
