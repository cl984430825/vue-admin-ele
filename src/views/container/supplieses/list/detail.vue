<template>
  <div id="detail">
    <div class="detail_container">
      <el-tabs v-model="activeIndex" @tab-click="cutTag">
        <el-tab-pane label="基础信息" name="1">
          <div class="form_box">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="物资名称：" prop="name">
                <el-input 
                clearable
                maxlength="20"
                style="width:260px" 
                v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="品牌型号：" prop="model">
                <el-input 
                clearable 
                style="width:260px" 
                v-model="ruleForm.model"></el-input>
              </el-form-item>
              <el-form-item label="供应商：" prop="supplier">
                <el-input 
                clearable 
                style="width:260px" 
                v-model="ruleForm.supplier"></el-input>
              </el-form-item>
              <el-form-item label="单位：" prop="unit">
                <el-input 
                clearable 
                style="width:260px" 
                v-model="ruleForm.unit"></el-input>
              </el-form-item>
              <el-form-item label="编号前缀：" prop="no">
                <el-input v-model="ruleForm.no" style="width:260px"></el-input>
              </el-form-item>
              <el-form-item label="备注：" prop="remark">
                <el-input 
                clearable
                style="width:260px" 
                v-model="ruleForm.remark"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="type">
                <el-select v-model="ruleForm.type">
                  <el-option
                  :key="index"
                  :value="index"
                  :label="item"
                  v-for="(item, index) in typeList"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="saveDetail" size="medium" type="primary">
                  <i class="el-icon-document-add"></i>
                  <span>保存</span>
                </el-button>
                <el-button @click="toBack" size="medium">返回列表</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="批次信息" name="2">
          <div class="table_box">
            <div class="flexBetween">
              <el-input 
              clearable
              v-model="no"
              style="width:300px" 
              placeholder="请输入批次号">
                <el-button @click="getMaterialBatchList" slot="append" icon="el-icon-search"></el-button>
              </el-input>
              <div class="flexBox">
                <el-button @click="openRuku" type="primary" size="medium">+ 入库</el-button>
                <el-button @click="openChuku(false)" type="primary" size="medium">+ 出库</el-button>
                <el-button @click="openTuihui" type="primary" size="medium">+ 退回</el-button>
                <el-button size="medium">导出</el-button>
              </div>
            </div>
            <el-table border class="_top" :data="batchTable" :header-cell-style="{background:'#F6F5F4'}">
              <el-table-column label="批次号" prop="no" width="150"></el-table-column>
              <el-table-column label="物资编号" prop="materialNo" width="150"></el-table-column>
              <el-table-column label="单价" prop="price" width="100">
                <template slot-scope="scope">{{scope.row.price|CYB}}</template>
              </el-table-column>
              <el-table-column label="结存数量" prop="balanceCount" width="100"></el-table-column>
              <el-table-column label="结存金额" prop="balanceMoney" width="150">
                <template slot-scope="scope">{{scope.row.balanceMoney|CYB}}</template>
              </el-table-column>
              <el-table-column label="发票号" prop="invoiceNo" width="200">
                <template slot-scope="scope">{{scope.row.invoiceNo}}</template>
              </el-table-column>
              <el-table-column label="开票时间" prop="invoiceSignTime" width="160"></el-table-column>
              <el-table-column label="存放地点" prop="storageLocation" width="100"></el-table-column>
              <el-table-column label="操作" fixed="right" width="160">
                <template slot-scope="scope">
                  <span @click="chukuOne(scope)" v-if="scope.row.balanceCount>1" class="blueText">出库</span>
                  <span class="blueText _left">编辑</span>
                  <span @click="delBatch(scope)" v-if="scope.row.count==scope.row.balanceCount" class="blueText _left">删除</span>
                </template>
              </el-table-column>
            </el-table>
            <Page :pageConfig="batchPage" @cutPage="cutPage($event,'batchPage','getMaterialBatchList')" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="出入库明细" name="3">
          <div class="table_box">
            <div class="flexBetween">
              <div class="flexBox">
                <div class="flexBox">
                  <span class="labelCls searchLabel">类型：</span>
                  <el-radio-group v-model="types" size="medium" @change="getOperateRecordList">
                    <el-radio-button label="">全部</el-radio-button>
                    <el-radio-button label="1">入库</el-radio-button>
                    <el-radio-button label="2">出库</el-radio-button>
                    <el-radio-button label="3">退回</el-radio-button>
                  </el-radio-group>
                </div>
                <el-input 
                  clearable
                  class="_left"
                  v-model="typeName"
                  style="width:300px" 
                  placeholder="物资名称">
                  <el-button @click="getOperateRecordList" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <el-button size="medium">导出</el-button>
            </div>
            <el-table border class="_top" :data="engTable" :header-cell-style="{background:'#F6F5F4'}">
              <el-table-column label="物资批次" prop="batchNo"></el-table-column>
              <el-table-column label="物资编号" prop="materialNo"></el-table-column>
              <el-table-column label="数量" prop="count"></el-table-column>
              <el-table-column label="单价" prop="price"></el-table-column>
              <el-table-column label="合计金额" prop="totalMoney"></el-table-column>
              <el-table-column label="操作时间" prop="updateTime"></el-table-column>
              <el-table-column label="发票号" prop="">-</el-table-column>
              <el-table-column label="开票时间" prop="">-</el-table-column>
              <el-table-column label="领用人" prop="receiver"></el-table-column>
              <el-table-column label="结存金额" prop="balanceMoney"></el-table-column>
              <el-table-column label="结存数量" prop="balanceCount"></el-table-column>
              <el-table-column label="备注" prop="remark" width="120"></el-table-column>
            </el-table>
            <Page :pageConfig="engPageConfig" @cutPage="cutPage($event,'engPageConfig','getOperateRecordList')" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      width="40%"
      title="新增入库"
      :visible.sync="rukuDialog">
      <el-form :model="rukuForm" :rules="rukuFormRules" ref="rukuForm" label-width="95px" class="demo-ruleForm">
        <el-form-item label="物资：" prop="name">
          <el-input v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="批次：" prop="no">
          <el-input v-model="batchNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="数量：" prop="count">
          <el-input v-model="rukuForm.count" maxlength="3" clearable placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="总金额：" prop="totalMoney">
          <div class="flexBox">
            <el-input v-model="rukuForm.totalMoney" clearable placeholder="总金额">
              <template slot="prepend">￥</template>
            </el-input>
            <div class="labelCls _left _right">
              <span v-if="rukuForm.totalMoney&&rukuForm.count">单价：{{(rukuForm.totalMoney / rukuForm.count)|FIXED}}</span>
              <span v-else>单价：-</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="编号：" prop="count">
          <div class="flexBox">
            <el-input v-model="batchNo" clearable disabled></el-input>
            <el-input v-model="rukuForm.startNo" clearable disabled style="width:60%" placeholder="起始"></el-input>
            <el-input v-model="rukuForm.count" clearable disabled style="width:60%" placeholder="截止"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="发票号：" prop="invoiceNo">
          <el-input v-model="rukuForm.invoiceNo" clearable placeholder="请输入发票号"></el-input>
        </el-form-item>
        <el-form-item label="开票时间：" prop="invoiceSignTime">
          <el-date-picker
            v-model="rukuForm.invoiceSignTime"
            type="datetime"
            placeholder="选择开票时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="存放地点：" prop="storageLocation">
          <el-input v-model="rukuForm.storageLocation" clearable placeholder="请输入存放地点"></el-input>
        </el-form-item>
        <el-form-item label="备注说明：" prop="remark">
          <el-input v-model="rukuForm.remark" clearable placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="rukuConfirm(1)" type="primary" size="medium">确 定</el-button>
          <el-button size="medium">取 消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        width="40%"
        title="核对并确认以下信息"
        :visible.sync="rukuDialogT"
        append-to-body>
        <div style="padding:0 20px">
          <div>
            <span>物资：</span>
            <span>{{ruleForm.name}}</span>
          </div>
          <div class="_top">
            <span>批次：</span>
            <span>{{batchNo}}</span>
          </div>
          <div class="_top">
            <span>数量：</span>
            <span>{{rukuForm.count}}</span>
          </div>
          <div class="_top">
            <span>总金额：</span>
            <span>￥{{rukuForm.totalMoney|FIXED}}</span>
          </div>
          <div class="_top">
            <span>单价：</span>
            <span>￥{{(rukuForm.totalMoney / rukuForm.count)|FIXED}}</span>
          </div>
          <div class="_top">
            <span>编号：</span>
            <span>{{batchNo}}-{{rukuForm.startNo}}-{{rukuForm.count}}</span>
          </div>
          <div class="_top">
            <span>发票号：</span>
            <span>{{rukuForm.invoiceNo}}</span>
          </div>
          <div class="_top">
            <span>开票时间：</span>
            <span>{{rukuForm.invoiceSignTime|TRANSDATE}}</span>
          </div>
          <div class="_top">
            <span>存放地点：</span>
            <span>{{rukuForm.storageLocation}}</span>
          </div>
          <div class="_top">
            <span>备注说明：</span>
            <span>{{rukuForm.remark}}</span>
          </div>
          <div class="_top">
            <el-button @click="rukuConfirm(2)" type="primary" size="medium">确 定</el-button>
            <el-button @click="rukuDialogT=false" size="medium">取 消</el-button>
          </div>
        </div>
      </el-dialog>
    </el-dialog>
    <el-dialog
      width="40%"
      title="新增出库"
      :visible.sync="chukuDialog">
      <el-form :model="chukuForm" :rules="chukuFormRules" ref="chukuForm" label-width="95px" class="demo-ruleForm">
        <el-form-item label="物资：" prop="name">
          <el-input v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="批次：" prop="batch">
          <el-select v-model="chukuForm.batch" @change="pitchBatch" style="width:100%" filterable placeholder="请选择批次">
            <el-option
              v-for="(item,index) in batchList"
              :key="index"
              :label="item.batchNo"
              :value="item.batchId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="场站：" prop="engineeringId">
          <el-select v-model="chukuForm.engineeringId" @change="pitchPark" style="width:100%" filterable placeholder="请选择场站">
            <el-option
              v-for="(item,index) in parkList"
              :key="index"
              :label="item.stationName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量：" prop="count">
          <el-input-number v-model="chukuForm.count" :min="1" :max="batchInfo.balanceCount"></el-input-number>
          <span class="labelCls _left" v-if="batchInfo.balanceCount">当前结存数量：{{batchInfo.balanceCount}}</span>
        </el-form-item>
        <el-form-item label="总金额：" prop="totalMoney">
          <el-input-number v-model="chukuForm.totalMoney" controls-position="right" :min="1" :max="batchInfo.balanceMoney/100" :precision="2"></el-input-number>
          <span class="labelCls _left" v-if="batchInfo.balanceMoney">当前结存金额：{{batchInfo.balanceMoney|CYB}}</span>
        </el-form-item>
        <el-form-item label="领用人：" prop="receiver">
          <el-input v-model="chukuForm.receiver" placeholder="请输入领用人"></el-input>
        </el-form-item>
        <el-form-item label="使用状况：" prop="useDetail">
          <el-input v-model="chukuForm.useDetail" placeholder="请输入使用状况"></el-input>
        </el-form-item>
        <el-form-item label="备注说明：" prop="remark">
          <el-input v-model="chukuForm.remark" clearable placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="chukuConfirm(1)" type="primary" size="medium">确 定</el-button>
          <el-button size="medium">取 消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        width="40%"
        title="核对并确认以下信息"
        :visible.sync="chukuDialogT"
        append-to-body>
        <div style="padding:0 20px">
          <div>
            <span>物资：</span>
            <span>{{ruleForm.name}}</span>
          </div>
          <div class="_top">
            <span>批次：</span>
            <span>{{batchInfo.batchNo}}</span>
          </div>
          <div class="_top">
            <span>场站：</span>
            <span>{{chukuForm.stationName}}</span>
          </div>
          <div class="_top">
            <span>数量：</span>
            <span>{{chukuForm.count}}</span>
          </div>
          <div class="_top">
            <span>总金额：</span>
            <span>￥{{chukuForm.totalMoney}}</span>
          </div>
          <div class="_top">
            <span>领用人：</span>
            <span>{{chukuForm.receiver}}</span>
          </div>
          <div class="_top">
            <span>使用状况：</span>
            <span>{{chukuForm.useDetail}}</span>
          </div>
          <div class="_top">
            <span>备注说明：</span>
            <span>{{chukuForm.remark}}</span>
          </div>
          <div class="_top">
            <el-button @click="chukuConfirm(2)" type="primary" size="medium">确 定</el-button>
            <el-button @click="chukuDialogT=false" size="medium">取 消</el-button>
          </div>
        </div>
      </el-dialog>
    </el-dialog>
    <el-dialog
      width="40%"
      title="新增退回"
      :visible.sync="tuihuiDialog">
      <el-form :model="tuihuiForm" :rules="tuihuiFormRules" ref="tuihuiForm" label-width="95px" class="demo-ruleForm">
        <el-form-item label="物资：" prop="name">
          <el-input v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="批次：" prop="batch">
          <el-select v-model="tuihuiForm.batch" @change="pitchBatch" style="width:100%" filterable placeholder="请选择批次">
            <el-option
              v-for="(item,index) in batchList"
              :key="index"
              :label="item.batchNo"
              :value="item.batchId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量：" prop="count">
          <el-input-number v-model="tuihuiForm.count" :min="1" :max="batchInfo.balanceCount"></el-input-number>
          <span class="labelCls _left" v-if="batchInfo.balanceCount||batchInfo.balanceCount==0">当前结存数量：{{batchInfo.balanceCount}}</span>
        </el-form-item>
        <el-form-item label="总金额：" prop="totalMoney">
          <el-input-number v-model="tuihuiForm.totalMoney" controls-position="right" :min="1" :max="batchInfo.balanceMoney/100" :precision="2"></el-input-number>
          <span class="labelCls _left" v-if="batchInfo.balanceMoney||batchInfo.balanceMoney==0">当前结存金额：{{batchInfo.balanceMoney|CYB}}</span>
        </el-form-item>
        <el-form-item label="备注说明：" prop="remark">
          <el-input v-model="tuihuiForm.remark" clearable placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="tuihuiConfirm(1)" type="primary" size="medium">确 定</el-button>
          <el-button size="medium">取 消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        width="40%"
        title="核对并确认以下信息"
        :visible.sync="tuihuiDialogT"
        append-to-body>
        <div style="padding:0 20px">
          <div>
            <span>物资：</span>
            <span>{{ruleForm.name}}</span>
          </div>
          <div class="_top">
            <span>批次：</span>
            <span>{{batchInfo.batchNo}}</span>
          </div>
          <div class="_top">
            <span>数量：</span>
            <span>{{tuihuiForm.count}}</span>
          </div>
          <div class="_top">
            <span>总金额：</span>
            <span>￥{{tuihuiForm.totalMoney}}</span>
          </div>
          <div class="_top">
            <span>备注说明：</span>
            <span>{{tuihuiForm.remark}}</span>
          </div>
          <div class="_top">
            <el-button @click="tuihuiConfirm(2)" type="primary" size="medium">确 定</el-button>
            <el-button @click="tuihuiDialogT=false" size="medium">取 消</el-button>
          </div>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import toolkit from "@/toolkit/index";
