<template>
  <div id="page">
    <div class="page_container">
      <el-pagination
        background
        @current-change="cutPage"
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
  props: ["pageConfig"],
  methods: {
    cutPage(e){
      this.$emit("cutPage", e);
    },
  }
}
</script>

<style scoped>
.page_container{
  padding-top: 20px;
  text-align: right;
}
</style>
