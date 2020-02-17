// 该文件用于编写mongodb代码
var mongoose = require('mongoose'); // 引入mongoose

// 一、连接数据库
// 旧写法
// mongoose.connect('mongodb://localhost:27017/movie') //连接本地数据库
// // connect() 返回一个状态待定（pending）的连接，可以用来判断连接成功或失败
// 新写法
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

// 二、创建集合 collection (建表), 定义集合的索引 index (定义表的字段)
// Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 collection ，并定义这个collection里的文档的构成(索引 indexes, 相当于表头)。mongoose.Schema() 用于插入数据
var movieSchema = mongoose.Schema({
	name: String,
	country: Array,
	release_year: {
		type: Number,
		min: 1895,
	},
	director: Array,
	cast: Array,
	genre: Array,
	updated: {
		type: Date,
		default: Date.now
	},
})
// 允许使用的 SchemaTypes 有: Number, String, Date, Buffer, Boolean, Mixed, ObjectId, Array
// Mixed： 一个啥都可以放的 SchemaType，虽然便利，但也会让数据难以维护，
// ObjectId：指定类型为 ObjectId，即“主键”

// 三. 定义数据库模型(model), 操作数据库
let Movie = mongoose.model('Movie', movieSchema, 'movie'); //将schema编译为model构造函数(参数一: 首字母大写, 要和集合名称对应; 参数三是操作的collection的名称，若缺省，默认为参数name值的复数形式)

Movie.update({}, {"$rename" : {doubanId : "subjectId"}}, {safe: false, multi: true})
// 3-1. 增加数据
// documents 是 Models 的实例。 Document 有很多自带的实例方法， 当然也可以自定义方法
// 每个 document 会在调用他的 save 方法后保存到数据库。 注意回调函数的第一个参数永远是 error 。
// let movie = new Movie({
// 	name: "肖申克的救赎",
// 	country: ['美国'],
// 	director: ["Frank Darabont"]
// })
// movie.save(function(err, res) {
// 	if (err) return console.error('创建实例失败', err);
// 	res.speak();
// }) // Mongoose 会自动找到名称是 model 名字复数形式的 collection

// 3-2. 删除数据
// Movie.deleteOne({
// 	"country": ["美国"]
// }, (err, res) => {
// 	if (err) {
// 		console.log('删除失败', err)
// 		return
// 	}
// 	console.log('删除成功', res)
// })

// 3-3. 修改数据
// 参数一: 选中的索引;
// 参数二: 要修改的数据;
// 参数三: 执行的回调函数
// Movie.updateOne({
// 	"name": "肖申克的救赎"
// }, {
// 	"release_year": 1994
// }, function(err, doc) {
// 	if (err) {
// 		console.log('修改失败', err)
// 		return
// 	}
// 	console.log('修改成功', doc)
// })


// 3-4. 查询Movie中的数据
// Movie.find({}, function(err, doc) {
// 	if (err) {
// 		console.log('查询失败', err)
// 		return
// 	}
// 	console.log('查询成功', doc)
// })


// // 聚合管道示例代码
// var key1 =  {  carrier : "$carrier" , lang : "$lang"}
// var query1 = { '$or' : [{'impCount': {'$gt' : 3}},{'impCount': {'$lt' : 16}}] }
// var sort1 =  { os: -1 }
// var limit1 = 3
// var skip1 = 0
// Movie.aggregate(
// 	[{
// 			$match: query1
// 		},
// 		{
// 			$group: {
// 				_id: key1,
// 				ImpCount: {
// 					$sum: "$impCount"
// 				},
// 				ClickCount: {
// 					$sum: "$clickCount"
// 				}
// 			}
// 		},
// 		{
// 			$sort: sort1
// 		},
// 		{
// 			$limit: limit1
// 		},
// 		{
// 			$skip: skip1
// 		}
// 	],
// 	function(e, docs) {
// 		if (e)
// 			console.log(e.message);
// 		res.send(JSON.stringify(docs));
// 	}
// )

module.exports = {
	mongoose,
	Movie
}
