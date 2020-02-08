var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser'); // 引入JSON解析中间件

// 上传文件
// let fs = require('fs');
// let formidable = require('formidable');
// let sd = require('silly-datetime'); // 时间格式化插件


// 引入接口代码
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var movieRouter = require('./routes/movie')

var app = express();

// 添加json解析
app.use(bodyParser.json()); // 添加JSON解析
app.use(bodyParser.urlencoded({
	extended: false
}));

// 处理跨域
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // 允许的域
	res.header('Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'); // 允许的header类型
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	if (req.method == "OPTIONS") {
		res.send(200); /*让options请求快速返回*/
	} else {
		next();
	}

})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movie', movieRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
