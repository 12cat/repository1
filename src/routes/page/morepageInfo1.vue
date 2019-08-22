<template>
  <div class="cont">
    <div class="cont-right">
      <div class="h375 card mar-b20">
        <div class="top">
          <span class="title">{{ data1.title }}</span>
          <span class="rl" @click="toMorepage(data1.type)">更多>></span>
        </div>
        <div class="li" v-for="item in data1.dataList" :key="item.id"
          @click="toDetails(item.id)">{{ item.title }}</div>
      </div>
      <div class="h375 card mar-b20">
        <div class="top">
          <span class="title">{{ data2.title }}</span>
          <span class="rl" @click="toMorepage(data2.type)">更多>></span>
        </div>
        <div class="li" v-for="item in data2.dataList" :key="item.id"
          @click="toDetails(item.id)">{{ item.title }}</div>
      </div>
      <div class="h375 card mar-b20">
        <div class="top">
          <span class="title">{{ data3.title }}</span>
          <span class="rl" @click="toMorepage(data3.type)">更多>></span>
        </div>
        <div class="li" v-for="item in data3.dataList" :key="item.id"
          @click="toDetails(item.id)">{{ item.title }}</div>
      </div>
    </div>
    <div class="cont-left card">
      <div class="top">
        <span class="title">{{ data.title }}</span>
      </div>
      <ul class="list-info">
        <li class="pointer" v-for="item in data.dataList" :key="item.id" @click="toDetails(item.id)">
          <span class="list">{{ item.title }}</span>
          <span class="info">{{ item.time | ymd }}</span>
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
  name: 'morepage',
  data () {
    return {
      pageIndex: 1,
      total: 0,
      data: {type: '', title: '', dataList: []},
      data1: {type: '', title: '', dataList: []},
      data2: {type: '', title: '', dataList: []},
      data3: {type: '', title: '', dataList: []}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 知识推荐
    init () {
      let arr = [
        {type: 1, name: '查看排行'},
        {type: 2, name: '下载排行'},
        {type: 3, name: '收藏排行'},
        {type: 4, name: '知识推荐'}
      ]
      let i = this.$route.params.id
      this.data.type = i--
      this.data.title = arr[i].name
      arr.splice(i, 1)
      this.data1.type = arr[0].type
      this.data1.title = arr[0].name
      this.data2.type = arr[1].type
      this.data2.title = arr[1].name
      this.data3.type = arr[2].type
      this.data3.title = arr[2].name
      this.getDataList(1)
      this.getDataList1()
      this.getDataList2()
      this.getDataList3()
    },
    getDataList (index) {
      this.$service.document.getDocumentListByType({
        type: this.data.type,
        pageIndex: index || 1,
        pageSize: 50
      }).then(res => {
        this.data.dataList = res.data
        this.pageIndex = res.pageIndex
        this.total = res.total
      }).catch(_ => {})
    },
    getDataList1 () {
      this.$service.document.getDocumentListByType({
        type: this.data1.type,
        pageIndex: 1,
        pageSize: 10
      }).then(res => {
        this.data1.dataList = res.data
      }).catch(_ => {})
    },
    getDataList2 () {
      this.$service.document.getDocumentListByType({
        type: this.data2.type,
        pageIndex: 1,
        pageSize: 10
      }).then(res => {
        this.data2.dataList = res.data
      }).catch(_ => {})
    },
    getDataList3 () {
      this.$service.document.getDocumentListByType({
        type: this.data3.type,
        pageIndex: 1,
        pageSize: 10
      }).then(res => {
        this.data3.dataList = res.data
      }).catch(_ => {})
    },
    toMorepage (id) {
      this.$router.push(`/morepage/${id}`)
      this.init()
    },
    toDetails (id) {
      this.$router.push(`/details/${id}`)
    }
  }
}
</script>

<style scoped>
.cont {
  position: relative;
  min-height: 1200px;
}
.cont .card .li {
  width: 300px;
}
.cont-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 370px;
}
.cont-left {
  margin-right: 390px;
}
.list-info li .list {
  width: 650px;
}
.pager {
  margin: 25px 0;
  margin-right: 390px;
  text-align: right;
}

</style>
