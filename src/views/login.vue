<template>
  <div id="login">
    <div class="login_container">
      <div class="login_title">系统登录</div>
      <el-form
        :model="userForm"
        :rules="userRules"
        ref="userForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <div class="labelInputCls">
            <i class="el-icon-user" style="fontSize:20px;color:#889AA4"></i>
            <el-input
              v-model="userForm.username"
              style="width:100%"
              placeholder="请输入登录名"
              clearable
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="labelInputCls">
            <i class="el-icon-lock" style="fontSize:20px;color:#889AA4"></i>
            <el-input
              v-model="userForm.password"
              style="width:100%"
              type="password"
              placeholder="请输入密码"
              clearable
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="toLogin('userForm')"
            type="primary"
            style="width:100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      // 记住密码绑定项
      checked: false,
      // 用户登录表单
      userForm: {
        username: "",
        password: ""
      },
      // 用户表单验证
      userRules: {
        username: { required: true, message: "请输入登录名", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" }
      }
    };
  },
  mounted() {
    if (localStorage.getItem("loginInfo")) {
      this.userForm = JSON.parse(localStorage.getItem("loginInfo"));
      JSON.parse(localStorage.getItem("loginInfo")).password
        ? (this.checked = true)
        : (this.checked = false);
    }
  },
  methods: {
    // 记录登录信息
    rememberPwd() {
      var newInfoObj = { username: this.userForm.username };
      this.checked
        ? (newInfoObj.password = this.userForm.password)
        : (newInfoObj.password = "");
      localStorage.setItem("loginInfo", JSON.stringify(newInfoObj));
    },
    // 登录
    toLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.rememberPwd();
          this.$router.push("/");
          this.$message.success("登录成功，欢迎用户" + this.userForm.username);
        }
      });
    }
  }
};
</script>

<style scoped>
#login {
  width: 100vw;
  height: 100vh;
  background: #2d3a4b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login_container {
  width: 400px;
  height: fit-content;
}
.login_title {
  text-align: center;
  color: #eee;
  font-size: 26px;
  margin-bottom: 30px;
}
.labelInputCls {
  display: flex;
  align-items: center;
  border: 1px solid #3e4957;
  padding: 2px 15px;
  border-radius: 5px;
}
#login .el-input__inner {
  color: #fff;
}
</style>
