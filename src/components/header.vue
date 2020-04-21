<template>
  <div id="appHead">
    <div class="appHead_container">
      <div class="closeIcon">
        <i
          @click="closeOrOpen"
          :class="openCloseStatus ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        ></i>
      </div>
      <div class="user_container">
        <el-dropdown @command="handleCommand" trigger="click">
          <div class="userImgCls">
            <img
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            />
            <span class="userImg_name">{{ loginUsername }}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">设置</el-dropdown-item>
            <el-dropdown-item command="2">个人中心</el-dropdown-item>
            <el-dropdown-item command="3">修改密码</el-dropdown-item>
            <el-dropdown-item command="4">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "appHead",
  data() {
    return {
      // 侧边栏图标状态
      openCloseStatus: true,
      // 登入用户名称
      loginUsername: ""
    };
  },
  mounted() {
    this.loginUsername = JSON.parse(localStorage.getItem("loginInfo")).username;
  },
  methods: {
    // 选择用户下拉列表项
    handleCommand(e) {
      if (e === "4") {
        this.$confirm("确定要退出登录吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$message.success("退出成功");
          this.$router.push({ name: "login" });
        }).catch(() => {});
      }
    },
    // 收起侧边栏列表
    closeOrOpen() {
      this.openCloseStatus = !this.openCloseStatus;
      this.$bus.$emit("lhm", "lhm");
    }
  }
};
</script>

<style scoped>
#appHead {
  height: 100%;
}
.appHead_container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.closeIcon {
  font-size: 22px;
  cursor: pointer;
}
.userImgCls {
  height: 35px;
  display: flex;
  align-items: center;
  color: #999;
  font-size: 15px;
  cursor: pointer;
}
.userImg_name {
  margin-left: 10px;
}
.userImgCls img {
  height: 100%;
  border-radius: 50px;
}
</style>
