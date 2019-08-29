<template>
  <div>
    <div class="cont-top">
      <div class="cont-top-left card">
        <div class="top">
          <span class="title">知识分类</span>
        </div>
        <div class="cont" v-for="(item, index) in zsflList" :key="index">
          <div class="title">{{ item.name }}</div>
          <div class="list">
            <span class="pointer" v-for="(e, i) in item.childs" :key="i" @click="toClasspage(e.id, e.name)">{{ e.name }}</span>
          </div>
        </div>
      </div>
      <div class="cont-top-right card">
        <div class="top">
          <span class="title">通知公告</span>
          <span class="rl" @click="toClasspage(tzgg.id, tzgg.name)">更多>></span>
        </div>
        <div class="li" v-for="item in tzggList" :key="item.id" @click="toDetails(item.id)">{{ item.title }}</div>
      </div>

      <!-- 幻灯片 -->
      <div class="cont-top-img">
        <el-carousel>
          <el-carousel-item v-for="item in slideList" :key="item.id">
            <a :href="item.url" target="_blank"><img :src="item.src"></a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="cont-top-bottom">
        <div @click="toOthersearch">
          <span class="icon"></span>
          <span class="text">高级搜索</span>
        </div>
        <div @click="toExamine">
          <span class="icon"></span>
          <span class="text">部门知识</span>
        </div>
        <!-- <div @click="toMap"> -->
        <div>
          <span class="icon"></span>
          <span class="text">图文审签</span>
        </div>
        <!-- <div @click="toOthersearch"> -->
        <div>
          <span class="icon"></span>
          <span class="text">RMS</span>
        </div>
      </div>
    </div>

    <!-- 华冠体系 模块 -->
    <div class="mar-t20 h375">
      <div class="w590 h375 left card">
        <div class="top">
          <ul class="tab">
            <li v-for="item in left2Data" :key="item.id" :class="{active: left2index === item.id}" @click="getLeft2List(item.id)">{{ item.name }}</li>
          </ul>
          <span class="rl" @click="toMorepage2(left2index)">更多>></span>
        </div>
        <ul class="list-info">
          <li class="pointer" v-for="item in left2List" :key="item.id" @click="toDetails(item.id)">
            <span class="list">{{ item.title }}</span>
            <span class="info">
              {{ item.categoryName | cut2str(4) }}
              <span class="right">{{ item.createTime | ymd }}</span>
            </span>
          </li>
        </ul>
      </div>
      <div class="w590 h375 right card">
        <div class="top">
          <ul class="tab">
            <li v-for="item in left3Data" :key="item.id" :class="{active: left3index === item.id}" @click="getLeft3List(item.id)">{{ item.name }}</li>
          </ul>
          <span class="rl" @click="toMorepage3(left3index)">更多>></span>
        </div>
        <ul class="list-info">
          <li class="pointer" v-for="item in left3List" :key="item.id" @click="toDetails(item.id)">
            <span class="list">{{ item.title }}</span>
            <span class="info">
              {{ item.categoryName | cut2str(4) }}
              <span class="right">{{ item.createTime | ymd }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 知识推荐 模块 -->
    <div class="mar-t20 h375">
      <div class="w590 h375 left card">
        <div class="top">
          <ul class="tab">
            <li @click="getLeft1Data(4)" :class="{active: left1Index === 4}">知识推荐</li>
            <li @click="getLeft1Data(1)" :class="{active: left1Index === 1}">查看排行</li>
            <li @click="getLeft1Data(3)" :class="{active: left1Index === 3}">收藏排行</li>
            <li @click="getLeft1Data(2)" :class="{active: left1Index === 2}">下载排行</li>
          </ul>
          <span class="rl" @click="toMorepageInfo1(left1Index)">更多>></span>
        </div>
        <ul class="list-info">
          <li class="pointer" v-for="item in left1List" :key="item.id" @click="toDetails(item.id)">
            <span class="list">{{ item.title }}</span>
            <span class="info">
              {{ item.categoryName | cut2str(4) }}
              <span class="right">{{ item.createTime | ymd }}</span>
            </span>
          </li>
        </ul>
      </div>
      <div class="w590 h375 right card">
        <div class="top">
          <span class="title">{{ urlList[0].title }}</span>
          <a :href="urlList[0].url" target="_blank" class="rl">更多>></a>
        </div>
        <div class="w560 h310 other">
          <img :src="urlList[0].src" width="560" height="310" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      param: {
        userName: '',
        password: '',
        deviceId: '',
        rid: ''
      },
      pageIndex: '/#/review',

      zsflList: [], // 知识分类
      tzgg: {},
      tzggList: [], // 通知公告

      slideList: [], // 幻灯片列表

      left1Index: 4, // 左下1列表 index
      left1List: [], // 左下2列表数据
      left1Data: [], // 左下1列表内容

      left2index: 1, // 左下2列表 index
      left2List: [], // 左下2列表数据
      left2Data: [], // 左下2列表内容

      left3index: 1, // 左下3列表 index
      left3List: [], // 左下3列表数据
      left3Data: [], // 左下3列表内容

      urlList: [{}, {}], // 共献图谱

      other: false
    }
  },
  mounted () {
    this.getSlideList()
    this.getZSFL()
    this.getTZGG()
    this.getLeft1Data(4)
    this.getLeft2Data()
    this.getLeft3Data()
    this.getUrlList()
  },
  methods: {
    // 获取幻灯片列表
    getSlideList () {
      this.$service.other.getSlideList().then(res => {
        if (res) {
          this.slideList = res || []
        }
      }).catch(_ => {})
    },
    // 获取知识分类列表
    getZSFL () {
      this.$service.category.getCategoryPage({
        type: 1
      }).then(res => {
        if (res) {
          this.zsflList = res || []
        }
      }).catch(_ => {})
    },
    // 获取通知公告列表
    getTZGG () {
      this.$service.category.getCategoryPage({
        type: 3
      }).then(res => {
        if (res) {
          this.tzgg = res[0]
          if (res.length > 0) {
            this.getTZGGList(res[0].id)
          }
        }
      }).catch(_ => {})
    },
    getTZGGList (id) {
      this.$service.document.getDocumentListByCategory({
        category: id,
        pageIndex: 1,
        pageSize: 13
      }).then(res => {
        if (res) {
          this.tzggList = res.data
        }
      }).catch(_ => {})
    },

    // 知识推荐获取数据列表
    getLeft1Data (index) {
      this.left1Index = index
      this.$service.document.getDocumentListByType({
        type: index,
        pageIndex: 1,
        pageSize: 12
      }).then(res => {
        if (res) {
          this.left1List = res.data || []
        }
      }).catch(_ => {})
    },
    // 获取华冠体系tab数据
    getLeft2Data () {
      this.$service.category.getCategoryPage({
        type: 2
      }).then(res => {
        if (res) {
          this.left2Data = res
          if (res.length > 0) {
            this.getLeft2List(res[0].id)
          }
        }
      }).catch(_ => {})
    },
    // 获取华冠数据列表
    getLeft2List (id) {
      this.left2index = id
      this.$service.document.getDocumentListByCategory({
        category: id,
        pageIndex: 1,
        pageSize: 12
      }).then(res => {
        if (res) {
          this.left2List = res.data
        }
      }).catch(_ => {})
    },
    // 获取企业标准tab数据
    getLeft3Data () {
      this.$service.category.getCategoryPage({
        type: 7
      }).then(res => {
        if (res) {
          this.left3Data = res
          if (res.length > 0) {
            this.getLeft3List(res[0].id)
          }
        }
      }).catch(_ => {})
    },
    // 获取企业标准列表
    getLeft3List (id) {
      this.left3index = id
      this.$service.document.getDocumentListByCategory({
        category: id,
        pageIndex: 1,
        pageSize: 12
      }).then(res => {
        if (res) {
          this.left3List = res.data
        }
      }).catch(_ => {})
    },
    // 获取共献图谱
    getUrlList () {
      this.$service.other.getUrlList().then(res => {
        if (res) {
          this.urlList = res
        }
      }).catch(_ => {})
    },
    toClasspage (id, name) {
      this.$store.commit('setCategoryName', name)
      this.$router.push(`/classpage/${id}`)
    },
    toOthersearch () {
      this.$router.push('/othersearch')
    },
    toExamine () {
      this.$router.push('/examine')
    },
    toMorepage (id) {
      this.$router.push(`/morepage/${id}`)
    },
    toMorepage2 (id) {
      this.$router.push(`/morepage2/${id}`)
    },
    toMorepage3 (id) {
      this.$router.push(`/morepage3/${id}`)
    },
    toMorepageInfo1 (id) {
      this.$router.push(`/morepageInfo1/${id}`)
    },
    toMorepageInfo2 (id) {
      this.$router.push(`/morepageInfo1/${id}`)
    },
    toDetails (id) {
      this.$router.push(`/details/${id}`)
    },
    toMap () {
      this.$router.push(`/map`)
    }
  }
}
</script>

