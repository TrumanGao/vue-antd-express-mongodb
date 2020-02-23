// 该模块用于操作user表
var mongoose = require('./db.js') // 引入数据库基础模块, 连接数据库

var userSchema = mongoose.Schema({
	username: {
		type: String,
		default: '',
		unique: true,
	},
	avatar: {
		type: String,
		default: '',
	},
	password: {
		type: String,
		default: '',
		set(val) { // 字定义方法,转化值
			return require('bcrypt').hashSync(val, 10) // 引入散列模块,用于密码加密.同步方法散列密码
		},
	},
	mobile: {
		type: String,
		default: '',
	},
	email: {
		type: String,
		default: '',
	},
	realname: {
		type: String,
		default: '',
	},
	gender: {
		type: Number,
		default: 3, // 1 男 2 女 3 保密
	},
	nationality: { // 国籍
		type: String,
		default: ''
	},
	birthday: {
		type: Date,
		default: new Date('1900-01-01')
	},
	usual_address: {
		type: String,
		default: ''
	},
	updated: { // 添加日期
		type: Date,
		default: Date.now
	},
})

// 定义数据库模型(model), 操作数据库
let User = mongoose.model('User', userSchema, 'user'); //将schema编译为model构造函数(参数一: 首字母大写, 要和集合名称对应; 参数三是操作的collection的名称，若缺省，默认为参数name值的复数形式)

// User.db.dropCollection('user') // 删除集合

module.exports = User
