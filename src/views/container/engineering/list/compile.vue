<template>
  <div id="engineerCompile">
    <div class="engineerCompile_container">
      <el-tabs v-model="activeIndex" @tab-click="cutTabs">
        <el-tab-pane label="基础信息" name="1">
          <div class="form_box">
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
          <div class="one_moneyBox">
            <div class="ul_box">
              <div class="li_box">
                <span class="labelCls">合同金额</span>
                <span class="labelCls moneyNum">{{ruleForm.contractMoney|CYB}}</span>
              </div>
            </div>
            <div class="ul_box">
              <div class="li_box">
                <span class="labelCls">已支付</span>
                <span class="labelCls moneyNum">{{ruleForm.payedMoney|CYB}}</span>
              </div>
              <div class="li_box thredLeft">
                <span class="labelCls">未支付</span>
                <span class="labelCls moneyNum">{{ruleForm.unPayedMoney|CYB}}</span>
              </div>
            </div>
            <div class="ul_box" style="border:0">
              <div class="li_box">
                <span class="labelCls">发票未税</span>
                <span class="labelCls moneyNum">{{ruleForm.invoiceNoTax|CYB}}</span>
              </div>
              <div class="li_box thredLeft">
                <span class="labelCls">发票含税</span>
                <span class="labelCls moneyNum">{{ruleForm.invoiceHaveTax|CYB}}</span>
              </div>
              <div class="li_box thredLeft">
                <span class="labelCls">暂估未税</span>
                <span class="labelCls moneyNum">{{ruleForm.estimateNoTax|CYB}}</span>
              </div>
              <div class="li_box thredLeft">
                <span class="labelCls">暂估含税</span>
                <span class="labelCls moneyNum">{{ruleForm.estimateHaveTax|CYB}}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目信息" name="2">
          <div class="table_box">
            <div class="flexBetween">
              <el-input 
              clearable
              v-model="projectName"
              style="width:300px" 
              placeholder="项目名称">
                <el-button @click="getProjectListData" slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <el-button @click="addProject" size="medium">+ 添加项目</el-button>
            </div>
            <el-table 
            border
            class="_top"
            :data="projectTable"
            :header-cell-style="{background:'#F6F5F4'}">
              <el-table-column label="合同号" prop="contractNo" width="200"></el-table-column>
              <el-table-column label="项目内容" prop="name" width="200"></el-table-column>
              <el-table-column label="合同金额" prop="contractMoney" width="100">
                <template slot-scope="scope">{{scope.row.contractMoney|CYB}}</template>
              </el-table-column>
              <el-table-column label="签订日期" prop="contractSignTime" width="100"></el-table-column>
              <el-table-column label="合同对方" prop="contractParty" width="150"></el-table-column>
              <el-table-column label="发票含税" prop="invoiceHaveTax" width="100">
                <template slot-scope="scope">{{scope.row.invoiceHaveTax|CYB}}</template>
              </el-table-column>
              <el-table-column label="发票未税" prop="invoiceNoTax" width="100">
                <template slot-scope="scope">{{scope.row.invoiceNoTax|CYB}}</template>
              </el-table-column>
              <el-table-column label="暂估含税" prop="estimateHaveTax" width="100">
                <template slot-scope="scope">{{scope.row.estimateHaveTax|CYB}}</template>
              </el-table-column>
              <el-table-column label="暂估未税" prop="estimateNoTax" width="100">
                <template slot-scope="scope">{{scope.row.estimateNoTax|CYB}}</template>
              </el-table-column>
              <el-table-column label="已支付" prop="payedMoney" width="120">
                <template slot-scope="scope">{{scope.row.payedMoney|CYB}}</template>
              </el-table-column>
              <el-table-column label="未支付" prop="unPayedMoney" width="120">
                <template slot-scope="scope">{{scope.row.unPayedMoney|CYB}}</template>
              </el-table-column>
              <el-table-column label="支付方式" prop="payType" width="120"></el-table-column>
              <el-table-column label="操作" fixed="right" width="255">
                <template slot-scope="scope">
                  <span @click="compileProject(scope)" class="blueText">编辑</span>
                  <span @click="toInvoice(scope)" class="blueText _left">发票管理</span>
                  <span class="blueText _left">付款记录</span>
                  <span class="blueText _left">删除</span>
                </template>
              </el-table-column>
            </el-table>
            <Page :pageConfig="pageConfig" @cutPage="cutPage($event,'pageConfig','getProjectListData')" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="物资信息" name="3">
          <div class="table_box">
            <el-input 
              clearable
              v-model="engineerSearch"
              style="width:300px" 
              placeholder="批次/编号/发票号">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-table border class="_top" :data="engTable" :header-cell-style="{background:'#F6F5F4'}">
              <el-table-column label="供应商" prop="supplier"></el-table-column>
              <el-table-column label="物资名称" prop="typeName"></el-table-column>
              <el-table-column label="物资编号" prop="startNo">
                <template slot-scope="scope">{{scope.row.startNo}}-{{scope.row.endNo}}</template>
              </el-table-column>
              <el-table-column label="领用人" prop="receiver"></el-table-column>
              <el-table-column label="状态" prop="type">
                <template slot-scope="scope">{{scope.row.type==2?'出库':'退回'}}</template>
              </el-table-column>
              <el-table-column label="使用状况" prop="useDetail"></el-table-column>
              <el-table-column label="发票编号" prop="">-</el-table-column>
              <el-table-column label="操作时间" prop="updateTime"></el-table-column>
              <el-table-column label="领用时间" prop="">-</el-table-column>
              <el-table-column label="物资数量" prop="count"></el-table-column>
              <el-table-column label="物资总价" prop="totalMoney">
                <template slot-scope="scope">{{scope.row.totalMoney|CYB}}</template>
              </el-table-column>
            </el-table>
            <Page :pageConfig="endPageConfig" @cutPage="cutPage($event,'endPageConfig','getBatchData')" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      width="50%"
      :title="addOrCompile?'添加项目':'修改项目'"
      :visible.sync="dialogVisible">
      <el-form :model="projectForm" :rules="projectFormRules" ref="projectForm" label-width="100px" class="demo-ruleForm">
        <div class="flexBox">
          <el-form-item label="合同号：" prop="contractNo" class="flexFormItem">
            <el-input v-model="projectForm.contractNo" placeholder="请输入合同号"></el-input>
          </el-form-item>
          <el-form-item label="项目名称：" prop="name" class="flexFormItem">
            <el-input v-model="projectForm.name" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </div>
        <div class="flexBox">
          <el-form-item label="签订日期：" prop="contractSignTime" class="flexFormItem">
            <el-date-picker
              v-model="projectForm.contractSignTime"
              type="date"
              placeholder="签订日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同方：" prop="contractParty" class="flexFormItem">
            <el-input v-model="projectForm.contractParty" placeholder="请输入合同方"></el-input>
          </el-form-item>
        </div>
        <div class="flexBox">
          <el-form-item label="合同金额：" prop="contractMoney" class="flexFormItem">
            <el-input-number v-model="projectForm.contractMoney" controls-position="right" :min="0" :precision="2"></el-input-number>
          </el-form-item>
          <el-form-item label="默认税率：" prop="defaultTaxRate" class="flexFormItem">
            <el-input-number v-model="projectForm.defaultTaxRate" controls-position="right" :min="0" :max="100" :precision="2"></el-input-number> %
          </el-form-item>
        </div>
        <div class="flexBox">
          <el-form-item label="已支付：" prop="payedMoney" class="flexFormItem">
            <div class="flexBox">
              <el-input v-model="projectForm.payedMoney" disabled>
                <template slot="prepend">￥</template>
              </el-input>
              <span class="blueText _left">付款记录</span>
            </div>
          </el-form-item>
          <el-form-item label="未支付：" prop="unPayedMoney" class="flexFormItem">
            <el-input v-model="projectForm.unPayedMoney" disabled>
              <template slot="prepend">￥</template>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item label="付款方式：" prop="payType" class="flexFormItem">
          <el-input v-model="projectForm.payType" placeholder="请输入付款方式"></el-input>
        </el-form-item>
        <el-divider content-position="center">
          <span class="labelCls">根据发票信息自动统计填写</span>
        </el-divider>
        <div class="flexBox">
          <el-form-item label="发票未税：" prop="invoiceNoTax" class="flexFormItem">
            <el-input v-model="projectForm.invoiceNoTax" :disabled="addOrCompile?true:false">
              <template slot="prepend">￥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="发票含税：" prop="invoiceHaveTax" class="flexFormItem">
            <el-input v-model="projectForm.invoiceHaveTax" :disabled="addOrCompile?true:false">
              <template slot="prepend">￥</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="flexBox">
          <el-form-item label="暂估未税：" prop="estimateNoTax" class="flexFormItem">
            <el-input v-model="projectForm.estimateNoTax" :disabled="addOrCompile?true:false">
              <template slot="prepend">￥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="暂估含税：" prop="estimateHaveTax" class="flexFormItem">
            <el-input v-model="projectForm.estimateHaveTax" :disabled="addOrCompile?true:false">
              <template slot="prepend">￥</template>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button @click="confirmAdd" type="primary" size="medium">确 定</el-button>
          <el-button @click="dialogVisible=false" size="medium">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import toolkit from "@/toolkit/index";
