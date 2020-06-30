<template>
  <div id="invoiceMng">
    <div class="invoiceMng_container">
      <div class="flexBetween">
        <el-button @click="openAddInvoice" size="medium">+ 添加发票</el-button>
        <div class="flexBox">
          <el-radio-group v-model="status" @change="getInvoicesListData" size="medium">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">已确认</el-radio-button>
            <el-radio-button label="0">未确认</el-radio-button>
          </el-radio-group>
          <el-input 
          clearable
          class="_left"
          style="width:300px"
          v-model="invoiceNo"
          placeholder="请输入发票编号">
            <el-button @click="getInvoicesListData" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <div class="table_box _top">
        <el-table border :data="tableData" :header-cell-style="{background:'#F6F5F4'}">
          <el-table-column label="发票编号" prop="invoiceNo"></el-table-column>
          <el-table-column label="开票日期" prop="signTime"></el-table-column>
          <el-table-column label="发票税率" prop="taxRate" width="100">
            <template slot-scope="scope">{{scope.row.taxRate|CYB}}%</template>
          </el-table-column>
          <el-table-column label="发票含税" prop="includeTax">
            <template slot-scope="scope">{{scope.row.includeTax|CYB}}</template>
          </el-table-column>
          <el-table-column label="发票未税" prop="noTax">
            <template slot-scope="scope">{{scope.row.noTax|CYB}}</template>
          </el-table-column>
          <el-table-column label="备注信息" prop="remark"></el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">{{scope.row.status==1?'已确认':'未确认'}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span @click="compileInvoice(scope)" class="blueText">编辑</span>
              <span @click="delInvoice(scope)" class="blueText _left">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="flexBetween">
          <div class="_top">
            <el-button @click="goBack" size="medium">返 回</el-button>
          </div>
          <Page :pageConfig="pageConfig" @cutPage="cutPage" />
        </div>
      </div>
    </div>
    <el-dialog
      width="30%"
      :title="addOrCompile?'添加发票':'修改发票'"
      :visible.sync="dialogVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="发票编号：" prop="invoiceNo">
          <el-input clearable v-model="ruleForm.invoiceNo" placeholder="请输入发票编号"></el-input>
        </el-form-item>
        <el-form-item label="开票日期：" prop="signTime">
          <el-date-picker
            type="date"
            style="width:90%"
            v-model="ruleForm.signTime"
            placeholder="开票日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发票税率：" prop="taxRate">
          <el-input-number v-model="ruleForm.taxRate" controls-position="right" :min="0" :precision="2"></el-input-number>
        </el-form-item>
        <el-form-item label="发票含税：" prop="includeTax">
          <el-input clearable v-model="ruleForm.includeTax" style="width:80%" placeholder="请输入发票含税">
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="发票未税：" prop="noTax">
          <el-input clearable v-model="ruleForm.noTax" style="width:80%" placeholder="请输入发票未税">
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注说明：" prop="remark">
          <el-input
            resize="none"
            maxlength="100"
            type="textarea"
            show-word-limit
            v-model="ruleForm.remark"
            placeholder="请输入备注说明">
          </el-input>
        </el-form-item>
        <el-form-item>
          <div>
            <el-button @click="confirmAdd" type="primary" size="medium">确定</el-button>
            <el-button @click="dialogVisible=false" size="medium">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import toolkit from "@/toolkit/index";
export default {
  name: "invoiceMng",
  components: {
    "Page": resolve => require(["@/components/page.vue"], resolve)
  },
  data () {
    return {
      // 检索项-状态
      status: "",
      // 检索项-发票编号
      invoiceNo: "",
      // 数据-表单
      tableData: [],
      // 分页
      pageConfig: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 状态-dialog
      dialogVisible: false,
      // 表单-添加发票
      ruleForm: {
        invoiceNo: "",
        signTime: "",
        taxRate: 0,
        includeTax: "",
        noTax: "",
        remark: ""
      },
      // 表单校验规则
      rules: {
        invoiceNo: { required: true, message: '请输入发票号码', trigger: 'blur' },
        signTime: { required: true, message: '请选择开票日期', trigger: 'blur' },
        taxRate: { required: true },
        includeTax: { required: true, message: '请输入发票含税', trigger: 'blur' },
        noTax: { required: true, message: '请输入发票未税', trigger: 'blur' }
      },
      // 所属项目id
      projectId: "",
      // 发票新增/编辑
      addOrCompile: true,
      // 编辑打开的发票id
      modifyInvoiceId: ""
    }
  },
  mounted(){
    this.projectId = this.$router.currentRoute.query.id;
    this.getInvoicesListData()
  },
  methods: {
    // 删除发票
    delInvoice(scope){
      this.$confirm('删除后无法恢复，确认要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: "DELETE",
          url: "/api/v1/invoices/" + scope.row.id
        }).then(res=>{
          this.getInvoicesListData()
          this.$message.success("删除成功");
        })
      }).catch(()=>{})
    },
    // 编辑发票
    compileInvoice(scope){
      this.addOrCompile = false;
      this.modifyInvoiceId = scope.row.id;
      this.getInvoiceOne(scope.row.id).then(data => {
        this.dialogVisible = true;
        this.$nextTick(()=>{
          this.ruleForm = Object.assign(data, {
            taxRate: data.taxRate / 100,
            includeTax: data.includeTax / 100,
            noTax: data.noTax / 100
          });
        })
      })
    },
    // 打开添加发票dialog
    openAddInvoice(){
      this.addOrCompile = true;
      this.dialogVisible = true;
      this.$nextTick(()=>{
        this.$refs["ruleForm"].resetFields();
      })
    },
    // 添加发票/编辑发票
    confirmAdd(){
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.ruleForm.projectId = this.projectId;
          this.$axios({
            method: this.addOrCompile?'POST':'PUT',
            url: "/api/v1/invoices",
            data: {
              id: !this.addOrCompile?this.modifyInvoiceId:'',
              projectId: this.projectId,
              invoiceNo: this.ruleForm.invoiceNo,
              signTime: toolkit.transitionDate(this.ruleForm.signTime, "YYYY-MM-DD"),
              taxRate: this.ruleForm.taxRate * 100,
              includeTax: this.ruleForm.includeTax * 100,
              noTax: this.ruleForm.noTax * 100,
              remark: this.ruleForm.remark,
              status: 0
            }
          }).then(res=>{
            this.getInvoicesListData()
            this.dialogVisible = false;
            this.$message.success("添加成功");
          })
        }
      })
    },
    // 获取单个发票信息
    getInvoiceOne(invoiceId){
      return new Promise(resolve => {
        this.$axios({
          method: "GET",
          url: "/api/v1/invoices/" + invoiceId
        }).then(res=>{
          resolve(res.data)
        })
      })
    },
    // 获取发票列表信息
    getInvoicesListData(){
      this.$axios({
        method: "GET",
        url: "/api/v1/invoices",
        params: {
          projectId: this.projectId,
          invoiceNo: this.invoiceNo,
          status: this.status,
          pageNum: this.pageConfig.pageNum,
          pageSize: this.pageConfig.pageSize
        }
      }).then(res=>{
        this.tableData = res.data.list;
        this.pageConfig.total = res.data.total;
      })
    },
    // 返回工程列表
    goBack(){
      this.$router.back(-1);
    },
    // 切换页码
    cutPage(e){
      this.pageConfig.pageNum = e;
      this.getInvoicesListData()
    }
  }
}
</script>

<style scoped>
.invoiceMng_container{
  padding: 20px;
  background: #ffffff;
}
</style>
