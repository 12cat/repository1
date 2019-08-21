<template>
  <div class="cont">
    <div class="cont-right">
      <div class="card mar-b20">
        <div class="top">
          <span class="title">文档历史版本</span>
        </div>
        <div class="li" v-for="item in list1" :key="item.id" @click="toDetail(item.id)">{{ item.createTime | ymd }} 版本</div>
      </div>
      <div class="card mar-b20">
        <div class="top">
          <span class="title">相关知识推荐</span>
        </div>
        <div class="li" v-for="item in list2" :key="item.id" @click="toDetail(item.id)">{{ item.title }}</div>
      </div>
    </div>
    <div class="cont-left card">
      <div class="top">
        <span class="title">{{ data.fileName }}</span>
        <span class="gray f-16">（{{ data.size | n2s }}）</span>
        <span class="btn" v-if="flag" @click="collection"><i :class="{'el-icon-star-on':data.collection, 'el-icon-star-off':!data.collection}"></i>收藏</span>
        <a class="btn" v-if="flag" :href="$store.state.common.apiPath + 'document/downloadDocument?id=' + data.id" target="_blank"><i class="el-icon-download"></i>下载</a>
      </div>
      <div class="view">
        <div class="view-box" v-if="!flag">
          <span class="sorry">抱歉，您没有查看此文档的权限！</span>
        </div>
        <div v-if="flag">
          <div class="view-box" v-if="['jpg', 'jpeg', 'png'].indexOf(data.type) >= 0">
            <img :src="data.path">
          </div>
          <div class="view-box" v-else-if="data.type === 'mp4'">
            <video type="video/mp4" :src="data.path"
              width="740" height="555" controls="controls">
              <h1><i class="el-icon-document"></i>{{ data.fileName }}.{{ data.type }}</h1>
            </video>
          </div>
          <div class="view-box" v-else-if="data.type === 'mp3'">
            <audio :src="data.path" width="740" controls="controls">
              <h1><i class="el-icon-document"></i>{{ data.fileName }}.{{ data.type }}</h1>
            </audio>
          </div>
          <div class="view-box" v-else-if="['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf'].indexOf(data.type) >= 0">
            <iframe :src="'/asset/pdfjs/web/viewer.html?file=/document/getPreDocument/' + data.id" frameborder="0"></iframe>
          </div>
          <div class="view-box" v-else-if="['html', 'htm', 'txt'].indexOf(data.type) >= 0">
            <iframe :src="data.path" frameborder="0"></iframe>
          </div>
          <div class="view-box" v-else>
            <div><h1><i class="el-icon-document"></i>{{ data.fileName }}.{{ data.type }}</h1></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      id: 0,
      flag: true,
      data: {
        fileName: ''
      },
      list1: [], // 文档历史版本
      list2: [] // 相关知识推荐
    }
  },
  mounted () {
    this.id = this.$route.params.id || 0
    this.getData()
    this.getList1()
  },
  methods: {
    getData () {
      this.$service.document.getDocumentById({
        id: this.id
      }).then(res => {
        if (res) {
          this.data = res
          if (this.data.fileName.length > 30) {
            this.data.fileName = this.data.fileName.substring(0, 30) + '...'
          }
          this.getList2()
          this.flag = true
        } else {
          this.flag = false
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 历史版本
    getList1 () {
      this.$service.document.getHistoryDocument({
        id: this.id
      }).then(res => {
        if (res) {
          this.list1 = res || []
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 相关知识推荐
    getList2 () {
      this.$service.document.getDocumentListByCategory({
        category: this.data.category,
        pageIndex: 1,
        pageSize: 10
      }).then(res => {
        if (res) {
          this.list2 = res.data
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 收藏
    collection () {
      this.$service.document.modifyDocument({
        id: this.id,
        type: 3
      }).then(res => {
        if (res) {
          this.data.collection = res || []
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 收藏
    download () {
      this.$service.document.downloadDocument({
        id: this.id
      }).then(res => {
        if (res) {
          this.$message.success('开始下载！')
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 点击内容跳转到详情页
    toDetail (id) {
      this.$router.push(`/details/${id}`)
      this.id = this.$route.params.id || 0
      this.getData()
      this.getList1()
    }
  }
}
</script>

<style scoped>
.cont {
  position: relative;
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
.cont-left .view {
  height: 1200px;
  padding: 20px;
}
.cont-left .view img {
  width: 740px;
}
.cont-left .view iframe {
  width: 740px;
  height: 1200px;
}
.cont-left .btn {
  position: relative;
  margin-left: 50px;
  font-size: 16px;
  line-height: 25px;
  color: #842726;
  float: right;
  cursor: pointer;
}
.cont-left .btn i {
  position: absolute;
  top: -2px; left: -25px;
  font-size: 22px;
  line-height: 25px;
}
.view-box h1 {
  font-size: 24px;
}
.view-box h1 i {
  margin-right: 5px;
  font-size: 24px;
}
.sorry {
  display: block;
  margin-top: 50px;
  padding: 50px;
  font-size: 25px;
  border: 2px solid #aaa;
  text-align: center;
  color: #aaa;
}
</style>
