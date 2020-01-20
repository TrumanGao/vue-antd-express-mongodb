// 该文件用于编写mongodb代码
var mongoose = require('mongoose'); // 引入mongoose

// 一、连接数据库
// 旧写法
// mongoose.connect('mongodb://localhost:27017/movie') //连接本地数据库
// // connect() 返回一个状态待定（pending）的连接，可以用来判断连接成功或失败
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("Successful connection to mongodb://localhost:27017/movie")
// });

// 新写法
mongoose.connect('mongodb://localhost:27017/movie', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.log('连接失败:', err)
    } else {
        console.log('连接成功！')
    }
})

// 二、建表（集合collection）
var Schema = mongoose.Schema //schema 都会映射到一个 MongoDB collection

var movieSchema = Schema({
    name: String,
    country: Array,
    release_year: Number,
    director: Array,
    cast: Array,
    genre: Array,
})
var Movie = mongoose.model('Movie', movieSchema); //将schema编译为model构造函数

// 常见的 String , Number , Date , Buffer , Boolean , Array ,
// Mixed： 一个啥都可以放的 SchemaType，虽然便利，但也会让数据难以维护，
// ObjectId：指定类型为 ObjectId，即“主键”，
// Decimal128：自定义的Type

// new Movie({
//     name: "肖申克的救赎",
//     country: ['美国'],
//     release_year: 1994,
//     director: ["Frank Darabont"]
// }).save() // Mongoose 会自动找到名称是 model 名字复数形式的 collection

module.exports = Movie
