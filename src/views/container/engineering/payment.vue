<template>
  <div id="payment">
    <div class="payment_container">
      <div class="searchBox">
        <div class="flexBox _bottom">
          <div class="flexBox">
            <span class="labelCls searchLabel">工程名称：</span>
            <el-input clearable v-model="engineeringName" style="width:260px" placeholder="请输入工程名称"></el-input>
          </div>
          <div class="flexBox _left">
            <span class="labelCls searchLabel">付款金额：</span>
            <el-input clearable v-model="payedMoney" style="width:260px" placeholder="请输入付款金额"></el-input>
          </div>
        </div>
        <div class="flexBox" style="flex-wrap:wrap">
          <div class="flexBox _right">
            <span class="labelCls searchLabel">付款时间：</span>
            <el-date-picker
              v-model="payTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="flexBox _left">
            <el-button @click="getPaymentList" type="primary" size="medium">查询</el-button>
            <el-button @click="reset" size="medium">重置</el-button>
          </div>
        </div>
      </div>
      <div class="table_box _top">
        <el-button size="medium">
          <i class="el-icon-download"></i>
          <span>导出</span>
        </el-button>
        <el-table border :data="tableData" class="_top" :header-cell-style="{background:'#F6F5F4'}">
          <el-table-column label="工程名称" prop="engineeringName"></el-table-column>
          <el-table-column label="合同编号" prop="contractNo"></el-table-column>
          <el-table-column label="项目内容" prop="projectName"></el-table-column>
          <el-table-column label="合同对方" prop="contractParty"></el-table-column>
          <el-table-column label="合同金额" prop="contractMoney">
            <template slot-scope="scope">{{scope.row.contractMoney|CYB}}</template>
          </el-table-column>
          <el-table-column label="付款金额" prop="payedMoney">
            <template slot-scope="scope">{{scope.row.payedMoney|CYB}}</template>
          </el-table-column>
          <el-table-column label="付款时间" prop="payTime"></el-table-column>
        </el-table>
        <Page :pageConfig="pageConfig" @cutPage="cutPage" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "payment",
  components: {
    "Page": resolve => require(["@/components/page.vue"], resolve)
  },
  data () {
    return {
      // 检索项-工程名称
      engineeringName: "",
      // 检索项-合同金额
      payedMoney: "",
      // 检索项-付款时间
      payTime: [],
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
    this.getPaymentList()
  },
  methods: {
    // 获取付款列表数据
    getPaymentList(){
      this.$axios({
        method: "GET",
        url: "/api/v1/paymentRecords",
        params: {
          engineeringName: this.engineeringName,
          payedMoney: this.payedMoney,
          payTime: this.payTime,
          pageNum: this.pageConfig.pageNum,
          pageSize: this.pageConfig.pageSize
        }
      }).then(res=>{
        this.tableData = res.data.list;
        this.pageConfig.total = res.data.total;
      })
    },
    // 重置检索项
    reset(){
      this.engineeringName = "";
      this.payedMoney = "";
      this.payTime = [];
      this.getPaymentList()
    },
    // 切换页码
    cutPage(e){
      this.pageConfig.pageNum = e;
      this.getPaymentList()
    }
  }
}
</script>

<style scoped>
.searchBox{
  padding: 20px;
  background: #ffffff;
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
