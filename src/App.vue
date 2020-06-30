<template>
  <div id="app">
    <!-- 请求进度条 -->
    <div
      class="onUpload"
      v-if="loadNum < 100"
      :style="'width:' + loadNum + 'vw'"
    ></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      // 请求进度条数值
      loadNum: 0
    };
  },
  created() {
    // 请求拦截器
    this.$axios.interceptors.request.use(
      config => {
        // 请求头携带token
        config.headers['token'] = localStorage.getItem("token");
        this.setLoaded(config).then(() => {
          return config;
        });
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // 返回拦截器
    this.$axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
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
  },
  methods: {
    setLoaded(c) {
      var that = this;
      return new Promise(resolve => {
        this.loadNum = 0;
        // 监听请求的进度事件
        c.onDownloadProgress = function(event) {
          that.loadNum = Math.round((event.loaded / event.total) * 100);
          if (that.loadNum >= 100) {
            resolve();
          }
        };
      });
    }
  }
};
</script>

<style>
@import url("./styles/app.css");
</style>
