<template>
  <div>
    <div class="top">
      <span class="title">创建知识</span>
    </div>
    <ul class="form">
      <li class="mar-t20" v-for="(item, i) in param" :key="i">
        <div class="upload">
          <el-upload class="upload-demo w560" :ref="'upload' + i"
            :num="i"
            :action="$store.state.common.uploadPath"
            :file-list="item.fileList"
            :on-success="uploadFile">
            <el-button class="w260" type="primary" @click="num = i">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">支持格式：PPT，WORD，EXCEL，PDF，MP3，MP4，DWG，MPP，TXT</div>
          </el-upload>
        </div>
        <el-form :inline="true" label-width="100px" class="demo-form-inline">
          <el-form-item class="is-must" label="标题">
            <el-input class="w1000" v-model="item.title" placeholder=""></el-input>
          </el-form-item>
          <el-form-item class="is-must" label="密级">
            <el-select class="w1000" v-model="item.secrecy" placeholder="请选择">
              <el-option v-for="item in secrecyList" :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="is-must" label="类目">
            <el-cascader class="w1000" :options="getCategoryData"
              v-model="item.category2"
              change-on-select
              :props="propsList">
            </el-cascader>
          </el-form-item>
          <el-form-item class="is-must" label="标签">
            <el-input class="w1000" v-model="item.tags" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input class="w1000" type="textarea" v-model="item.introduction"></el-input>
          </el-form-item>
        </el-form>
      </li>
    </ul>
    <div class="add mar-t20">
      <el-button type="primary" @click="addModel">继续添加</el-button>
    </div>
    <div class="mar-t20 text-right mar-r100">
      <el-button @click="uplodaDocument(1)">保存草稿</el-button>
      <el-button type="primary" @click="uplodaDocument(0)">确认提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      num: 0,
      id: '',
      getCategoryData: [], // 类目备选列表
      propsList: { // 空间设定参数
        value: 'id',
        label: 'name',
        children: 'childs'
      },
      secrecyList: [], // 保密等级
      public: 1, // 1公共文档，0部门文档
      param: [
        {
          id: null,
          name: '',
          path: '',
          size: '',
          type: '',
          public: 1, // 1公共文档，0部门文档
          title: '', // 标题
          tags: '', // 逗号分隔
          category: [], // 类目
          category2: [], // 类目
          secrecy: '', // 保密等级
          saveDraft: 0, // 是否草稿
          fileList: []
        }
      ],
      arr: [],
      flag: true
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.getgetCategoryData()
    this.getSecrecyList()
  },
  methods: {
    editDocument () {
      this.$service.document.getDocumentById({
        id: this.id
      }).then(res => {
        this.param[0].id = res.id
        this.param[0].title = res.title
        this.param[0].secrecy = res.secrecy
        this.param[0].category = res.category
        this.param[0].tags = res.tags
        this.param[0].introduction = res.introduction
        this.param[0].name = res.fileName
        this.param[0].path = res.path
        this.param[0].size = res.size
        this.param[0].type = res.type
        this.arr = []
        this.flag = true
        this.dist(this.param[0].category, this.getCategoryData)
        this.param[0].category2 = this.arr
        this.dialog = true
      })
    },
    dist (id, list) {
      if (!list) return
      for (let i = 0; i < list.length; i++) {
        this.flag && this.arr.push(list[i].id)
        if (list[i].id === id) this.flag = false
        else this.flag && this.dist(id, list[i].childs)
      }
      this.flag && this.arr.splice(-1, 1)
    },
    // 获取保密等级
    getSecrecyList () {
      this.$service.user.getSecrecyList().then(res => {
        this.secrecyList = res || []
      })
    },
    getgetCategoryData () {
      this.$service.category.getUploadCategoryList({
        category: 0,
        level: 100
      }).then(res => {
        this.getCategoryData = res || []
        if (this.id) this.editDocument()
      })
    },
    uploadFile (res, file) {
      if (res.data) {
        this.$refs['upload' + this.num].clearFiles()
        setTimeout(() => {
          this.param[this.num].name = res.data.name
          this.param[this.num].path = res.data.path
          this.param[this.num].size = res.data.size
          this.param[this.num].type = res.data.type
        }, 5)
      }
    },
    uplodaDocument (saveDraft) {
      let n, i
      for (i = 0; i < this.param.length; i++) {
        if (this.param[i].category2) {
          n = this.param[i].category2.length
          this.param[i].category = this.param[i].category2[n - 1]
          this.param[i].saveDraft = saveDraft
        }
        if (!this.param[i].title) {
          this.$message.warning('请填写标题！')
          return
        }
        if (!this.param[i].secrecy) {
          this.$message.warning('清选择密级！')
          return
        }
        if (!this.param[i].category) {
          this.$message.warning('清选择类目！')
          return
        }
        if (!this.param[i].tags) {
          this.$message.warning('请填写标签！')
          return
        }
      }
      this.$service.document.uploadDocument(
        this.param
      ).then(res => {
        if (res) {
          this.$message.success('文档上传成功！')
          this.param = [
            {
              id: null,
              name: '',
              path: '',
              size: '',
              type: '',
              public: 1, // 1公共文档，0部门文档
              title: '', // 标题
              tags: '', // 逗号分隔
              category: '', // 类目
              secrecy: '', // 保密等级
              saveDraft: 0, // 是否草稿
              fileList: []
            }
          ]
        }
      })
    },
    addModel () {
      this.param.push({
        id: null,
        name: '',
        path: '',
        size: '',
        type: '',
        public: 1, // 1公共文档，0部门文档
        title: '', // 标题
        tags: '', // 逗号分隔
        category: [], // 类目
        category2: [],
        secrecy: '', // 保密等级
        saveDraft: 0, // 是否草稿
        fileList: []
      })
    }
  }
}
</script>

<style scoped>
.top {
  height: 45px;
  padding-top: 15px;
  margin-bottom: 25px;
  border-bottom: 1px solid #842726;
}
.top .title {
  margin-left: 10px;
  padding-left: 10px;
  display: inline-block;
  height: 20px;
  font-size: 18px;
  line-height: 20px;
  font-weight: bolder;
  border-left: 4px solid #842726;
}
.form > li {
  border-bottom: 1px solid #ccc;
}
.upload {
  background-color: #fafafa;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}
.upload .list {
  position: relative;
}
.upload .title {
  font-size: 16px;
  color: #666;
}
.upload .info {
  color: #999;
}
.upload .btn {
  position: absolute;
  right: 25px;
  top: 15px;
  font-size: 14px;
  color: #842726;
  cursor: pointer;
}
.add {
  text-align: right;
  margin-right: 100px;
}
</style>
