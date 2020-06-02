import axios from 'axios'
import vue from '../main.js'

const Http = {}
Http.install = function(Vue) {
	// 设置接口基准地址
	axios.defaults.baseURL = "http://localhost:3000";

	// 添加请求拦截器
	axios.interceptors.request.use(function(config) {
		// console.log('请求拦截config', config)

		// 在发送请求之前做些什么
		let token = vue.$store.state.token || localStorage.getItem('token')
		if (token) {
			config.headers['TOKEN'] = token
		}

		return config;
	}, function(error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	});

	// 添加响应拦截器
	axios.interceptors.response.use(function(response) {
		// console.log('响应拦截response', response)

		// 未登录处理
		if (response.data && response.data.code === 1000) {
			if (vue.$route.path.indexOf('personal') !== -1) {
				vue.$router.push('/')
				localStorage.removeItem('token')
				vue.$store.commit('setToken', "")
				vue.$store.commit('setUserInfo', "")
			}
		}

		return response;
	}, function(error) {
		return Promise.reject(error);
	});

	//   挂载到vue实例上
	Vue.prototype.$axios = axios
}

export default Http
