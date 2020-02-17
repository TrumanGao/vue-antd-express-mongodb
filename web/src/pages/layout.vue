<template>
	<div class="layout-page">
		<a-layout id="components-layout-demo-top">
			<a-layout-header>
				<a-menu theme="dark" v-model="currentKey" @click="menuClick" mode="horizontal" :defaultSelectedKeys="['1']" :style="{ lineHeight: '64px' }">
					<a-menu-item key="1">鼓瑟吹笙</a-menu-item>
					<a-menu-item key="2">青梅煮酒</a-menu-item>
					<a-menu-item key="3">华山论剑</a-menu-item>
					<a-menu-item key="4">影史拾珍</a-menu-item>
				</a-menu>
				<div class="header-control">
					<router-link to="" class="control-text" @click.native="showRegisterLogin(1)">登录</router-link>
					<router-link to="" class="control-text" @click.native="showRegisterLogin(2)">注册</router-link>
				</div>
			</a-layout-header>
			<a-layout-content>
				<div>
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
				currentKey: ["1"],
			}
		},
		created() {
			if (this.$route.path == '/addMovie') {
				this.currentKey = ["1"]
			} else if (this.$route.path == '/addCelebrity') {
				this.currentKey = ["2"]
			} else if (this.$route.path == '/ranking') {
				this.currentKey = ["3"]
			} else if (this.$route.path == '/history') {
				this.currentKey = ["4"]
			}
		},
		methods: {
			menuClick(e) {
				if (e.key == this.currentKey[0]) {
					return
				} else if (e.key == 1) {
					this.$router.push('/addMovie')
				} else if (e.key == 2) {
					this.$router.push('/addCelebrity')
				} else if (e.key == 3) {
					this.$router.push('/ranking')
				} else if (e.key == 4) {
					this.$router.push('/history')
				}
			},
			showRegisterLogin(type){
				this.$store.commit('setRegisterLoginType', type)
				this.$store.commit('setIsRegisterLogin', true)
			}
		}
	}
</script>

<style scoped>
	.ant-layout {
		background-color: #FFFFFF;
	}

	.ant-layout-header {
		padding: 0;
		display: flex;
		justify-content: space-between;
	}

	.header-control {
		cursor: pointer;
		text-decoration: none;
		padding-right: 10px;
	}

	.control-text {
		display: inline-block;
		padding: 0 10px;
		color: rgba(255, 255, 255, 0.65)
	}

	.control-text:hover,
	.control-text:active,
	.control-text:focus{
		color: #FFFFFF;
		text-decoration: none;
	}

	.ant-layout-content {
		padding: 16px 96px;
		min-height: calc(100vh - 64px - 69px);
	}
</style>
