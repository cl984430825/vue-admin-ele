<template>
  <div id="engineerList">
    <div class="engineerList_container">
      <div class="search_box">
        <div class="_bottom">
          <span class="labelCls">工程名称：</span>
          <el-input
          clearable
          maxlength="20"
          v-model="name"
          style="width:260px" 
          placeholder="请输入工程名称"></el-input>
        </div>
        <div class="_left _right _bottom">
          <span class="labelCls">场站名称：</span>
          <el-input
          clearable
          maxlength="20"
          v-model="stationName"
          style="width:260px" 
          placeholder="请输入场站名称"></el-input>
        </div>
        <div class="_right _bottom">
          <span class="labelCls">状态：</span>
          <el-select v-model="status" placeholder="请选择" clearable>
            <el-option
            :key="index"
            :label="item"
            :value="index+1"
            v-for="(item, index) in ['进行中','已完成']"></el-option>
          </el-select>
        </div>
        <div class="_bottom">
          <el-button @click="getEngineeringData" type="primary" size="medium">查询</el-button>
          <el-button @click="reset" size="medium">重置</el-button>
        </div>
      </div>
      <div>
        <el-button @click="add" type="primary" size="medium">+ 新建</el-button>
      </div>
      <div class="table_box _top">
        <el-table border :data="tableData" :header-cell-style="{background:'#F6F5F4'}">
          <el-table-column label="工程名称" prop="name"></el-table-column>
          <el-table-column label="合同金额" prop="contractMoney">
            <template slot-scope="scope">{{scope.row.contractMoney|CYB}}</template>
          </el-table-column>
          <el-table-column label="已付金额" prop="payedMoney">
            <template slot-scope="scope">{{scope.row.payedMoney|CYB}}</template>
          </el-table-column>
          <el-table-column label="未付金额" prop="unPayedMoney">
            <template slot-scope="scope">{{scope.row.unPayedMoney|CYB}}</template>
          </el-table-column>
          <el-table-column label="发票含税" prop="invoiceHaveTax">
            <template slot-scope="scope">{{scope.row.invoiceHaveTax|CYB}}</template>
          </el-table-column>
          <el-table-column label="暂估含税" prop="estimateHaveTax">
            <template slot-scope="scope">{{scope.row.estimateHaveTax|CYB}}</template>
          </el-table-column>
          <el-table-column label="状态" width="70">
            <template slot-scope="scope">{{scope.row.status==1?'进行中':'已完成'}}</template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="160"></el-table-column>
          <el-table-column label="操作" width="110">
            <template slot-scope="scope">
              <span @click="lookDetail(scope)" class="blueText">查看</span>
              <el-dropdown trigger="click" @command="handleCommand">
                <span @click="more(scope)" class="blueText _left">更多</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1" icon="el-icon-edit">编辑</el-dropdown-item>
                  <el-dropdown-item command="2" icon="el-icon-delete">删除</el-dropdown-item>
                  <el-dropdown-item command="3" icon="el-icon-download">导出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
  name: "engineerList",
  components: {
    "Page": resolve => require(["@/components/page.vue"], resolve)
  },
  data () {
    return {
      // 检索项-工程名称
      name: "",
      // 检索项-场站名称
      stationName: "",
      // 检索项-状态
      status: "",
      // 数据-table表格
      tableData: [],
      // 分页配置项
      pageConfig: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 展开的工程id
      engineeringId: ""
    }
  },
  mounted(){
    this.getEngineeringData()
  },
  methods: {
    // 删除工程
    delEngineering(){
      this.$confirm('删除后无法恢复，确认要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: "DELETE",
          url: "/api/v1/engineerings/" + this.engineeringId
        }).then(res=>{
          this.getEngineeringData()
          this.$message.success("删除成功");
        })
      }).catch(()=>{})
    },
    // 获取工程列表数据
    getEngineeringData(){
      this.$axios({
        method: "GET",
        url: "/api/v1/engineerings",
        params: {
          name: this.name,
          stationName: this.stationName,
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
    reset(){
      this.name = "";
      this.stationName = "";
      this.status = "";
      this.getEngineeringData()
    },
    // dropdown展开
    more(scope){
      this.engineeringId = scope.row.id;
    },
    // dropdown点击
    handleCommand(e){
      switch(e){
        case "1":
          this.$router.push({
            path: "/engineering/compile",
            query: {
              id: this.engineeringId
            }
          });
          break;
        case "2":
          this.delEngineering()
          break;
        case "3":
          console.log("导出")
          break;
      }
    },
    // 查看详情
    lookDetail(scope){
      this.$router.push({
        path: "/engineering/detail",
        query: {
          id: scope.row.id
        }
      });
    },
    // 添加工程
    add(){
      this.$router.push("/engineering/add");
    }
  }
}
</script>

<style scoped>
.engineerList_container{
  padding: 20px;
  background: #ffffff;
}
.search_box{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
