<template>
  <div id="inoutWarehouse">
    <div class="inoutWarehouse_container">
      <div class="searchBox">
        <div class="flexBox _bottom">
          <div class="flexBox">
            <span class="labelCls searchLabel">物资名称：</span>
            <el-input clearable v-model="typeName" placeholder="请输入物资名称"></el-input>
          </div>
          <div class="flexBox">
            <span class="labelCls searchLabel">供应商：</span>
            <el-input clearable v-model="supplier" placeholder="请输入供应商"></el-input>
          </div>
          <div class="flexBox">
            <span class="labelCls searchLabel">领用人：</span>
            <el-input clearable v-model="receiver" placeholder="请输入领用人"></el-input>
          </div>
        </div>
        <div class="flexBox" style="flex-wrap:wrap">
          <div class="flexBox _bottom">
            <span class="labelCls searchLabel">工程名称：</span>
            <el-input clearable v-model="engineeringName" placeholder="请输入工程名称"></el-input>
          </div>
          <div class="flexBox _bottom">
            <span class="labelCls searchLabel">操作时间：</span>
            <el-date-picker
              v-model="uTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="flexBox _right _bottom">
            <span class="labelCls searchLabel">发票号：</span>
            <el-input clearable v-model="invoiceNo" placeholder="请输入发票号"></el-input>
          </div>
          <div class="flexBox _bottom">
            <span class="labelCls searchLabel">物资类别：</span>
            <el-select clearable v-model="types" placeholder="请选择">
              <el-option
              :key="index"
              :label="item"
              :value="index+1"
              v-for="(item, index) in typeList"></el-option>
            </el-select>
          </div>
          <div class="flexBox _left _bottom">
            <el-button @click="getMaterBatchRecords" type="primary" size="medium">查询</el-button>
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
          <el-table-column label="物资名称" prop="typeName" width="200" fixed="left"></el-table-column>
          <el-table-column label="供应商" prop="supplier"></el-table-column>
          <el-table-column label="物资编号" prop="batchNo"></el-table-column>
          <el-table-column label="类型" prop="">-</el-table-column>
          <el-table-column label="数量" prop="count"></el-table-column>
          <el-table-column label="单价" prop="price">
            <template slot-scope="scope">{{scope.row.price|CYB}}</template>
          </el-table-column>
          <el-table-column label="合计金额" prop="totalMoney">
            <template slot-scope="scope">{{scope.row.totalMoney|CYB}}</template>
          </el-table-column>
          <el-table-column label="发票号" prop="">-</el-table-column>
          <el-table-column label="创建时间" prop="createTime"></el-table-column>
          <el-table-column label="操作时间" prop="updateTime"></el-table-column>
          <el-table-column label="结存金额" prop="balanceMoney">
            <template slot-scope="scope">{{scope.row.balanceMoney|CYB}}</template>
          </el-table-column>
          <el-table-column label="结存数量" prop="balanceCount"></el-table-column>
          <el-table-column label="存放地点" prop="">-</el-table-column>
          <el-table-column label="领用人" prop="receiver"></el-table-column>
          <el-table-column label="场站" prop="">-</el-table-column>
          <el-table-column label="使用状况" prop="">-</el-table-column>
          <el-table-column label="备注" prop="remark" width="200"></el-table-column>
        </el-table>
        <Page :pageConfig="pageConfig" @cutPage="cutPage" />
      </div>
    </div>
  </div>
</template>

<script>
import toolkit from "@/toolkit/index";
export default {
  name: "inoutWarehouse",
  components: {
    "Page": resolve => require(["@/components/page.vue"], resolve)
  },
  data () {
    return {
      // 检索项-物资名称
      typeName: "",
      // 检索项-供应商：
      supplier: "",
      // 检索项-领用人
      receiver: "",
      // 检索项-工程名称
      engineeringName: "",
      // 检索项-操作时间
      uTime: [],
      // 检索项-发票号
      invoiceNo: "",
      // 检索项-物资类别
      types: "",
      // 物资类别列表
      typeList: ["入库", "出库", "退回"],
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
    this.getMaterBatchRecords()
  },
  methods: {
    // 获取物资进出记录
    getMaterBatchRecords(){
      this.$axios({
        method: "GET",
        url: "/api/v1/materialBatchOperateRecords",
        params: {
          typeName: this.typeName,
          supplier: this.supplier,
          receiver: this.receiver,
          engineeringName: this.engineeringName,
          operateTimeStart: this.uTime[0]?toolkit.transitionDate(this.uTime[0], "YYYY-MM-DD HH:MM:SS"):'',
          operateTimeEnd: this.uTime[1]?toolkit.transitionDate(this.uTime[1], "YYYY-MM-DD HH:MM:SS"):'',
          invoiceNo: this.invoiceNo,
          types: this.types,
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
      this.typeName = "";
      this.supplier = "";
      this.receiver = "";
      this.engineeringName = "";
      this.uTime = [];
      this.invoiceNo = "";
      this.types = "";
      this.getMaterBatchRecords()
    },
    // 切换页码
    cutPage(e){
      this.pageConfig.pageNum = e;
      this.getMaterBatchRecords()
    }
  }
}
</script>

<style scoped>
.searchBox{
  padding: 20px 20px 0 20px;
  background: #ffffff;
}
.searchLabel{
  min-width: 90px;
  text-align: right;
}
.table_box{
  padding: 20px;
  background: #ffffff;
}
</style>
