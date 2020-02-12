<template>
	<a-locale-provider :locale="locale">
		<div id="app">
			<router-view />
		</div>
	</a-locale-provider>
</template>

<script>
	import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'; // 全局配置国际化方案
	export default {
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
