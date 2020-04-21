<template>
  <div id="container">
    <!-- 视图容器 -->
    <el-container class="appContainer">
      <!-- 侧边栏容器 -->
      <el-aside class="asideCls">
        <asideCon></asideCon>
      </el-aside>
      <div class="app_body">
        <!-- 头部容器 -->
        <el-header class="app_head">
          <appHead></appHead>
        </el-header>
        <bread></bread>
        <!-- 主要内容容器 -->
        <el-main class="mainBox">
          <router-view />
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import appHead from "../../components/header";
import bread from "../../components/bread";
import asideCon from "../../components/aside";
export default {
  name: "App",
  components: {
    bread,
    appHead,
    asideCon
  }
};
</script>
