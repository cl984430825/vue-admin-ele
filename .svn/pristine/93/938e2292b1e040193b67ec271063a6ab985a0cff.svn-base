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
        this.setLoaded(config).then(() => {
          return config;
        });
        return config;
      },
      error => {
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
        c.onDownloadProgress = function(evt) {
          that.loadNum = Math.round((evt.loaded / evt.total) * 100);
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
