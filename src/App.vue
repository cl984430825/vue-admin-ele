<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    // 请求拦截器
    this.$axios.interceptors.request.use(
      config => {
        this.$openLoad(true);
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // 返回拦截器
    this.$axios.interceptors.response.use(
      response => {
        this.$openLoad(false)
        return response;
      },
      error => {
        this.$openLoad(false)
        return Promise.reject(error);
      }
    );
  }
};
</script>

<style>
@import url("./styles/app.css");
</style>
