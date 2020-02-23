import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isRegisterLogin: false, // 是否显示登录注册组件
		registerLoginType: 1, // 1 登录 2 注册
		token: '', // token
		userInfo: "", // 用户信息
	},
	mutations: {
		setIsRegisterLogin(state, data) {
			state.isRegisterLogin = data
		},
		setRegisterLoginType(state, data) {
			state.registerLoginType = data
		},
		setToken(state, data) {
			state.token = data
		},
		setUserInfo(state, data) {
			state.userInfo = data
		},
	},
	actions: {
		getUserInfo(context, _this) {
			return new Promise((resolve, reject) => {
				// 获取用户信息
				_this.$axios.get('/user').then(({
					data
				}) => {
					if (data.code == 200) {
						// data.data.birthday = new Date(data.data.birthday)
						context.commit('setUserInfo', data.data)
						resolve(data)
					} else {
						_this.$message.error(data.message || '获取用户信息失败')
						reject(data)
					}
				})
			})
		}
	}
})
