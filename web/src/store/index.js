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
		setToken(state, data){
			state.token = data
		},
		setUserInfo(state, data){
			state.userInfo = data
		},
	},
	actions: {
		getUserInfo(context){
			console.log(context)
		}
	}
})