<style scoped>
.cont-top {
  position: relative;
}
.cont-top .cont-top-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 255px;
  height: 465px;
}
.cont-top .cont-top-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 285px;
  height: 465px;
}
.cont-top .cont-top-img {
  margin-left: 275px;
  padding: 0;
  width: 620px;
  height: 365px;
  overflow: hidden;
  border: 1px solid #DCDFE6;
  border-radius: 5px;
}
.cont-top .cont-top-img .el-carousel,
.cont-top .cont-top-img img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.cont-top .cont-top-bottom {
  padding: 19px 0;
  margin-top: 20px;
  margin-left: 275px;
  width: 620px;
  height: 80px;
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  cursor: pointer;
}
.cont-top .cont-top-bottom > div {
  position: relative;
  float: left;
  margin-left: 40px;
  height: 42px;
}
.cont-top .cont-top-bottom > div:first-child {
  margin-left: 30px;
}
.cont-top .cont-top-bottom > div .icon {
  position: absolute;
  width: 42px;
  height: 42px;
  top: 0;
}
.cont-top .cont-top-bottom > div:nth-child(1) .icon {
  background: url('../../assets/image/tu/tu1.png') no-repeat 0 0;
}
.cont-top .cont-top-bottom > div:nth-child(2) .icon {
  background: url('../../assets/image/tu/tu2.png') no-repeat 0 0;
}
.cont-top .cont-top-bottom > div:nth-child(3) .icon {
  background: url('../../assets/image/tu/tu3.png') no-repeat 0 0;
}
.cont-top .cont-top-bottom > div:nth-child(4) .icon {
  background: url('../../assets/image/tu/tu4.png') no-repeat 0 0;
}
.cont-top .cont-top-bottom > div .text {
  margin-left: 52px;
  font-size: 14px;
  line-height: 42px;
}
</style>
