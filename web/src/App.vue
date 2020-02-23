<template>
	<a-locale-provider :locale="locale">
		<div id="app">
			<router-view />
			<register-login v-if="$store.state.isRegisterLogin"></register-login>
		</div>
	</a-locale-provider>
</template>

<script>
	import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'; // 全局配置国际化方案
	import registerLogin from '@/components/registerLogin.vue'
	export default {
		components: {
			registerLogin
		},
		name: 'app',
		data() {
			return {
				locale: zhCN,
			}
		},
		created() {
			this.$store.commit('setToken', localStorage.getItem('token'))
			this.$store.dispatch('getUserInfo', this).then(res => {
				console.log('获取用户信息成功', res)
			}).catch(err => {
				console.error('获取用户信息失败', err)
			})

			// 页面关闭确认
			window.onbeforeunload = function(e) {
				if (window.location.pathname == '/addMovie' || window.location.pathname == '/addCelebrity') {
					e = e || window.event;

					if (e) { // 兼容IE8和Firefox 4之前的版本
						e.returnValue = "重新加载此页面？系统可能不会保存您所做的更改";
					} else { // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
						return "重新加载此页面？系统可能不会保存您所做的更改";
					}
				}
			};
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* text-align: center; */
		color: #2c3e50;
		/* margin-top: 60px; */
	}
</style>
