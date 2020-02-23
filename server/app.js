var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser'); // 调用bodyParser模块以便程序正确解析body传入json值

// 引入接口代码
var indexRouter = require('./routes/index')
var userRouter = require('./routes/user')
var movieRouter = require('./routes/movie')
var celebrityRouter = require('./routes/celebrity')

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
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, TOKEN'); // 允许的header类型,如果没有配置,会出现跨域问题
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
app.use('/user', userRouter);
app.use('/movie', movieRouter)
app.use('/celebrity', celebrityRouter)

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
