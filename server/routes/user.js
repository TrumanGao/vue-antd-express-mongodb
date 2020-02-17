const User = require('../modules/user')

const jwt = require('jsonwebtoken')
const SECRET = 'gfx93728' // 密钥, 实际开发中应写在本地文件中, 与代码分开


const express = require('express');
const router = express.Router();

// 用户鉴权中间件, 用于需要登录权限才能访问的接口
const authMiddleware = async (req, res, next) => {
	console.log('用户鉴权', JSON.parse(JSON.stringify(req.headers.token)))
	const raw = String(req.headers.token) // token原始值
	if (!raw) {
		return res.json({
			code: 1000,
			message: '用户未登录',
			data: req.headers.token,
		})
	}
	const {
		id
	} = jwt.verify(raw, SECRET) // 用密钥解token, 获取登录时生成token的id
	req.user = await User.findById(id) // 把user赋值到req上, 以便next下一个中间件访问
	if (!req.user) {
		return res.json({
			code: 1001,
			message: '用户不存在'
		})
	}
	next()
}

// 获取用户信息
router.get('/', authMiddleware, (req, res, next) => {
	res.json({
		code: 200,
		message: '获取用户信息成功',
		data: req.user
	})
})

/* 用户登录 */
router.post('/login', async (req, res, next) => {
	const user = await User.findOne({ // 先根据用户名获取用户
		username: req.body.username
	})
	if (!user) {
		return res.json({
			code: 1001,
			message: '用户不存在',
			data: '',
		})
	}
	const isPasswordVaild = require('bcrypt').compareSync(req.body.password, user.password) // 对比用户输入密码(明文)和数据库储存密码(加密)
	if (!isPasswordVaild) {
		return res.json({
			code: 1001,
			message: '密码错误',
			data: '',
		})
	}

	// 生成token: 现在restful接口倾向于无状态连接,所以通常不用session, 用jwt token
	const token = jwt.sign({ // 用jwt生成token,参数一来自用户数据,必须是唯一值; 参数二是密钥,用于解token
		id: String(user._id)
	}, SECRET)

	res.json({
		code: 200,
		message: '登录成功',
		data: token,
	})
});

// 退出登录
router.post('/logout', (req, res)=>{
	res.json({
		code: 200,
		message: '退出登录成功',
		data: ''
	})
})

// 用户注册
router.post('/register', function(req, res, next) {
	console.log('注册req', req.body)
	User.create({
		username: req.body.username,
		password: req.body.password,
		mobile: req.body.mobile,
		email: req.body.email,
		realname: req.body.realname,
		gender: req.body.gender,
		nationality: req.body.nationality,
		birthday: req.body.birthday,
		address: req.body.address,
	}, (err, data) => {
		if (err) {
			return res.json({
				code: 2000,
				message: '注册失败',
				data: err,
			})
		}
		res.json({
			code: 200,
			message: '注册成功',
			data,
		})
	})
});

module.exports = router;
