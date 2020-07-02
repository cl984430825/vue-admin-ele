<template>
  <div id="add">
    <div class="add_container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="物资名称：" prop="name">
          <el-input 
          clearable
          maxlength="20"
          style="width:260px" 
          v-model="ruleForm.name" 
          placeholder="请输入物资名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌型号：" prop="model">
          <el-input 
          clearable
          maxlength="20"
          style="width:260px" 
          v-model="ruleForm.model" 
          placeholder="请输入品牌型号"></el-input>
        </el-form-item>
        <el-form-item label="供应商：" prop="supplier">
          <el-input 
          clearable
          maxlength="20"
          style="width:260px" 
          v-model="ruleForm.supplier" 
          placeholder="请输入供应商"></el-input>
        </el-form-item>
        <el-form-item label="单位：" prop="unit">
          <el-input 
          clearable
          maxlength="20"
          style="width:260px" 
          v-model="ruleForm.unit" 
          placeholder="请输入单位"></el-input>
        </el-form-item>
        <el-form-item label="物资类别：" prop="typeId">
          <el-select v-model="ruleForm.typeId">
            <el-option
            :key="index"
            :label="item"
            :value="index+1"
            v-for="(item, index) in typeList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编号前缀：" prop="no">
          <el-input 
          clearable
          maxlength="20"
          style="width:260px" 
          v-model="ruleForm.no" 
          placeholder="请输入编号前缀"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input 
          clearable
          maxlength="20"
          style="width:260px" 
          v-model="ruleForm.remark" 
          placeholder="请输入备注"></el-input>
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
        name: "",
        model: "",
        supplier: "",
        unit: "",
        typeId: "",
        no: "",
        remark: "",
        status: 0
      },
      // 表单校验规则
      rules: {
        name: { required: true, message: '请输入物资名称', trigger: 'blur' },
        model: { required: true, message: '请输入品牌型号', trigger: 'blur' },
        supplier: { required: true, message: '请输入供应商', trigger: 'blur' },
        unit: { required: true, message: '请输入单位', trigger: 'blur' },
        typeId: { required: true, message: '请选择物资类别', trigger: 'change' },
        no: { required: true, message: '请输入编号前缀', trigger: 'blur' }
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
            url: "/api/v1/materialsTypes",
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
