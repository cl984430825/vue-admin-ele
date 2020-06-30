<template>
  <div id="invoice">
    <div class="invoice_container">
      <div class="searchBox">
        <div class="flexBox _bottom">
          <div class="flexBox">
            <span class="labelCls searchLabel">发票编号：</span>
            <el-input clearable v-model="invoiceNo" style="width:260px" placeholder="请输入发票编号"></el-input>
          </div>
          <div class="flexBox _left">
            <span class="labelCls searchLabel">发票类型：</span>
            <el-select v-model="status" style="width:260px">
              <el-option
              :key="index"
              :label="item"
              :value="index"
              v-for="(item, index) in typeList"></el-option>
            </el-select>
          </div>
        </div>
        <div class="flexBox">
          <div class="flexBox">
            <span class="labelCls searchLabel">开票日期：</span>
            <el-date-picker
              v-model="signTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="flexBox _left">
            <el-button @click="getInvoicesList" type="primary" size="medium">查询</el-button>
            <el-button @click="resetGet" size="medium">重置</el-button>
          </div>
        </div>
      </div>
      <div class="table_box _top">
        <el-button size="medium">
          <i class="el-icon-download"></i>
          <span>导出</span>
        </el-button>
        <el-table border :data="tableData" class="_top" :header-cell-style="{background:'#F6F5F4'}">
          <el-table-column label="发票编号" prop="invoiceNo"></el-table-column>
          <el-table-column label="开票日期" prop="signTime"></el-table-column>
          <el-table-column label="发票税率" prop="taxRate">
            <template slot-scope="scope">{{scope.row.taxRate|CYB}}%</template>
          </el-table-column>
          <el-table-column label="发票未税" prop="noTax">
            <template slot-scope="scope">{{scope.row.noTax|CYB}}</template>
          </el-table-column>
          <el-table-column label="发票含税" prop="includeTax">
            <template slot-scope="scope">{{scope.row.includeTax|CYB}}</template>
          </el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
          <el-table-column label="工程名称" prop="engineeringName"></el-table-column>
          <el-table-column label="合同编号" prop="contractNo"></el-table-column>
          <el-table-column label="项目名称" prop="projectName"></el-table-column>
          <el-table-column label="合同对方" prop="contractParty"></el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">{{scope.row.status==1?'已确认':'未确认'}}</template>
          </el-table-column>
        </el-table>
        <Page :pageConfig="pageConfig" @cutPage="cutPage" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "invoice",
  components: {
    "Page": resolve => require(["@/components/page.vue"], resolve)
  },
  data () {
    return {
      // 检索项-发票编号
      invoiceNo: "",
      // 检索项-开票日期
      signTime: [],
      // 发票类型
      status: 0,
      // 类型列表
      typeList: ["全部", "已确认", "未确认"],
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
    this.getInvoicesList()
  },
  methods: {
    // 获取发票列表数据
    getInvoicesList(){
      this.$axios({
        method: "GET",
        url: "/api/v1/invoices",
        params: {
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
    // 重置检索项
    resetGet(){
      this.invoiceNo = "";
      this.status = 0;
      this.signTime = [];
      this.getInvoicesList()
    },
    // 切换页码
    cutPage(e){
      this.pageConfig.pageNum = e;
      this.getInvoicesList()
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

