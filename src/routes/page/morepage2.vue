<template>
  <div class="cont">
    <div class="cont-right">
      <div v-show="arr.length > 1" class="h375 card mar-b20">
        <div class="top">
          <span class="title">{{ data1.title }}</span>
          <span class="rl" @click="toMorepage(data1.type)">更多>></span>
        </div>
        <div class="li" v-for="item in data1.dataList" :key="item.id"
          @click="toDetails(item.id)">{{ item.title }}</div>
      </div>
      <div v-show="arr.length > 2" class="h375 card mar-b20">
        <div class="top">
          <span class="title">{{ data2.title }}</span>
          <span class="rl" @click="toMorepage(data2.type)">更多>></span>
        </div>
        <div class="li" v-for="item in data2.dataList" :key="item.id"
          @click="toDetails(item.id)">{{ item.title }}</div>
      </div>
      <div v-show="arr.length > 3" class="h375 card mar-b20">
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
      arr: [],
      data: {type: '', title: '', dataList: []},
      data1: {type: '', title: '', dataList: []},
      data2: {type: '', title: '', dataList: []},
      data3: {type: '', title: '', dataList: []}
    }
  },
  mounted () {
    this.getLeft2Data()
  },
  methods: {
    // 获取华冠体系tab数据
    getLeft2Data () {
      this.$service.category.getCategoryPage({
        type: 2
      }).then(res => {
        if (res) {
          this.arr = res
          this.init()
        }
      })
    },
    // 华冠体系
    init () {
      let _arr = []
      let idx = ~~this.$route.params.id
      for (let i = 0; i < this.arr.length; i++) {
        if (this.arr[i].id === idx) {
          this.data.type = idx
          this.data.title = this.arr[i].name
        } else {
          _arr.push(this.arr[i])
        }
      }
      this.getDataList(1)
      if (_arr[0]) {
        this.data1.type = _arr[0].id
        this.data1.title = _arr[0].name
        this.getDataList1()
      }
      if (_arr[1]) {
        this.data2.type = _arr[1].id
        this.data2.title = _arr[1].name
        this.getDataList2()
      }
      if (_arr[2]) {
        this.data3.type = _arr[2].id
        this.data3.title = _arr[2].name
        this.getDataList3()
      }
    },
    getDataList (index) {
      this.$service.document.getDocumentListByCategory({
        category: this.data.type,
        pageIndex: index || 1,
        pageSize: 50
      }).then(res => {
        this.data.dataList = res.data
        this.pageIndex = res.pageIndex
        this.total = res.total
      })
    },
    getDataList1 () {
      this.$service.document.getDocumentListByCategory({
        category: this.data1.type,
        pageIndex: 1,
        pageSize: 10
      }).then(res => {
        this.data1.dataList = res.data
      })
    },
    getDataList2 () {
      this.$service.document.getDocumentListByCategory({
        category: this.data2.type,
        pageIndex: 1,
        pageSize: 10
      }).then(res => {
        this.data2.dataList = res.data
      })
    },
    getDataList3 () {
      this.$service.document.getDocumentListByCategory({
        category: this.data3.type,
        pageIndex: 1,
        pageSize: 10
      }).then(res => {
        this.data3.dataList = res.data
      })
    },
    toMorepage (id) {
      this.$router.push(`/morepage2/${id}`)
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
