<template>
  <div id="add">
    <div class="add_container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="物资编号：" prop="no">
          <el-input 
          clearable
          maxlength="20"
          style="width:260px" 
          v-model="ruleForm.no" 
          placeholder="请输入物资编号"></el-input>
        </el-form-item>
        <el-form-item label="物资批次ID：" prop="batchId">
          <el-input 
          clearable
          maxlength="20"
          style="width:260px" 
          v-model="ruleForm.batchId" 
          placeholder="请输入物资批次ID"></el-input>
        </el-form-item>
        <el-form-item label="物资类别ID：" prop="typeId">
          <el-input 
          clearable
          style="width:260px" 
          v-model="ruleForm.typeId"
          placeholder="请输入物资类别ID"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="status">
          <el-select v-model="ruleForm.status">
            <el-option
            :key="index"
            :value="index"
            :label="item"
            v-for="(item, index) in typeList"></el-option>
          </el-select>
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
  name: "add",
  data () {
    return {
      // 提交表单
      ruleForm: {
        no: "",
        batchId: "",
        status: 0,
        typeId: ""
      },
      // 表单校验规则
      rules: {
        no: { required: true, message: '请输入物资编号', trigger: 'blur' },
        batchId: { required: true, message: '请输入物资批次ID', trigger: 'blur' },
        typeId: { required: true, message: '请输入物资类别ID', trigger: 'blur' },
        status: { required: true }
      },
      // 类型列表
      typeList: ["工程物资", "在建工程", "低值易耗", "办公用品", "固定资产", "无形资产", "贸易材料", "研发材料", "库存商品", "劳保用品"],
    }
  },
  methods: {
    // 保存提交
    save(){
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "POST",
            url: "/api/v1/materials",
            data: this.ruleForm
          }).then(res=>{
            this.$message.success("新建成功");
            this.$router.push("/supplieses/list");
          })
        }
      })
    },
    // 返回列表
    toBack(){
      this.$router.push("/supplieses/list")
    }
  }
}
</script>

<style scoped>
.add_container{
  padding: 20px;
  background: #ffffff;
}
</style>
