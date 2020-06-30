<template>
  <div id="project">
    <div class="project_container">
      <div class="searchBox">
        <div class="flexBox">
          <div class="flexBox">
            <span class="labelCls searchLabel">工程名称：</span>
            <el-input clearable v-model="engineeringName" placeholder="请输入工程名称"></el-input>
          </div>
          <div class="flexBox _left">
            <span class="labelCls searchLabel">合同编号：</span>
            <el-input clearable v-model="contractNo" placeholder="请输入合同编号"></el-input>
          </div>
          <div class="flexBox _left">
            <span class="labelCls searchLabel">合同对方：</span>
            <el-input clearable v-model="contractParty" placeholder="请输入合同对方"></el-input>
          </div>
        </div>
        <div class="flexBox _top">
          <div class="flexBox">
            <span class="labelCls searchLabel">合同日期：</span>
            <el-date-picker
              type="daterange"
              v-model="contractSignTime"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="flexBox" style="margin-left:25px">
            <el-button @click="getProjectList" type="primary" size="medium">查询</el-button>
            <el-button size="medium">重置</el-button>
          </div>
        </div>
        <div class="one_moneyBox">
          <div class="ul_box">
            <div class="li_box">
              <span class="labelCls">合计</span>
            </div>
          </div>
          <div class="ul_box">
            <div class="li_box">
              <span class="labelCls">合同金额</span>
              <span class="labelCls moneyNum">296,000</span>
            </div>
            <div class="li_box thredLeft">
              <span class="labelCls">结算金额</span>
              <span class="labelCls moneyNum">390,000</span>
            </div>
          </div>
          <div class="ul_box">
            <div class="li_box">
              <span class="labelCls">已支付</span>
              <span class="labelCls moneyNum">296,000</span>
            </div>
            <div class="li_box thredLeft">
              <span class="labelCls">未支付</span>
              <span class="labelCls moneyNum">390,000</span>
            </div>
          </div>
          <div class="ul_box" style="border:0">
            <div class="li_box">
              <span class="labelCls">发票未税</span>
              <span class="labelCls moneyNum">296,000</span>
            </div>
            <div class="li_box thredLeft">
              <span class="labelCls">发票含税</span>
              <span class="labelCls moneyNum">390,000</span>
            </div>
            <div class="li_box thredLeft">
              <span class="labelCls">暂估未税</span>
              <span class="labelCls moneyNum">390,000</span>
            </div>
            <div class="li_box thredLeft">
              <span class="labelCls">暂估含税</span>
              <span class="labelCls moneyNum">390,000</span>
            </div>
          </div>
        </div>
      </div>
      <div class="table_box _top">
        <el-button size="medium">
          <i class="el-icon-download"></i>
          <span>导出</span>
        </el-button>
        <el-table border :data="tableData" class="_top" :header-cell-style="{background:'#F6F5F4'}">
          <el-table-column label="项目名称" prop="name" fixed="left" width="150"></el-table-column>
          <el-table-column label="合同编号" prop="contractNo" width="150"></el-table-column>
          <el-table-column label="合同金额" prop="contractMoney">
            <template slot-scope="scope">{{scope.row.contractMoney|CYB}}</template>
          </el-table-column>
          <el-table-column label="签订日期" prop="contractSignTime" width="160"></el-table-column>
          <el-table-column label="合同对方" prop="contractParty" width="100"></el-table-column>
          <el-table-column label="工程名称" prop="engineeringName" width="120"></el-table-column>
          <el-table-column label="发票未税" prop="invoiceNoTax" width="90">
            <template slot-scope="scope">{{scope.row.invoiceNoTax|CYB}}</template>
          </el-table-column>
          <el-table-column label="发票含税" prop="invoiceHaveTax" width="90">
            <template slot-scope="scope">{{scope.row.invoiceHaveTax|CYB}}</template>
          </el-table-column>
          <el-table-column label="暂估未税" prop="estimateNoTax" width="90">
            <template slot-scope="scope">{{scope.row.estimateNoTax|CYB}}</template>
          </el-table-column>
          <el-table-column label="暂估含税" prop="estimateHaveTax" width="90">
            <template slot-scope="scope">{{scope.row.estimateHaveTax|CYB}}</template>
          </el-table-column>
          <el-table-column label="已支付" prop="payedMoney" width="90">
            <template slot-scope="scope">{{scope.row.payedMoney|CYB}}</template>
          </el-table-column>
          <el-table-column label="未支付" prop="unPayedMoney" width="90">
            <template slot-scope="scope">{{scope.row.unPayedMoney|CYB}}</template>
          </el-table-column>
          <el-table-column label="发票号" prop="invoiceNos" width="120"></el-table-column>
        </el-table>
        <Page :pageConfig="pageConfig" @cutPage="cutPage" />
      </div>
    </div>
  </div>
</template>

<script>
import toolkit from "@/toolkit/index";
export default {
  name: "project",
  components: {
    "Page": resolve => require(["@/components/page.vue"], resolve)
  },
  data () {
    return {
      // 检索项-工程名称
      engineeringName: "",
      // 检索项-合同编号
      contractNo: "",
      // 检索项-合同日期
      contractSignTime: [],
      // 检索项-合同对方
      contractParty: "",
      // 项目列表数据
      tableData: [],
      // 分页配置项
      pageConfig: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted(){
    this.getProjectList()
  },
  methods: {
    // 获取项目列表数据
    getProjectList(){
      this.$axios({
        method: "GET",
        url: "/api/v1/projects",
        params: {
          engineeringName: this.engineeringName,
          contractNo: this.contractNo,
          contractParty: this.contractParty,
          pageNum: this.pageConfig.pageNum,
          pageSize: this.pageConfig.pageSize
        }
      }).then(res=>{
        this.tableData = res.data.list;
        this.pageConfig.total = res.data.total;
      })
    },
    // 切换分页
    cutPage(e){
      this.pageConfig.pageNum = e;
      this.getProjectList()
    }
  }
}
</script>

<style scoped>
.searchBox{
  padding: 20px;
  background: #ffffff;
}
.one_moneyBox{
  margin: 20px -20px -20px -20px;
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
.searchLabel{
  min-width: 80px;
  text-align: right;
}
.table_box{
  padding: 20px;
  background: #ffffff;
}
</style>
