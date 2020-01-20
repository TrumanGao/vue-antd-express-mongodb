<template>
  <div class="home-page">
    <img src="@/assets/logo.png" />
    <h2>欢迎来到首页</h2>
    <a-button type="primary" @click="showMsg">弹框</a-button>
    <input type="text" v-model="movie" />
    <a-button type="primary" @click="addMovie">添加电影</a-button>
    <router-link to="login">跳转登录页</router-link>
    <router-link to="register">跳转注册页</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: ""
    };
  },
  methods: {
    showMsg() {
      this.$axios.get("/users").then(res => {
        console.log("返回请求结果", res);
        this.$message.info("This is a normal message");
      });
    },
    addMovie() {
      this.$axios
        .get("/movie", {
          params: {
            name: this.movie
          }
        })
        .then(res => {
          this.$message.info("添加电影：", res.name);
        });
    }
  }
};
</script>

<style>
</style>