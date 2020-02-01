<template>
	<div class="home-page">
		<img src="@/assets/logo.png" />
		<h2>欢迎来到首页</h2>
		<a-button type="primary" @click="showMsg">弹框</a-button>
		<input type="text" v-model="movie" placeholder="请输入电影名称" />
		<a-button type="primary" @click="addMovie">添加电影</a-button>
		<router-link to="login">跳转登录页</router-link>
		<router-link to="register">跳转注册页</router-link>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				movie: "阿甘正传",
				movieList: [], // 查询电影列表
			};
		},
		methods: {
			showMsg() {
				this.$axios.get("/movie").then(res => {
					console.log("返回请求结果", res);
					if (res.status == 200) {
						this.movieList = res.data
					}
					console.log('查询到的电影列表', this.movieList)
				});
			},
			addMovie() {
				this.$axios
					.post("/movie/add", {
						name: this.movie
					}).then(res => {
						console.log('添加电影返回结果', res)
						this.$message.info("添加电影返回结果：" + res.data);
					});
			}
		}
	};
</script>

<style>
</style>
