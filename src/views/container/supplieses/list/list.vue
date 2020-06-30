<template>
  <div id="list">
    <div class="list_container">
      <div class="searchBox">
        <div class="flexBox">
          <div class="flexBox">
            <span class="labelCls">物资编号：</span>
            <el-input
            clearable 
            v-model="no" 
            style="width:260px"
            placeholder="请输入物资编号"></el-input>
          </div>
          <div class="flexBox _left">
            <span class="labelCls">类型：</span>
            <el-select clearable v-model="status" style="width:260px" placeholder="请选择类型">
              <el-option
                v-for="(item, index) in typeList"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
          </div>
          <div class="flexBox _left">
            <el-button @click="getMaterialsList" size="medium" type="primary">查询</el-button>
            <el-button size="medium">重置</el-button>
          </div>
        </div>
      </div>
      <div class="tableBox _top">
        <div class="flexBox">
          <el-button @click="addSuppliese" size="medium" type="primary">
            <i class="el-icon-plus"></i>
            <span>新建物资</span>
          </el-button>
          <el-button size="medium">批量入库</el-button>
          <span class="labelCls blueText _left">下载批量入库模板</span>
        </div>
        <el-table border :data="tableData" class="_top" :header-cell-style="{background:'#F6F5F4'}">
          <el-table-column label="物资ID">-</el-table-column>
          <el-table-column label="物资名称">-</el-table-column>
          <el-table-column label="品牌/型号">-</el-table-column>
          <el-table-column label="供应商">-</el-table-column>
          <el-table-column label="结存数量">-</el-table-column>
          <el-table-column label="单位">-</el-table-column>
          <el-table-column label="结存金额">-</el-table-column>
          <el-table-column label="备注">-</el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <span @click="lookSupplieses(scope)" class="blueText">查看</span>
              <span class="blueText _left">入库</span>
              <span class="blueText _left">出库</span>
              <span class="blueText _left">删除</span>
            </template>
          </el-table-column>
        </el-table>
        <Page :pageConfig="pageConfig" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  components: {
    "Page": resolve => require(["@/components/page.vue"], resolve)
  },
  data () {
    return {
      // 检索项-物资编号
      no: "",
      // 检索项-类型
      status: "",
      // 类型列表
      typeList: ["未出库", "已出库"],
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
    this.getMaterialsList()
  },
  methods: {
    // 获取物资列表
    getMaterialsList(){
      this.$axios({
        method: "GET",
        url: "/api/v1/materials",
        params: {
          no: this.no,
          status: this.status,
          pageNum: this.pageConfig.pageNum,
          pageSize: this.pageConfig.pageSize
        }
      }).then(res=>{
        this.tableData = res.data.list;
        this.pageConfig.total = res.data.total;
      })
    },
    // 新建物资
    addSuppliese(){
      this.$router.push("/supplieses/add");
    },
    // 查看物资信息
    lookSupplieses(scope){
      this.$router.push("/supplieses/detail");
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
