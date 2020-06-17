<template>
  <div id="bread">
    <div class="bread_container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(item, index) in $store.state.breadData"
          :key="index"
          :to="item.path"
          >{{ item.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "bread",
  data() {
    return {};
  },
  mounted() {
    this.setBread();
  },
  watch: {
    $route: function() {
      this.setBread();
    }
  },
  methods: {
    // 改变面包屑数据
    setBread() {
      var lsBread = [];
      this.$route.matched.map(v => {
        if (v.meta.title) {
          lsBread.push({
            title: v.meta.title,
            path: v.path
          });
        }
      });
      this.$store.dispatch("setBreadFun", lsBread);
    }
  }
};
</script>

<style scoped>
.bread_container {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 20px;
}
</style>
