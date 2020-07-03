<template>
  <div id="engineerDetail">
    <div class="engineerDetail_container">
      <el-tabs v-model="activeIndex" @tab-click="cutTabs">
        <el-tab-pane label="基础信息" name="1">
          <div class="one_titleBox">
            <div>
              <div class="titleCls">{{engineeringInfo.name}}</div>
              <div class="_top one_tagBox">
                <span class="labelCls">创建人：{{engineeringInfo.createrName}}</span>
                <span class="labelCls _left">创建时间：{{engineeringInfo.createTime}}</span>
                <span class="labelCls _left">工程状态：{{engineeringInfo.status==1?'进行中':'已完成'}}</span>
                <span class="labelCls _left">场站：{{engineeringInfo.stationName}}</span>
              </div>
            </div>
            <div>
              <el-button @click="toCompile" type="primary">
                <i class="el-icon-edit"></i>
                <span>编辑</span>
              </el-button>
              <el-button type="primary">
                <i class="el-icon-download"></i>
                <span>导出</span>
              </el-button>
            </div>
          </div>
          <div class="one_moneyBox">
            <div class="ul_box">
              <div class="li_box">
                <span class="labelCls">合同金额</span>
                <span class="labelCls moneyNum">{{engineeringInfo.contractMoney|CYB}}</span>
              </div>
              <div class="li_box thredLeft">
                <span class="labelCls">结算金额</span>
                <span class="labelCls moneyNum">{{engineeringInfo.settleMoney|CYB}}</span>
              </div>
            </div>
            <div class="ul_box">
              <div class="li_box">
                <span class="labelCls">已支付</span>
                <span class="labelCls moneyNum">{{engineeringInfo.payedMoney|CYB}}</span>
              </div>
              <div class="li_box thredLeft">
                <span class="labelCls">未支付</span>
                <span class="labelCls moneyNum">{{engineeringInfo.unPayedMoney|CYB}}</span>
              </div>
            </div>
            <div class="ul_box" style="border:0">
              <div class="li_box">
                <span class="labelCls">发票未税</span>
                <span class="labelCls moneyNum">{{engineeringInfo.invoiceNoTax|CYB}}</span>
              </div>
              <div class="li_box thredLeft">
                <span class="labelCls">发票含税</span>
                <span class="labelCls moneyNum">{{engineeringInfo.invoiceHaveTax|CYB}}</span>
              </div>
              <div class="li_box thredLeft">
                <span class="labelCls">暂估未税</span>
                <span class="labelCls moneyNum">{{engineeringInfo.estimateNoTax|CYB}}</span>
              </div>
              <div class="li_box thredLeft">
                <span class="labelCls">暂估含税</span>
                <span class="labelCls moneyNum">{{engineeringInfo.estimateHaveTax|CYB}}</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目信息" name="2">
          <div class="table_box">
            <el-input 
            clearable
            v-model="projectName"
            style="width:300px" 
            placeholder="项目名称">
              <el-button @click="getProjectListData" slot="append" icon="el-icon-search"></el-button>
            </el-input>
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
              <el-table-column label="操作" fixed="right" width="160">
                <template slot-scope="scope">
                  <span @click="toInvoice(scope)" class="blueText">发票管理</span>
                  <span class="blueText _left">付款记录</span>
                </template>
              </el-table-column>
            </el-table>
            <Page :pageConfig="pageConfig" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="物资信息" name="3">
          <div class="table_box">
            <el-input 
              clearable
              v-model="typeName"
              style="width:300px" 
              placeholder="物资名称">
              <el-button @click="getBatchData" slot="append" icon="el-icon-search"></el-button>
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
            <Page :pageConfig="endPageConfig" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "engineerDetail",
  components: {
    "Page": resolve => require(["@/components/page.vue"], resolve)
  },
  data () {
    return {
      // 当前所选的工程ID
      engineeringID: "",
      // tab选中项
      activeIndex: "1",
      // 检索项-项目名称
      projectName: "",
      // 检索项-物资名称
      typeName: "",
      // 项目基础信息
      engineeringInfo: {
        contractMoney: 0,
        settleMoney: 0,
        payedMoney: 0,
        unPayedMoney: 0,
        invoiceNoTax: 0,
        invoiceHaveTax: 0,
        estimateNoTax: 0,
        estimateHaveTax: 0
      },
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
      }
    }
  },
  mounted(){
    this.engineeringID = this.$router.currentRoute.query.id;
    this.getEngineeringData()
  },
  methods: {
    // 获取工程基础信息
    getEngineeringData(){
      this.$axios({
        method: "GET",
        url: "/api/v1/engineerings/view/" + this.engineeringID
      }).then(res=>{
        this.engineeringInfo = res.data;
      })
    },
    // 获取工程的项目信息
    getProjectListData(){
      this.$axios({
        method: "GET",
        url: "/api/v1/projects",
        params: {
          engineeringId: this.engineeringID,
          name: this.projectName
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
    // 编辑项目
    toCompile () {
      this.$router.push({
        path: "/engineering/compile",
        query: {
          id: this.engineeringID
        }
      });
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
.engineerDetail_container{
  background: #ffffff;
}
.one_titleBox{
  padding: 10px 40px 25px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.one_tagBox{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
</style>
