<template>
  <div id="asideCon">
    <el-menu
      style="height:100%"
      :collapse="isCollapse"
      :router="true"
      :default-active="asideCurrentId"
      class="el-menu-vertical-demo asideMenuCls"
      background-color="#304156"
      text-color="#BFCBD9"
      active-text-color="#409EFF"
    >
      <template v-for="item in asideListData">
        <el-menu-item
          v-if="!item.children"
          :key="item.id"
          :index="item.id"
          :route="item.router"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
        <el-submenu v-if="item.children" :key="item.id" :index="item.id">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(item2, index2) in item.children"
              :index="item2.id"
              :route="item2.router"
              :key="index2"
              >{{ item2.title }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import toolkit from "@/toolkit/index";
export default {
  name: "asideCon",
  data() {
    return {
      // 侧边栏数据
      asideListData: [],
      // 侧边栏展开收缩model
      isCollapse: false,
      // 侧边栏默认选中值
      asideCurrentId: ""
    };
  },
  watch: {
    $route: function() {
      this.watchRoute();
    }
  },
  mounted() {
    var that = this;
    this.watchRoute();
    // 赋值侧边栏列表数据
    this.asideListData = toolkit.asideData();
    // 弹起或收起侧边栏
    this.$bus.$on("lhm", function() {
      that.isCollapse = !that.isCollapse;
    });
  },
  methods: {
    // 监视路由并改变对应的显示id
    watchRoute() {
      this.asideCurrentId = this.$route.meta.id;
    }
  }
};
</script>

<style scoped>
#asideCon {
  height: 100%;
}
</style>
