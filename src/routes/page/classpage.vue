<template>
  <div class="cont classpage">
    <div class="cont-left card">
      <div class="top">
        <span class="title">{{ $store.state.classpage.categoryName }}</span>
      </div>
      <div class="cont">
        <el-tree
          :data="categoryData"
          node-key="id"
          :props="defaultProps"
          @node-click="categoryChange">
        </el-tree>
      </div>
    </div>
    <div class="cont-right card">
      <div class="top">
        <span class="title">{{ title || $store.state.classpage.categoryName }}</span>
        <span class="rl mar-t-8">
          <el-input placeholder="请输入关键字" v-model="content" class="input-with-select w245">
            <el-button slot="append" class="right-btn" @click="getDataList(1)">搜索</el-button>
          </el-input>
        </span>
      </div>
      <ul class="list-info">
        <li v-for="item in dataList" :key="item.id" @click="toDetails(item.id)">
          <span class="list">{{ item.title }}</span>
          <span class="info">{{ item.createTime | ymd }}</span>
        </li>
      </ul>
    </div>
    <div class="pager">
      <el-pagination
        @current-change="getDataList"
        :page-size="50"
        :current-page="pageIndex"
        :total="total"
        background
        layout="prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      title: '',
      content: '',
      category: '',
      categoryData: [],
      pageIndex: 1,
      total: 0,
      dataList: [],
      defaultProps: {
        children: 'childs',
        label: 'name'
      }
    }
  },
  mounted () {
    this.category = this.$route.params.id
    this.getCategoryData()
    this.getDataList(1)
  },
  methods: {
    getCategoryData () {
      this.$service.category.getCategoryList({
        category: this.category,
        level: 100
      }).then(res => {
        if (res) {
          this.categoryData = res || []
        }
      }).catch(_ => {})
    },
    getDataList (pageIndex) {
      this.pageIndex = pageIndex || 1
      this.$service.document.getDocumentListByCategory({
        highlight: 0, // 高亮
        content: this.content,
        category: this.category,
        pageIndex: this.pageIndex,
        pageSize: 50
      }).then(res => {
        if (res) {
          this.dataList = res.data
          this.total = res.total
        }
      }).catch(_ => {})
    },
    categoryChange (item) {
      this.pageIndex = 1
      this.category = item.id
      this.title = item.name
      this.$service.document.getDocumentListByCategory({
        content: '',
        category: this.category,
        pageIndex: this.pageIndex,
        pageSize: 50
      }).then(res => {
        if (res) {
          this.dataList = res.data
          this.total = res.total
        }
      }).catch(_ => {})
    },
    toDetails (id) {
      this.$router.push(`/details/${id}`)
    }
  },
  watch: {
    '$route.path': function (newVal, oldVal) {
      this.category = this.$route.params.id
      this.title = this.$store.state.classpage.categoryName
      this.getCategoryData()
      this.getDataList(1)
    }
  }
}
</script>

<style scoped>
.cont {
  position: relative;
}
.cont-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 370px;
}
.cont-left .cont {
  max-height: 1000px;
  overflow-y: auto;
}
.cont-right {
  margin-left: 390px;
}
.list-info li {
  cursor: pointer;
}
.list-info li .list {
  width: 650px;
}
.pager {
  margin: 25px 0;
  margin-left: 390px;
  text-align: right;
}

</style>
