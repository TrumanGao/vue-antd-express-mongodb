<template>
	<div class="layout-page">
		<a-layout id="components-layout-demo-top">
			<a-layout-header>
				<a-menu theme="dark" v-model="currentKey" @click="menuClick" mode="horizontal" :defaultSelectedKeys="['1']" :style="{ lineHeight: '64px' }">
					<a-menu-item key="1">鼓瑟吹笙</a-menu-item>
					<a-menu-item key="2">华山论剑</a-menu-item>
					<a-menu-item key="3">影史拾珍</a-menu-item>
				</a-menu>
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
			if (this.$route.path == '/home') {
				this.currentKey = ["1"]
			} else if (this.$route.path == '/ranking') {
				this.currentKey = ["2"]
			} else if (this.$route.path == '/history') {
				this.currentKey = ["3"]
			}
		},
		methods: {
			menuClick(e) {
				if (e.key == this.currentKey[0]) {
					return
				} else if (e.key == 1) {
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
	.ant-layout {
		background-color: #FFFFFF;
	}

	.ant-layout-header {
		padding: 0;
	}

	.ant-layout-content {
		padding: 16px 96px;
		min-height: calc(100vh - 64px - 69px);
	}
</style>
