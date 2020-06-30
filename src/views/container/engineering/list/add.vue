<template>
  <div id="engineerAdd">
    <div class="engineerAdd_container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="工程名称：" prop="name">
          <el-input 
          clearable
          maxlength="20"
          style="width:260px" 
          v-model="ruleForm.name" 
          placeholder="请输入工程名称"></el-input>
        </el-form-item>
        <el-form-item label="场站名称：" prop="stationName">
          <el-input 
          clearable
          maxlength="20"
          style="width:260px" 
          v-model="ruleForm.stationName" 
          placeholder="请输入场站"></el-input>
        </el-form-item>
        <el-form-item label="工程状态：" prop="status">
          <el-radio v-model="ruleForm.status" :label="1">进行中</el-radio>
          <el-radio v-model="ruleForm.status" :label="2">已完成</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button @click="save" size="medium" type="primary">
            <i class="el-icon-document-add"></i>
            <span>保存</span>
          </el-button>
          <el-button @click="toBack" size="medium">返回列表</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "engineerAdd",
  data () {
    return {
      // 提交表单
      ruleForm: {
        name: "",
        stationName: "",
        status: 1
      },
      // 表单校验规则
      rules: {
        name: { required: true, message: '请输入工程名称', trigger: 'blur' },
        stationName: { required: true, message: '请输入场站名称', trigger: 'blur' },
        status: { required: true },
      }
    }
  },
  methods: {
    // 保存提交
    save(){
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "POST",
            url: "/api/v1/engineerings",
            data: this.ruleForm
          }).then(res=>{
            this.$message.success("新增成功");
            this.toBack()
          })
        }
      })
    },
    // 返回列表
    toBack(){
      this.$router.push("/engineering/list");
    }
  }
}
</script>

<style scoped>
.engineerAdd_container{
  padding: 20px;
  background: #ffffff;
}
</style>
