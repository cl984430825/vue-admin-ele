import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import store from "./store";
import router from "./router";
import filters from "./toolkit/filter";
import "./plugins/element.js";

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
// 设置全局的代理请求头
axios.defaults.baseURL = '/proxy';
for (var m in filters) {
  Vue.filter(m, filters[m]);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
