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
        this.$openLoad(true)
        // 请求头携带token
        config.headers['token'] = localStorage.getItem("token");
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
        if(error.response.status == 401){
          this.$message.error("登录超时，请重新登录。")
          this.$router.push("/login");
        }else if(error.response.status == 403){
          this.$message.error("没有该模块的操作权限。")
        }else if(error.response.status == 400){
          this.$message.error(error.response.data.message)
        }
        return Promise.reject(error);
      }
    );
  }
};
</script>

<style>
@import url("./styles/app.css");
</style>
