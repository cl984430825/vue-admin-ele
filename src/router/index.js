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
                },
                {
                  path: "/engineering/add",
                  name: "engineerAdd",
                  component: resolve => require(["@/views/container/engineering/list/add.vue"], resolve),
                  meta: {
                    id: "1-1",
                    title: "新增工程"
                  },
                },
                {
                  path: "/engineering/detail",
                  name: "engineerDetail",
                  component: resolve => require(["@/views/container/engineering/list/detail.vue"], resolve),
                  meta: {
                    id: "1-1",
                    title: "工程详情"
                  },
                },
                {
                  path: "/engineering/compile",
                  name: "engineerCompile",
                  component: resolve => require(["@/views/container/engineering/list/compile.vue"], resolve),
                  meta: {
                    id: "1-1",
                    title: "编辑工程"
                  },
                },
                {
                  path: "/engineering/invoiceMng",
                  name: "invoiceMng",
                  component: resolve => require(["@/views/container/engineering/list/invoiceMng.vue"], resolve),
                  meta: {
                    id: "1-1",
                    title: "发票管理"
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
            },
            {
              path: "/engineering/invoice",
              name: "invoice",
              component: resolve => require(["@/views/container/engineering/invoice.vue"], resolve),
              meta: {
                id: "1-3",
                title: "发票列表"
              }
            },
            {
              path: "/engineering/payment",
              name: "payment",
              component: resolve => require(["@/views/container/engineering/payment.vue"], resolve),
              meta: {
                id: "1-4",
                title: "付款记录"
              }
            }
          ]
        },
        {
          path: "/supplieses",
          name: "supplieses",
          component: resolve => require(["@/views/container/supplieses/index.vue"], resolve),
          redirect: { path: "/supplieses/list" },
          meta: {
            title: "物资管理"
          },
          children: [
            {
              path: "/supplieses/list",
              component: resolve => require(["@/views/container/supplieses/list/index.vue"], resolve),
              meta: {
                title: "物资列表"
              },
              children: [
                {
                  path: '/',
                  name: "list",
                  component: resolve => require(["@/views/container/supplieses/list/list.vue"], resolve),
                  meta: {
                    id: "2-1"
                  }
                },
                {
                  path: '/supplieses/add',
                  name: "add",
                  component: resolve => require(["@/views/container/supplieses/list/add.vue"], resolve),
                  meta: {
                    id: "2-1",
                    title: "新建物资"
                  }
                },
                {
                  path: '/supplieses/detail',
                  name: "detail",
                  component: resolve => require(["@/views/container/supplieses/list/detail.vue"], resolve),
                  meta: {
                    id: "2-1",
                    title: "物资详情"
                  }
                }
              ]
            },
            {
              path: "/supplieses/inoutWarehouse",
              name: "inoutWarehouse",
              component: resolve => require(["@/views/container/supplieses/inoutWarehouse.vue"], resolve),
              meta: {
                id: "2-2",
                title: "出入库记录"
              }
            },
            {
              path: "/supplieses/balanceReport",
              name: "balanceReport",
              component: resolve => require(["@/views/container/supplieses/balanceReport.vue"], resolve),
              meta: {
                id: "2-3",
                title: "物资结存报表"
              }
            }
          ]
        },
        {
          path: "/system",
          name: "system",
          component: resolve => require(["@/views/container/system/index.vue"], resolve),
          redirect: { name: "role" },
          meta: {
            title: "系统管理"
          },
          children: [
            {
              path: "/system/role",
              name: "role",
              component: resolve => require(["@/views/container/system/role.vue"], resolve),
              meta: {
                id: "3-1",
                title: "角色管理"
              }
            },
            {
              path: "/system/account",
              name: "account",
              component: resolve => require(["@/views/container/system/account.vue"], resolve),
              meta: {
                id: "3-2",
                title: "账号管理"
              }
            }
          ]
        }
      ]
    }
  ]
});
