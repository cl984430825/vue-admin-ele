import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    breadData: []
  },
  mutations: {
    setBread(state, obj) {
      state.breadData = obj;
    }
  },
  actions: {
    setBreadFun(context, obj) {
      context.commit("setBread", obj);
    }
  },
  modules: {}
});
