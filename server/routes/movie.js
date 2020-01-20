var Movie = require("./mongoose") // 导入mongodb数据库模块

var express = require('express');
var router = express.Router();

/* 获取电影列表 */
router.get('/', function (req, res, next) {
    res.send(1)
});

module.exports = router;