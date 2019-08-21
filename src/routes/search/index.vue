<template>
  <div class="cont">
    <div class="cont-left w815 card">
      <div class="top">
        <span class="title">搜索结果</span>
        <span class="rl">&nbsp;条数据</span>
        <span class="rl black">{{ $store.state.classpage.total }}</span>
        <span class="rl">” 共&nbsp;</span>
        <span class="rl red">{{ $store.state.classpage.content }}</span>
        <span class="rl">搜索 “</span>
      </div>
      <div class="cont-select">
        <ul>
          <li>
            <span class="title">知识目录:</span>
            <span v-for="item in category1list" :key="item.id" class="option"
              :class="{active: category1===item.id}" @click="_getData(1, item.id)">{{ item.name }}</span>
          </li>
          <li>
            <span class="title">使用范围:</span>
            <span v-for="item in category2list" :key="item.id" class="option"
              :class="{active: category2===item.id}" @click="_getData(2, item.id)">{{ item.name }}</span>
          </li>
          <li>
            <span class="title">知识类型:</span>
            <span v-for="item in typeList" :key="item.id" class="option"
              :class="{active: type===item.id}" @click="_getData(3, item.id)">{{ item.name }}</span>
          </li>
          <li>
            <span class="title">发布周期:</span>
            <span v-for="item in timeList" :key="item.id" class="option"
              :class="{active: time===item.id}" @click="_getData(4, item.id)">{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="table-top">
        <span>名称</span>
        <span>所属目录</span>
        <span>时间</span>
      </div>
      <div class="table">
        <ul>
          <li class="pointer" v-for="item in $store.state.classpage.dataList"
            :key="item.id"
            @click="toDetails(item.id)">
            <p>
              <span class="title hl" v-html="item.title"></span>
              <span class="sub">{{ item.categoryName | cut2str(6) }}</span>
              <span class="date">{{ item.createTime | ymd }}</span>
            </p>
            <span class="hl" v-html="item.content"></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="pager">
      <el-pagination
        @current-change="getData"
        :page-size="50"
        :current-page="$store.state.classpage.pageIndex"
        :total="$store.state.classpage.total"
        background
        layout="prev, pager, next">
      </el-pagination>
    </div>
    <div class="cont-right w365 card">
      <div class="top">
        <span class="title">相关知识推荐</span>
      </div>
      <div class="li" v-for="item in otherList" :key="item.id" @click="toDetails(item.id)">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      type: 0, // 知识类型 PPT
      time: 0, // 1234 周期
      typeList: [{id: 0, name: '全部'}, {id: 'PPT', name: 'PPT'}, {id: 'WORD', name: 'WORD'}, {id: 'EXCEL', name: 'EXCEL'}, {id: 'PDF', name: 'PDF'}, {id: 'MP3', name: 'MP3'}, {id: 'MP4', name: 'MP4'}, {id: 'DWG', name: 'DWG'}, {id: 'MPP', name: 'MPP'}, {id: 'TXT', name: 'TXT'}],
      timeList: [{id: 0, name: '全部'}, {id: 1, name: '一周内'}, {id: 2, name: '一月内'}, {id: 3, name: '三月内'}, {id: 4, name: '一年内'}],
      category1: 0,
      category2: 0,
      category1list: [],
      category2list: [],
      otherList: []
    }
  },
  mounted () {
    this.getCategory2()
    this.getOtherList()
  },
  methods: {
    _getData (t, v) {
      if (t === 1) this.category1 = v
      if (t === 2) this.category2 = v
      if (t === 3) this.type = v
      if (t === 4) this.time = v
      this.getData(1)
    },
    getData (index) {
      let arr = []
      if (this.category1 > 0) arr.push(this.category1)
      if (this.category2 > 0) arr.push(this.category2)
      this.$store.state.classpage.pageIndex = index
      this.$service.document.searchDocument({
        content: this.$store.state.classpage.content,
        category: this.$store.state.classpage.category,
        extCategory: arr,
        type: this.type || '',
        time: this.time || '',
        pageIndex: index || this.$store.state.classpage.pageIndex,
        pageSize: 50
      }).then(res => {
        if (res) {
          this.$store.commit('setSearchpage', {
            content: this.$store.state.classpage.content,
            category: this.$store.state.classpage.category,
            dataList: res.page.data,
            pageIndex: index || this.$store.state.classpage.pageIndex,
            total: res.page.total
          })
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 搜索俩个类目
    getCategory2 () {
      this.$service.category.getCategoryPage({type: 5}).then(res => {
        if (res) this.category1list = res || []
        this.category1list.splice(0, 0, {id: 0, name: '全部'})
      }).catch(err => {
        this.$message.error(err)
      })
      this.$service.category.getCategoryPage({type: 6}).then(res => {
        if (res) this.category2list = res || []
        this.category2list.splice(0, 0, {id: 0, name: '全部'})
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 相关知识推荐
    getOtherList () {
      this.$service.document.searchDocument({
        categorys: this.$store.state.classpage.categorys,
        pageIndex: 1,
        pageSize: 20
      }).then(res => {
        if (res) {
          this.otherList = res.page.data || []
        }
      }).catch(err => {
        this.$message.error(err)
      })
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
}
.cont-select {
  margin: 15px 0;
  padding: 15px;
  background-color: #fafafa;
}
.cont-select li {
  margin-bottom: 5px;
}
.cont-select .title {
  margin-right: 10px;
  font-weight: bolder;
}
.cont-select .option {
  display: inline-block;
  padding: 0 10px;
  line-height: 30px;
  border-radius: 5px;
  cursor: pointer;
}
.cont-select .option.active {
  background-color: #842726;
  color: white;
}
.table-top {
  font-weight: bolder;
  line-height: 35px;
  background-color: #fafafa;
  border-radius: 5px;
  height: 30px;
  margin-bottom: 25px;
}
.table-top span {
  font-size: 14px;
}
.table-top span:nth-child(1) {
  margin-left: 155px;
}
.table-top span:nth-child(2) {
  margin-left: 345px;
}
.table-top span:nth-child(3) {
  margin-left: 90px;
}
.table li {
  margin-top: 15px;
  height: 55px;
  border-bottom: 1px solid #ededed;
}
.table li .title {
  font-size: 14px;
  line-height: 15px;
  display: inline-block;
  width: 520px;
}
.table li .sub {
  line-height: 15px;
  color: #999;
  display: inline-block;
  width: 120px;
}
.table li .date {
  line-height: 15px;
  color: #999;
}
.table li > span {
  margin-top: 10px;
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.pager {
  margin: 25px 0;
  width: 815px;
  text-align: right;
}
.cont-right {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
