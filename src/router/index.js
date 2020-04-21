import Vue from "vue";
import Router from "vue-router";
import login from "../views/login.vue";
import container from "../views/containerView/index.vue";
import home from "../views/containerView/home.vue";
import documentsPage from "../views/containerView/documentsPage.vue";
import componentView from "../views/containerView/componentView/index.vue";
import smallComponent from "../views/containerView/componentView/smallComponent.vue";
import GEComponent from "../views/containerView/componentView/GEComponent.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: { name: "home" }
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/container",
      name: "container",
      component: container,
      redirect: { name: "home" },
      children: [
        {
          path: "/home",
          name: "home",
          component: home,
          meta: {
            id: "1",
            title: "首页"
          }
        },
        {
          path: "/componentView",
          name: "componentView",
          redirect: { name: "smallComponent" },
          component: componentView,
          meta: {
            title: "组件"
          },
          children: [
            {
              path: "/componentView/smallComponent",
              name: "smallComponent",
              component: smallComponent,
              meta: {
                id: "2-1",
                title: "小组件"
              }
            },
            {
              path: "/componentView/GEComponent",
              name: "GEComponent",
              component: GEComponent,
              meta: {
                id: "2-2",
                title: "通用组件"
              }
            }
          ]
        },
        {
          path: "/documentsPage",
          name: "documentsPage",
          component: documentsPage,
          meta: {
            id: "3",
            title: "文档"
          }
        }
      ]
    }
  ]
});
