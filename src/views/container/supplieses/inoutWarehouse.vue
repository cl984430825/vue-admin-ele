<template>
  <div id="inoutWarehouse">
    <div class="inoutWarehouse_container">
      <div class="searchBox">
        <div class="flexBox _bottom">
          <div class="flexBox">
            <span class="labelCls searchLabel">物资名称：</span>
            <el-input clearable v-model="wzname" placeholder="请输入物资名称"></el-input>
          </div>
          <div class="flexBox _left">
            <span class="labelCls searchLabel">供应商：</span>
            <el-input clearable v-model="gys" placeholder="请输入供应商"></el-input>
          </div>
          <div class="flexBox _left">
            <span class="labelCls searchLabel">领用人：</span>
            <el-input clearable v-model="lyr" placeholder="请输入领用人"></el-input>
          </div>
        </div>
        <div class="flexBox" style="flex-wrap:wrap">
          <div class="flexBox _bottom">
            <span class="labelCls searchLabel">工程：</span>
            <el-input clearable v-model="gc" placeholder="请输入工程"></el-input>
          </div>
          <div class="flexBox _left _bottom">
            <span class="labelCls searchLabel">操作时间：</span>
            <el-date-picker
              v-model="czTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="flexBox _left _right _bottom">
            <span class="labelCls searchLabel">发票号：</span>
            <el-input clearable v-model="fpNum" placeholder="请输入发票号"></el-input>
          </div>
          <div class="flexBox _bottom">
            <span class="labelCls searchLabel">类型：</span>
            <el-radio-group v-model="wzType" size="medium">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="1">出库</el-radio-button>
              <el-radio-button label="2">入库</el-radio-button>
              <el-radio-button label="3">退回</el-radio-button>
            </el-radio-group>
          </div>
          <div class="flexBox _left _bottom">
            <el-button type="primary" size="medium">查询</el-button>
            <el-button size="medium">重置</el-button>
          </div>
        </div>
      </div>
      <div class="table_box _top">
        <el-button size="medium">
          <i class="el-icon-download"></i>
          <span>导出</span>
        </el-button>
        <el-table border :data="tableData" class="_top" :header-cell-style="{background:'#F6F5F4'}">
          <el-table-column label="物资名称">充电桩</el-table-column>
          <el-table-column label="供应商">杭州呈安科技</el-table-column>
          <el-table-column label="物资编号">CL001-100</el-table-column>
          <el-table-column label="类型">入库</el-table-column>
          <el-table-column label="数量">50</el-table-column>
          <el-table-column label="单价">1,500</el-table-column>
          <el-table-column label="合计金额">5900</el-table-column>
          <el-table-column label="操作时间">2020-06-01</el-table-column>
          <el-table-column label="发票号">09255539</el-table-column>
          <el-table-column label="开票时间">2020-06-01</el-table-column>
          <el-table-column label="结存金额">15,000</el-table-column>
          <el-table-column label="结存数量">10</el-table-column>
          <el-table-column label="存放地点">教工路仓库</el-table-column>
          <el-table-column label="领用人">-</el-table-column>
          <el-table-column label="场站">-</el-table-column>
          <el-table-column label="使用状况">-</el-table-column>
          <el-table-column label="备注">-</el-table-column>
        </el-table>
        <Page :pageConfig="pageConfig" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "inoutWarehouse",
  components: {
    "Page": resolve => require(["@/components/page.vue"], resolve)
  },
  data () {
    return {
      // 检索项-物资名称
      wzname: "",
      // 检索项-供应商：
      gys: "",
      // 检索项-领用人
      lyr: "",
      // 检索项-工程
      gc: "",
      // 检索项-操作时间
      czTime: [],
      // 检索项-发票号
      fpNum: "",
      // 物资类型
      wzType: "",
      // 项目列表数据
      tableData: [1,2,3,4,5],
      // 分页配置项
      pageConfig: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
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
  min-width: 80px;
  text-align: right;
}
.table_box{
  padding: 20px;
  background: #ffffff;
}
</style>
