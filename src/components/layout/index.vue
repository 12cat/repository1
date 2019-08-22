<template>
  <div class="layout" v-loading="$store.state.common.loading">
    <div class="top">
      <div class="left">
        <span class="logo"></span>
        <span class="title">知识管理系统</span>
      </div>
      <div class="right">
        <el-row>
          <el-input placeholder="请输入关键字" v-model="content" class="input-with-select w420">
            <el-select class="w110" v-model="category" slot="prepend" placeholder="请选择">
              <el-option label="ALL" value=""></el-option>
              <el-option v-for="(item, i) in categoryList" :key="i" :label="item.name" :value="item.id">{{ item.name }}</el-option>
            </el-select>
            <el-button slot="append" class="right-btn bbn" @click="seach">搜索</el-button>
          </el-input>
          <div id="upl" class="upl">
            <el-button class="bbn" type="primary" @click="toUpload">上传文档</el-button>
          </div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <span class="user">
                <span class="img"></span>
                <span class="text">{{ userName }}</span>
              </span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="b">我的主页</el-dropdown-item>
              <el-dropdown-item command="c">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </div>
    </div>
    <div class="menu">
      <div class="count">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1" @click="toHome">首页</el-menu-item>
          <el-submenu v-for="item in categoryMenu" :key="item.id" :index="item.id + ''">
            <template slot="title">{{ item.name }}</template>
            <el-menu-item v-for="e in item.childs" :key="e.id" :index="e.id + ''" @click="toClasspage(e.id, e.name)">{{ e.name }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="content">
      <div class="cont-view">
        <router-view/>
      </div>
    </div>
    <div class="bottom">
      <p>
        <ul>
          <li><span class="title">文件总数</span><span class="value">{{ statistics.document }}</span></li>
          <li><span class="title">累计下载数</span><span class="value">{{ statistics.download }}</span></li>
          <li><span class="title">在线用户数</span><span class="value">{{ statistics.online }}</span></li>
          <li><span class="title">日登录数</span><span class="value">{{ statistics.dailyLogin }}</span></li>
          <li><span class="title">日浏览数</span><span class="value">{{ statistics.dailyVisit }}</span></li>
        </ul>
      </p>
      <p><span class="title">长城华冠©2015|法律信息|京ICP备14032945号-3</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
      userName: '',
      loginParam: { // 登录参数
        account: '',
        password: ''
      },
      statistics: {}, // 统计信息
      categoryList: [], // 搜索部分下拉类目列表
      categoryMenu: [], // 首页导航
      content: '',
      category: '',
      activeIndex: '1',
      info: {
        name: '',
        password: ''
      },
      menu: []
    }
  },
  mounted () {
    this.myBrowser()
    this.getCategoryMenu()
    this.getCategoryList()
    this.getStatistics()
    this.userName = this.$cookies.get('userName')
  },
  methods: {
    myBrowser () {
      let userAgent = navigator.userAgent
      let tag = false
      userAgent.indexOf('Opera') > -1 && (tag = true)
      userAgent.indexOf('Firefox') > -1 && (tag = true)
      userAgent.indexOf('Chrome') > -1 && (tag = true)
      if (!tag) {
        document.getElementById('upl').style.bottom = '38px'
      }
    },
    logout () {
      this.$service.user.logout().then(res => {
        this.$cookies.remove('userName')
        this.userName = ''
        this.$router.push(`/login`)
      }).catch(_ => {})
    },
    handleCommand (str) {
      if (str === 'b') this.toUser()
      if (str === 'c') this.logout()
    },
    // 获取搜索下拉条件类目
    getCategoryList () {
      this.$service.category.getCategoryList({
        category: 0,
        level: 1
      }).then(res => {
        if (res) {
          this.categoryList = res || []
        }
      }).catch(_ => {})
    },
    // 搜索
    seach () {
      this.$service.document.searchDocument({
        content: this.content,
        category: this.category ? [this.category] : [],
        pageIndex: 1,
        pageSize: 50
      }).then(res => {
        if (res) {
          this.$store.commit('setCategorys', res.categorys || [])
          this.$store.commit('setSearchpage', {
            content: this.content,
            category: this.category,
            dataList: res.page.data,
            pageIndex: 1,
            total: res.page.total
          })
          this.$router.push(`/search`)
        }
      }).catch(_ => {})
    },

    // 统计信息
    getStatistics () {
      this.$service.other.getStatistics().then(res => {
        if (res) {
          this.statistics = res || []
        }
      }).catch(_ => {})
    },
    // 首页导航换取类目
    getCategoryMenu () {
      this.$service.category.getCategoryPage({
        type: 0
      }).then(res => {
        if (res) {
          this.categoryMenu = res || []
        }
      }).catch(_ => {})
    },
    toHome () {
      this.$router.push('/')
    },
    toMap () {
      this.$router.push('/map')
    },
    toSearch () {
      this.$router.push('/search')
    },
    toClasspage (id, name) {
      this.$store.commit('setCategoryName', name)
      this.$router.push(`/classpage/${id}`)
    },
    toUpload () {
      this.$router.push('/upload')
    },
    toUser () {
      this.$router.push('/user')
    }
  }
}
</script>

<style scoped>
  .layout {
    height: 100%;
  }

  /* top */
  .layout .top {
    position: relative;
    width: 100%;
    height: 98px;
  }
  .layout .top .left .logo {
    position: absolute;
    top: 22px;
    left: 22px;
    width: 181px;
    height: 45px;
    background: url('../../assets/image/logo.png') no-repeat 0 0;
    background-size: 100% 100%;
  }
  .layout .top .left .title {
    position: absolute;
    top: 22px;
    left: 230px;
    font-size: 28px;
    line-height: 54px;
  }
  .layout .top .right {
    position: relative;
    margin-top: 31px;
    margin-right: 160px;
  }
  .layout .el-dropdown {
    position: absolute;
    height: 60px;
    width: 40px;
    right: -135px;
    bottom: 0;
  }
  .upl {
    position: absolute;
    height: 0;
    width: 0;
    right: -5px;
    bottom: 35px;
  }
  .upl .bbn {
    height: 35px;
    border: 1px solid #DCDFE6;
    border-radius: 3px !important;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    border-color: #DCDFE6 !important;
  }
  .layout .top .right .user {
    position: absolute;
    height: 60px;
    width: 40px;
    right: -10px;
    bottom: -20px;
    text-align: center;
    color: #777;
    cursor: pointer;
  }
  .layout .top .user .img {
    display: block;
    width: 40px;
    height: 40px;
    background: url('../../assets/image/user.jpeg') no-repeat 0 0;
    background-size: 100% 100%;
  }

  /* content */
  .layout .content {
    width: 100%;
    min-height: 1200px;
    padding: 20px 0;
    text-align: center;
  }
  .layout .content .cont-view {
    display: inline-block;
    width: 1200px;
    text-align: left;
  }

  /* bottom */
  .layout .bottom {
    width: 100%;
    height: 150px;
    padding-top: 40px;
    background-color: #000;
  }
  .layout .bottom p {
    text-align: center;
    line-height: 25px;
    color: #fff;
  }
   .layout .bottom p li {
     display: inline-block;
     margin-left: 50px;
   }
  .layout .bottom p .title {
    margin-right: 5px;
    font-weight: bolder;
  }

  .login-title {
    margin-bottom: 30px;
    text-align: center;
    font-size: 20px;
    line-height: 20px;
  }
  .bbn {
    height: 33px;
    border-radius: 0 3px 3px 0 !important;
  }
</style>
