<template>
  <div id="balanceReport">
    <div class="balanceReport_container">
      <div class="searchBox">
        <div class="flexBox">
          <div class="flexBox">
            <span class="labelCls">供应商：</span>
            <el-input
            clearable 
            v-model="supplier" 
            style="width:260px"
            placeholder="请输入供应商"></el-input>
          </div>
        </div>
        <div class="flexBox _top">
          <div class="flexBox">
            <span class="labelCls">时间段：</span>
            <el-date-picker
              v-model="dateVal"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="flexBox _left">
            <el-button @click="getMaterialsBalanceList" size="medium" type="primary">查询</el-button>
            <el-button @click="reset" size="medium">重置</el-button>
          </div>
        </div>
      </div>
      <div class="tableBox _top">
        <el-button size="medium">
          <i class="el-icon-download"></i>
          <span>导出</span>
        </el-button>
        <el-table border :data="tableData" class="_top" :header-cell-style="{background:'#F6F5F4'}">
          <el-table-column label="物资类别名称" prop="typeName"></el-table-column>
          <el-table-column label="供应商" prop="supplier"></el-table-column>
          <el-table-column label="结存数量" prop="balanceCount"></el-table-column>
          <el-table-column label="单位" prop="unit"></el-table-column>
          <el-table-column label="结存金额" prop="balanceMoney">
            <template slot-scope="scope">{{scope.row.balanceMoney|CYB}}</template>
          </el-table-column>
          <el-table-column label="统计时间" prop="createTime"></el-table-column>
        </el-table>
        <Page :pageConfig="pageConfig" @cutPage="cutPage" />
      </div>
    </div>
  </div>
</template>

<script>
import toolkit from "@/toolkit/index";
export default {
  name: "balanceReport",
  components: {
    "Page": resolve => require(["@/components/page.vue"], resolve)
  },
  data () {
    return {
      // 检索项-供应商
      supplier: "",
      // 检索项-时间段
      dateVal: [],
      // 表单数据
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
    this.getMaterialsBalanceList()
  },
  methods: {
    // 获取物资结存记录列表
    getMaterialsBalanceList(){
      this.$axios({
        method: "GET",
        url: "/api/v1/materialBalanceRecords",
        params: {
          supplier: this.supplier,
          balanceTimeStart: this.dateVal[0]?toolkit.transitionDate(this.dateVal[0], "YYYY-MM-DD HH:MM:SS"):'',
          balanceTimeEnd: this.dateVal[1]?toolkit.transitionDate(this.dateVal[1], "YYYY-MM-DD HH:MM:SS"):'',
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
      this.supplier = "";
      this.dateVal = [];
      this.getMaterialsBalanceList()
    },
    // 切换页码
    cutPage(e){
      this.pageConfig.pageNum = e;
      this.getMaterialsBalanceList()
    }
  }
}
</script>

<style scoped>
.searchBox{
  padding: 20px;
  background: #ffffff;
}
.tableBox{
  padding: 20px;
  background: #ffffff;
}
</style>
