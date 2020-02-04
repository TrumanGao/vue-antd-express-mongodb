<template>
	<div class="layout-page">
		<a-layout id="components-layout-demo-top" class="layout">
			<a-layout-header>
				<a-menu theme="dark" @click="menuClick" mode="horizontal" :defaultSelectedKeys="['1']" :style="{ lineHeight: '64px' }">
					<a-menu-item key="1">鼓瑟吹笙</a-menu-item>
					<a-menu-item key="2">华山论剑</a-menu-item>
					<a-menu-item key="3">影史拾珍</a-menu-item>
				</a-menu>
			</a-layout-header>
			<a-layout-content>
				<div class="layout-content">
					<router-view />
				</div>
			</a-layout-content>
			<a-layout-footer style="text-align: center">
				Let's Movie ©2020 Created by Truman Gao
			</a-layout-footer>
		</a-layout>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentKey: ['1'],
			}
		},
		methods: {
			menuClick(e) {
				console.log('e', e)
				if (e.key == 1) {
					this.$router.push('/home')
				} else if (e.key == 2) {
					this.$router.push('/ranking')
				} else if (e.key == 3) {
					this.$router.push('/history')
				}
			}
		}
	}
</script>

<style scoped>
	.ant-layout-content {
		padding: 16px 50px;
	}

	.layout-content {
		background: #fff;
		padding: 24px;
		min-height: calc(100vh - 64px - 69px - 32px);
	}

	#components-layout-demo-top .logo {
		width: 120px;
		height: 31px;
		background: rgba(255, 255, 255, .2);
		margin: 16px 24px 16px 0;
		float: left;
	}
</style>
