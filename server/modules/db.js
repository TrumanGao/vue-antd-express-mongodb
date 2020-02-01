// 该模块用于连接数据库
var mongoose = require('mongoose'); // 引入mongoose

// 一、连接数据库
mongoose.connect('mongodb://localhost:27017/movie', {
	useNewUrlParser: true, // mongodb4.0开始, 需要新的URL解释器
	useUnifiedTopology: true
}, function(err) {
	if (err) {
		console.log('数据库连接失败', err)
		return
	}
	console.log('数据库连接成功')
})
module.exports = mongoose