import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const originalPush = Router.prototype.push;
  Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default new Router({
  routes: [
    {
      path: "/",
      redirect: { name: "engineering" }
    },
    {
      path: "/login",
      name: "login",
      component: resolve => require(["@/views/login.vue"], resolve)
    },
    {
      path: "/container",
      name: "container",
      component: resolve => require(["@/views/container/index.vue"], resolve),
      redirect: { name: "engineering" },
      children: [
        {
          path: "/engineering",
          name: "engineering",
          component: resolve => require(["@/views/container/engineering/index.vue"], resolve),
          redirect: { path: "/engineering/list" },
          meta: {
            title: "工程管理"
          },
          children: [
            {
              path: "/engineering/list",
              component: resolve => require(["@/views/container/engineering/list/index.vue"], resolve),
              meta: {
                title: "工程列表"
              },
              children: [
                {
                  path: "/",
                  name: "engineerList",
                  component: resolve => require(["@/views/container/engineering/list/list.vue"], resolve),
                  meta: {
                    id: "1-1"
                  },
                }
              ]
            },
            {
              path: "/engineering/project",
              name: "project",
              component: resolve => require(["@/views/container/engineering/project.vue"], resolve),
              meta: {
                id: "1-2",
                title: "项目列表"
              }
            }
          ]
        }
      ]
    }
  ]
});