export default {
  name: "engineerCompile",
  components: {
    "Page": resolve => require(["@/components/page.vue"], resolve)
  },
  data () {
    return {
      // tab选中项
      activeIndex: "1",
      // 当前所选的工程ID
      engineeringID: "",
      // 基础信息表单
      ruleForm: {
        name: "",
        stationName: "",
        status: 1,
        contractMoney: 0,
        settleMoney: 0,
        payedMoney: 0,
        unPayedMoney: 0,
        invoiceNoTax: 0,
        invoiceHaveTax: 0,
        estimateNoTax: 0,
        estimateHaveTax: 0
      },
      // 表单校验规则
      rules: {
        name: { required: true, message: '请输入工程名称', trigger: 'blur' },
        stationName: { required: true, message: '请输入场站名称', trigger: 'blur' },
        status: { required: true },
      },
      // 检索项-项目名称
      projectName: "",
      // 物资信息索引项
      engineerSearch: "",
      // 项目信息table
      projectTable: [],
      // 物资信息table
      engTable: [],
      // 项目信息分页配置项
      pageConfig: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 物资信息分页配置项
      endPageConfig: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 添加项目dialog
      dialogVisible: false,
      // 添加项目/修改状态
      addOrCompile: true,
      // 修改项目的id
      projectId: "",
      // 添加项目表单
      projectForm: {
        contractNo: "",
        name: "",
        contractSignTime: "",
        contractParty: "",
        contractMoney: "",
        defaultTaxRate: "",
        payedMoney: "",
        unPayedMoney: "",
        payType: "",
        invoiceNoTax: "",
        invoiceHaveTax: "",
        estimateNoTax: "",
        estimateHaveTax: ""
      },
      // 添加项目校验
      projectFormRules: {
        contractNo: { required: true, message: '请输入合同号', trigger: 'blur' },
        name: { required: true, message: '请输入项目名称', trigger: 'blur' },
        contractSignTime: { required: true, message: '请选择签订日期', trigger: 'blur' },
        contractParty: { required: true, message: '请输入合同方', trigger: 'blur' },
        contractMoney: { required: true, message: '请输入合同金额', trigger: 'blur' },
        defaultTaxRate: { required: true }
      }
    }
  },
  mounted(){
    this.engineeringID = this.$router.currentRoute.query.id;
    this.getEngineeringData()
  },
  methods: {
    // 添加项目/编辑项目
    confirmAdd(){
      this.$refs["projectForm"].validate((valid) => {
        if (valid) {
          this.$axios({
            method: this.addOrCompile?'POST':'PUT',
            url: "/api/v1/projects",
            data: {
              id: !this.addOrCompile?this.projectId:'',
              engineeringId: this.engineeringID,
              contractNo: this.projectForm.contractNo,
              name: this.projectForm.name,
              contractSignTime: toolkit.transitionDate(this.projectForm.contractSignTime, "YYYY-MM-DD"),
              contractParty: this.projectForm.contractParty,
              contractMoney: this.projectForm.contractMoney * 100,
              defaultTaxRate: this.projectForm.defaultTaxRate * 100,
              payType: this.projectForm.payType,
              invoiceNoTax: this.projectForm.invoiceNoTax * 100,
              invoiceHaveTax: this.projectForm.invoiceHaveTax * 100,
              estimateNoTax: this.projectForm.estimateNoTax * 100,
              estimateHaveTax: this.projectForm.estimateHaveTax * 100
            }
          }).then(res=>{
            this.getProjectListData()
            this.dialogVisible = false;
            this.$message.success("添加成功");
          })
        }
      })
    },
    // 打开添加项目dialog
    addProject(){
      this.dialogVisible = true;
      this.addOrCompile = true;
      this.$nextTick(()=>{
        this.$refs["projectForm"].resetFields();
      })
    },
    // 基础信息保存修改
    save(){
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.ruleForm.id = this.engineeringID;
          this.$axios({
            method: "PUT",
            url: "/api/v1/engineerings",
            data: this.ruleForm
          }).then(res=>{
            this.$message.success("修改成功");
            this.toBack()
          })
        }
      })
    },
    // 获取工程基础信息
    getEngineeringData(){
      this.$axios({
        method: "GET",
        url: "/api/v1/engineerings/view/" + this.engineeringID
      }).then(res=>{
        this.ruleForm = res.data;
      })
    },
    // 获取工程的项目信息
    getProjectListData(){
      this.$axios({
        method: "GET",
        url: "/api/v1/projects",
        params: {
          engineeringId: this.engineeringID,
          name: this.projectName,
          pageNum: this.pageConfig.pageNum,
          pageSize: this.pageConfig.pageSize
        }
      }).then(res=>{
        this.projectTable = res.data.list;
        this.pageConfig.total = res.data.total;
      })
    },
    // 获取工程的物资信息
    getBatchData(){
      this.$axios({
        method: "GET",
        url: "/api/v1/materialBatchOperateRecords",
        params: {
          engineeringId: this.engineeringID,
          typeName: this.typeName,
          types: "2,3"
        }
      }).then(res=>{
        this.engTable = res.data.list;
        this.endPageConfig.total = res.data.total;
      })
    },
    // tab切换触发
    cutTabs(){
      switch (this.activeIndex) {
        case "1":
          this.getEngineeringData()
          break;
        case "2":
          this.getProjectListData()
          break;
        case "3":
          this.getBatchData()
          break;
      }
    },
    // 返回列表
    toBack(){
      this.$router.push("/engineering/list");
    },
    // 编辑项目信息
    compileProject(scope){
      this.projectId = scope.row.id;
      this.addOrCompile = false;
      this.$axios({
        method: "GET",
        url: "/api/v1/projects/" + scope.row.id
      }).then(res=>{
        this.dialogVisible = true;
        this.$nextTick(()=>{
          this.projectForm = Object.assign({}, res.data, {
            contractMoney: res.data.contractMoney / 100,
            defaultTaxRate: res.data.defaultTaxRate / 100,
            payedMoney: res.data.payedMoney / 100,
            unPayedMoney: res.data.unPayedMoney / 100,
            invoiceNoTax: res.data.invoiceNoTax / 100,
            invoiceHaveTax: res.data.invoiceHaveTax / 100,
            estimateNoTax: res.data.estimateNoTax / 100,
            estimateHaveTax: res.data.estimateHaveTax / 100
          })
        })
      })
    },
    // 切换页码
    cutPage(e, val, fn){
      this[val].pageNum = e;
      this[fn]();
    },
    // 发票管理
    toInvoice(scope){
      this.$router.push({
        path: "/engineering/invoiceMng",
        query: {
          id: scope.row.id
        }
      });
    }
  }
}
</script>

<style scoped>
.engineerCompile_container{
  background: #ffffff;
}
.form_box{
  padding: 20px 20px 0 20px;
}
.one_moneyBox{
  display: flex;
  align-items: center;
  border-top: 1px solid #dddddd;
}
.ul_box{
  display: flex;
  align-items: center;
  padding: 20px 30px;
  border-right: 1px solid #dddddd;
}
.li_box{
  display: flex;
  flex-direction: column;
}
.moneyNum{
  font-size: 20px;
  margin-top: 20px;
}
.thredLeft{
  margin-left: 30px;
}
.table_box{
  padding: 10px 20px 20px 20px;
}
.flexFormItem{
  width: 100%;
}
</style>
