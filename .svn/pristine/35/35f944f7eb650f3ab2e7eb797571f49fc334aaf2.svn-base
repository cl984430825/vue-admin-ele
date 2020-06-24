<template>
  <div id="page">
    <div class="page_container">
      <el-pagination
        background
        :current-page="pageConfig.pageNum"
        :total="pageConfig.total"
        :page-size="pageConfig.pageSize"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "page",
  props: ["pageConfig"]
}
</script>

<style scoped>
.page_container{
  padding-top: 20px;
  text-align: right;
}
</style>