export default {
  name: "detail",
  components: {
    "Page": resolve => require(["@/components/page.vue"], resolve)
  },
  data () {
    return {
      // tab选中项
      activeIndex: "1",
      // 基础信息表单
      ruleForm: {
        name: "",
        model: "",
        supplier: "",
        unit: "",
        no: "",
        remark: "",
        type: 0
      },
      // 表单校验规则
      rules: {
        name: { required: true, message: '请输入物资名称', trigger: 'blur' },
        model: { required: true, message: '请输入品牌型号', trigger: 'blur' },
        supplier: { required: true, message: '请输入供应商', trigger: 'blur' },
        unit: { required: true, message: '请输入单位', trigger: 'blur' },
        no: { required: true, message: '请输入编号前缀', trigger: 'blur' }
      },
      // 类型列表
      typeList: ["工程物资", "在建工程", "低值易耗", "办公用品", "固定资产", "无形资产", "贸易材料", "研发材料", "库存商品", "劳保用品"],
      // 检索项-批次列表批次号
      no: "",
      // 检索项-出入库明细物资名称
      typeName: "",
      // 检索项-出入库明细类别
      types: "",
      // 批次信息table
      batchTable: [],
      // 出入库明细table
      engTable: [],
      // 批次信息分页配置项
      batchPage: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 出入库明细分页配置项
      engPageConfig: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 入库dialog
      rukuDialog: false,
      rukuDialogT: false,
      // 出库dialog
      chukuDialog: false,
      chukuDialogT: false,
      // 退回dialog
      tuihuiDialog: false,
      tuihuiDialogT: false,
      // 新增入库表单
      rukuForm: {
        name: true,
        no: true,
        count: "",
        totalMoney: "",
        startNo: 1,
        invoiceNo: "",
        invoiceSignTime: "",
        storageLocation: "",
        remark: ""
      },
      rukuFormRules: {
        name: { required: true },
        no: { required: true },
        count: { required: true, message: '请输入物资数量', trigger: 'blur' },
        totalMoney: { required: true, message: '请输入总金额', trigger: 'blur' },
        invoiceNo: { required: true, message: '请输入发票号', trigger: 'blur' },
        invoiceSignTime: { required: true, message: '请选择开票时间', trigger: 'blur' },
      },
      // 新增出库表单
      chukuForm: {
        name: true,
        batch: "",
        engineeringId: "",
        count: 1,
        totalMoney: 1,
        receiver: "",
        useDetail: "",
        remark: ""
      },
      chukuFormRules: {
        name: { required: true },
        batch: { required: true, message: '请选择批次', trigger: 'blur' },
        engineeringId: { required: true, message: '请选择场站', trigger: 'blur' },
        count: { required: true },
        totalMoney: { required: true },
        receiver: { required: true, message: '请输入领用人', trigger: 'blur' },
        useDetail: { required: true, message: '请输入领用人', trigger: 'blur' }
      },
      // 新增退回表单
      tuihuiForm: {
        name: true,
        batch: "",
        count: 1,
        totalMoney: 1,
        remark: ""
      },
      tuihuiFormRules: {
        name: { required: true },
        batch: { required: true, message: '请选择批次', trigger: 'blur' },
        count: { required: true },
        totalMoney: { required: true },
      },
      // 批次下拉列表
      batchList: [],
      // 场站下拉列表
      parkList: [],
      // 所属物资类别id
      supplieseId: "",
      // 批次号
      batchNo: "",
      // 批次号选中后的批次信息
      batchInfo: {}
    }
  },
  mounted(){
    this.supplieseId = this.$router.currentRoute.query.id;
    this.getSupplieseDetail()
    this.getNewBatchNo()
  },
  methods: {
    // 选中批次
    pitchBatch(e){
      this.batchInfo = this.batchList.filter(m=>{
        return m.batchId == e;
      })[0];
    },
    // 选中场站
    pitchPark(e){
      this.chukuForm.stationName = this.parkList.filter(m=>{
        return m.id == e;
      })[0].stationName;
    },
    // 新增退回确定
    tuihuiConfirm(n){
      if(n==1){
        this.$refs['tuihuiForm'].validate((valid) => {
          if (valid) {
            this.tuihuiDialogT = true;
          }
        })
      }else if(n==2){
        this.$axios({
          method: "PUT",
          url: "/api/v1/materialBatchs/back",
          data: {
            materialTypeId: this.supplieseId,
            id: this.tuihuiForm.batch,
            count: this.tuihuiForm.count,
            totalMoney: this.tuihuiForm.totalMoney,
            remark: this.tuihuiForm.remark
          }
        }).then(res=>{
          this.getMaterialBatchList();
          this.$message.success("退回成功");
          this.tuihuiDialog = false;
          this.tuihuiDialogT = false;
        })
      }
    },
    // 删除批次
    delBatch(scope){
      this.$confirm('删除后无法恢复，确认要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: "DELETE",
          url: "/api/v1/materialBatchs/" + scope.row.id
        }).then(res=>{
          this.getMaterialBatchList()
          this.$message.success("删除成功");
        })
      }).catch(()=>{})
    },
    // 对指定批次进行出库
    chukuOne(scope){
      this.openChuku(()=>{
        this.chukuForm.batch = scope.row.id;
        this.batchInfo = this.batchList.filter(m=>{
          return m.batchId == scope.row.id;
        })[0];
      })
    },
    // 新增出库确定
    chukuConfirm(n){
      if(n==1){
        this.$refs['chukuForm'].validate((valid) => {
          if (valid) {
            this.chukuDialogT = true;
          }
        })
      }else if(n==2){
        this.$axios({
          method: "PUT",
          url: "/api/v1/materialBatchs/out",
          data: {
            materialTypeId: this.supplieseId,
            id: this.chukuForm.batch,
            engineeringId: this.chukuForm.engineeringId,
            count: this.chukuForm.count,
            totalMoney: this.chukuForm.totalMoney * 100,
            receiver: this.chukuForm.receiver,
            useDetail: this.chukuForm.useDetail,
            remark: this.chukuForm.remark
          }
        }).then(res=>{
          this.getMaterialBatchList();
          this.$message.success("出库成功");
          this.chukuDialog = false;
          this.chukuDialogT = false;
        })
      }
    },
    // 新增入库确定
    rukuConfirm(n){
      if(n==1){
        this.$refs['rukuForm'].validate((valid) => {
          if (valid) {
            this.rukuDialogT = true;
          }
        })
      }else if(n==2){
        this.$axios({
          method: "POST",
          url: "/api/v1/materialBatchs",
          data: {
            materialTypeId: this.supplieseId,
            no: this.batchNo,
            count: this.rukuForm.count,
            totalMoney: this.rukuForm.totalMoney * 100,
            price: (this.rukuForm.totalMoney / this.rukuForm.count) * 100,
            startNo: 1,
            endNo: this.rukuForm.count,
            invoiceNo: this.rukuForm.invoiceNo,
            invoiceSignTime: toolkit.transitionDate(this.rukuForm.invoiceSignTime,"YYYY-MM-DD HH:MM:SS"),
            storageLocation: this.rukuForm.storageLocation,
            remark: this.rukuForm.remark
          }
        }).then(res=>{
          this.getMaterialBatchList();
          this.$message.success("入库成功");
          this.rukuDialog = false;
          this.rukuDialogT = false;
        })
      }
    },
    // 获取批次下拉列表
    getBatchList(type){
      return new Promise(resolve => {
        this.$axios({
          method: "GET",
          url: "/api/v1/materialBatchs/simpleBatchList",
          params: {
            materialTypeId: this.supplieseId,
            schType: type
          }
        }).then(res=>{
          resolve(res.data)
        })
      })
    },
    // 获取场站下拉列表
    getParkList(){
      return new Promise(resolve => {
        this.$axios({
          method: "GET",
          url: "/api/v1/engineerings/simpleList"
        }).then(res=>{
          resolve(res.data)
        })
      })
    },
    // 打开入库dialog
    openRuku(){
      this.rukuDialog = true;
      this.$nextTick(()=>{
        this.$refs['rukuForm'].resetFields();
      })
    },
    // 打开退回dialog
    async openTuihui(){
      this.batchList = await this.getBatchList(2);
      this.tuihuiDialog = true;
      this.$nextTick(()=>{
        this.$refs['tuihuiForm'].resetFields();
      })
    },
    // 打开出库dialog
    async openChuku(cb){
      this.batchList = await this.getBatchList(1);
      this.parkList = await this.getParkList();
      this.chukuDialog = true;
      this.$nextTick(()=>{
        this.$refs['chukuForm'].resetFields();
        cb&&cb()
      })
    },
    // 保存修改物资基础信息
    saveDetail(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "PUT",
            url: "/api/v1/materialTypes",
            data: this.ruleForm
          }).then(res=>{
            this.$message.success("修改成功");
            this.$router.push("/supplieses/list");
          })
        }
      })
    },
    // 获取出入库明细列表
    getOperateRecordList(){
      this.$axios({
        method: "GET",
        url: "/api/v1/materialBatchOperateRecords",
        params: {
          typeName: this.typeName,
          types: this.types,
          pageNum: this.engPageConfig.pageNum,
          pageSize: this.engPageConfig.pageSize
        }
      }).then(res=>{
        this.engTable = res.data.list;
        this.engPageConfig.total = res.data.total;
      })
    },
    // 获取物资批次列表
    getMaterialBatchList(){
      this.$axios({
        method: "GET",
        url: "/api/v1/materialBatchs",
        params: {
          no: this.no,
          materialTypeId: this.supplieseId,
          pageNum: this.batchPage.pageNum,
          pageSize: this.batchPage.pageSize
        }
      }).then(res=>{
        this.batchTable = res.data.list;
        this.batchPage.total = res.data.total;
      })
    },
    // 获取物资基础信息
    getSupplieseDetail(){
      this.$axios({
        method: "GET",
        url: "/api/v1/materialTypes/" + this.supplieseId
      }).then(res=>{
        this.ruleForm = res.data;
      })
    },
    // 获取物资类别的批次号
    getNewBatchNo(){
      this.$axios({
        method: "GET",
        url: "/api/v1/materialBatchs/getNewBatchNo/" + this.supplieseId
      }).then(res=>{
        this.batchNo = res.data;
      })
    },
    // 切换tag项
    cutTag(){
      switch(this.activeIndex){
        case "1":
          this.getSupplieseDetail()
          break;
        case "2":
          this.getMaterialBatchList()
          break;
        case "3":
          this.getOperateRecordList()
          break;
      }
    },
    // 切换页码
    cutPage(e, val, fn){
      this[val].pageNum = e;
      this[fn]();
    },
    // 返回列表
    toBack(){
      this.$router.push("/supplieses/list");
    }
  }
}
</script>

<style scoped>
.detail_container{
  background: #ffffff;
}
.form_box{
  padding: 20px 20px 0 20px;
}
.table_box{
  padding: 10px 20px 20px 20px;
}
</style>
