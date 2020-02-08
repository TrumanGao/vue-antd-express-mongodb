// 该模块用于操作movie表
var mongoose = require('./db.js') // 引入数据库基础模块, 连接数据库

// 创建集合 collection (建表), 定义集合的索引 index (定义表的字段)
// Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 collection ，并定义这个collection里的文档的构成(索引 indexes, 相当于表头)
var movieSchema = mongoose.Schema({
	name: {
		type: String,
		default: '',
	}, // 中文名
	privateName: {
		type: String,
		default: '',
	}, // 原名
	director: {
		type: Array,
		default: [],
	}, // 导演
	writer: {
		type: Array,
		default: [],
	}, // 编剧
	cast: {
		type: Array,
		default: [],
	}, // 演员
	genre: {
		type: Array,
		default: [],
	}, // 类型
	country: {
		type: Array,
		default: [],
	}, // 制片国家/地区
	release_year: { // 上映年份
		type: String,
		default: ''
	},
	release_date: { // 上映日期
		type: String,
		default: '',
	},
	doubanId: {
		type: String,
		default: '',
	},
	imdbId: {
		type: String,
		default: '',
	}, // imdbID
	updated: { // 添加日期
		type: Date,
		default: Date.now
	},
	fileList: {
		type: Array,
		default: []
	},
})
// 允许使用的 SchemaTypes 有: Number, String, Date, Buffer, Boolean, Mixed, ObjectId, Array
// Mixed： 一个啥都可以放的 SchemaType，虽然便利，但也会让数据难以维护，
// ObjectId：指定类型为 ObjectId，即“主键”

// 定义数据库模型(model), 操作数据库
let Movie = mongoose.model('Movie', movieSchema, 'movie'); //将schema编译为model构造函数(参数一: 首字母大写, 要和集合名称对应; 参数三是操作的collection的名称，若缺省，默认为参数name值的复数形式)

module.exports = Movie
