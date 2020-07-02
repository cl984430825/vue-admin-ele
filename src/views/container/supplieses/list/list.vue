<template>
  <div id="list">
    <div class="list_container">
      <div class="searchBox">
        <div class="flexBox">
          <div class="flexBox">
            <span class="labelCls labelWidth">物资名称：</span>
            <el-input
            clearable 
            v-model="name" 
            style="width:260px"
            placeholder="请输入物资名称"></el-input>
          </div>
          <div class="flexBox _left">
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
            <span class="labelCls labelWidth">物资类别：</span>
            <el-select clearable v-model="type" style="width:260px" placeholder="请选择类型">
              <el-option
                v-for="(item, index) in typeList"
                :key="index"
                :label="item"
                :value="index+1">
              </el-option>
            </el-select>
          </div>
          <div class="flexBox _left">
            <el-button @click="getMaterialsList" size="medium" type="primary">查询</el-button>
            <el-button @click="reset" size="medium">重置</el-button>
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
          <el-table-column label="物资前缀" prop="no"></el-table-column>
          <el-table-column label="物资名称" prop="name"></el-table-column>
          <el-table-column label="品牌/型号" prop="model"></el-table-column>
          <el-table-column label="供应商" prop="supplier"></el-table-column>
          <el-table-column label="结存数量" prop="balanceCount"></el-table-column>
          <el-table-column label="单位" prop="unit" width="60"></el-table-column>
          <el-table-column label="结存金额" prop="balanceMoney">
            <template slot-scope="scope">{{scope.row.balanceMoney|CYB}}</template>
          </el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
          <el-table-column label="创建时间" prop="createTime"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <span @click="lookSupplieses(scope)" class="blueText">查看</span>
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
      // 检索项-物资名称
      name: "",
      // 检索项-供应商
      supplier: "",
      // 检索项-物资类别
      type: "",
      // 类型列表
      typeList: ["工程物资","在建工程","低值易耗","办公用品","固定资产","无形资产","贸易材料","研发材料","库存商品","劳保用品"],
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
        url: "/api/v1/materialTypes",
        params: {
          name: this.name,
          supplier: this.supplier,
          type: this.type,
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
      this.name = "";
      this.supplier = "";
      this.type = "";
      this.getMaterialsList()
    },
    // 新建物资
    addSuppliese(){
      this.$router.push("/supplieses/add");
    },
    // 查看物资信息
    lookSupplieses(scope){
      this.$router.push({
        path: "/supplieses/detail",
        query: {
          id: scope.row.id
        }
      });
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
.labelWidth{
  width: 80px;
  text-align: right;
}
</style>
