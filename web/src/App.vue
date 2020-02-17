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
		components:{registerLogin},
		name: 'app',
		data() {
			return {
				locale: zhCN,
			}
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
