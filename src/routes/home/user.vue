<template>
  <div class="cont">
    <div class="cont-left">
      <div class="card mar-b20 b-gray">
        <div class="top">
          <span class="title">我的主页</span>
        </div>
        <div class="info">
            <img src="../../assets/image/user.jpeg" alt="">
            <div class="username">{{ user.name }}</div>
            <div class="classname">{{ user.departmentName }}</div>
            <el-button type="primary" class="w175" @click="toUpload">上传文档</el-button>
        </div>
        <ul>
            <li :class="{active: type===5}" @click="getDataList(1, 5)">
                <span><i></i>我的文档</span>
            </li>
            <li :class="{active: type===4}" @click="getDataList2(1)">
                <span><i></i>部门文档</span>
            </li>
            <li :class="{active: type===3}" @click="getDataList(1, 3)">
                <span><i></i>我的收藏</span>
            </li>
            <li :class="{active: type===2}" @click="getDataList(1, 2)">
                <span><i></i>我的下载</span>
            </li>
            <li :class="{active: type===1}" @click="getDataList(1, 1)">
                <span><i></i>我的浏览</span>
            </li>
        </ul>
      </div>
      <div class="card mar-b20">
        <div class="top">
          <span class="title">我的文档</span>
        </div>
        <el-tree
          node-key="id"
          :data="categoryData"
          :props="defaultProps">
        </el-tree>
      </div>
    </div>
    <div class="cont-right card">
      <div class="top">
        <span class="title">{{ title }}</span>
      </div>
      <ul class="list-info">
        <li v-for="item in dataList" :key="item.id">
          <span class="list" @click="toDetails(item.id)">{{ item.title }}</span>
          <span class="info">
            {{ item.categoryName | cut2str(4) }}
            <span>{{ item.createTime | ymd }}</span>
          </span>
          <span class="edit" v-show="type === 5" @click="toEdit(item.id)">编辑</span>
        </li>
      </ul>
    </div>
    <div class="pager">
      <el-pagination
        @current-change="getDataList3"
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
  name: 'user',
  data () {
    return {
      flag: 0,
      title: '我的文档',
      user: {},
      categoryData: [],
      type: 5,
      dataList: [],
      pageIndex: 1,
      total: 0,
      defaultProps: {
        children: 'childs',
        label: 'name'
      }
    }
  },
  mounted () {
    this.flag = this.$route.params.type || 0
    if (this.flag === '1') {
      this.getDataList2(1)
    } else {
      this.getDataList(1, 5)
    }
    this.getUserData()
    this.getMyPageCategory()
  },
  methods: {
    getMyPageCategory () {
      this.$service.category.getMyPageCategory().then(res => {
        if (res) {
          this.categoryData = res
        }
      }).catch(_ => {})
    },
    getUserData () {
      this.$service.user.getUserInfo().then(res => {
        if (res) {
          this.user = res
        }
      }).catch(_ => {})
    },
    getDataList (index, type) {
      this.pageIndex = index || 1
      this.type = type
      if (type === 5) this.title = '我的文档'
      if (type === 3) this.title = '我的收藏'
      if (type === 2) this.title = '我的下载'
      if (type === 1) this.title = '我的浏览'
      this.$service.document.getUserDocumentListByType({
        type: type,
        pageIndex: index,
        pageSize: 50
      }).then(res => {
        if (res) {
          this.dataList = res.data || []
          this.total = res.total
        }
      }).catch(_ => {})
    },
    getDataList2 (index) {
      this.pageIndex = index || 1
      this.type = 4
      this.title = '部门文档'
      this.$service.document.getDocumentListByDepartment({
        pageIndex: index,
        pageSize: 50
      }).then(res => {
        if (res) {
          this.dataList = res.data || []
          this.total = res.total
        }
      }).catch(_ => {})
    },
    getDataList3 (index) {
      if (this.type === 4) {
        this.getDataList2(1)
      } else {
        this.getDataList(index, this.type)
      }
    },
    toDetails (id) {
      this.$router.push(`/details/${id}`)
    },
    toUpload () {
      this.$router.push(`/upload`)
    },
    toEdit (id) {
      this.$router.push(`/edit/${id}`)
    }
  }
}
</script>

<style scoped>
.cont {
  position: relative;
  min-height: 1500px;
}
.cont .card .li {
  width: 300px;
}
.cont-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
}
.cont-left .info {
  height: 290px;
  text-align: center;
  border-bottom: 2px solid #dbdbdb;
}
.cont-left .info img {
  margin: 30px 0 10px;
  height: 120px;
  width: 120px;
}
.cont-left .info .username {
  font-size: 18px;
  font-weight: bolder;
}
.cont-left .info .classname {
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
}
.cont-left ul {
  margin-left: -15px;
}
.cont-left ul li {
  display: block;
  padding-left: 70px;
  margin-top: 10px;
  height: 40px;
  width: 250px;
}
.cont-left ul li.active {
  background-color: #e7e7e7;
}
.cont-left ul li span {
  position: relative;
  font-size: 16px;
  line-height: 40px;
  color: #666;
}
.cont-left ul li {
  display: block;
  cursor: pointer;
}
.cont-left ul li i {
  position: absolute;
  width: 26px; height: 26px;
  top: -5px; left: -36px;
}
.cont-left ul li:nth-child(1) i {
  background: url('../../assets/image/user/text.png') no-repeat 0 0;
}
.cont-left ul li:nth-child(2) i {
  background: url('../../assets/image/user/files.png') no-repeat 0 0;
}
.cont-left ul li:nth-child(3) i {
  background: url('../../assets/image/user/star.png') no-repeat 0 0;
}
.cont-left ul li:nth-child(4) i {
  background: url('../../assets/image/user/download.png') no-repeat 0 0;
}
.cont-left ul li:nth-child(5) i {
  background: url('../../assets/image/user/file.png') no-repeat 0 0;
}
.cont-right {
  margin-left: 270px;
}
.list-info li {
  cursor: pointer;
}
.list-info li .list {
  width: 650px;
}
.pager {
  margin: 25px 0;
  margin-left: 270px;
  text-align: right;
}
.card .list-info li .info {
  margin-left: 0;
}
.card .list-info li .edit {
  position: absolute;
  margin-left: 220px;
  width: 200px;
  color: #999;
}
</style>
