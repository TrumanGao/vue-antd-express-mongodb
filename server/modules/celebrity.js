// 该模块用于操作celebrity表
var mongoose = require('./db.js') // 引入数据库基础模块, 连接数据库

// 创建集合 collection (建表), 定义集合的索引 index (定义表的字段)
// Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 collection ，并定义这个collection里的文档的构成(索引 indexes, 相当于表头)
var celebritySchema = mongoose.Schema({
	name: {
		type: String,
		default: ''
	},
	privateName: {
		type: String,
		default: '',
	},
	gender: {
		type: Number,
		default: 1, // 1 男 2 女
	},
	nationality: { // 国籍
		type: String,
		default: ''
	},
	birthday: {
		type: Date,
		default: new Date('1900-01-01')
	},
	birthplace: {
		type: String,
		default: ''
	},
	celebrityId: {
		type: String,
		default: '',
	},
	imdbId: {
		type: String,
		default: ''
	},
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
let Celebrity = mongoose.model('Celebrity', celebritySchema, 'celebrity'); //将schema编译为model构造函数(参数一: 首字母大写, 要和集合名称对应; 参数三是操作的collection的名称，若缺省，默认为参数name值的复数形式)

module.exports = Celebrity
