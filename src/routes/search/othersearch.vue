<template>
  <div>
    <div class="top">
      <div class="title">知识搜索</div>
      <div>
        <el-input placeholder="请输入关键字" v-model="param.content" class="input-with-select w610">
          <el-button slot="append" class="right-btn" @click="seach">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="btm">
      <div class="title">高级搜索</div>
      <el-form label-width="100px" class="demo-form-inline">
        <el-form-item label="类目选择">
          <el-cascader class="w420"
            :options="categoryData"
            v-model="param.category"
            :props="propsList"
            change-on-select></el-cascader>
        </el-form-item>
        <el-form-item label="上传人">
          <el-input class="w420" v-model="param.operator" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker class="w420"
            v-model="param.startTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      categoryData: [],
      propsList: { // 空间设定参数
        value: 'id',
        label: 'name',
        children: 'childs'
      },
      param: {
        content: '',
        category: [],
        operator: '',
        startTime: ''
      }
    }
  },
  mounted () {
    this.getCategoryData()
  },
  methods: {
    getCategoryData () {
      this.$service.category.getCategoryList({
        category: 0,
        level: 100
      }).then(res => {
        this.categoryData = res || []
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 搜索
    seach () {
      let _category = ''
      let _n = this.param.category.length
      if (_n > 0) {
        _category = this.param.category[_n - 1]
      }
      this.$service.document.searchDocument({
        content: this.param.content,
        category: [_category],
        operator: this.param.operator,
        startTime: this.param.startTime,
        pageIndex: 1,
        pageSize: 50
      }).then(res => {
        if (res) {
          this.$store.commit('setCategorys', res.categorys || [])
          this.$store.commit('setSearchpage', {
            content: this.param.content,
            category: this.param.category,
            dataList: res.page.data,
            pageIndex: 1,
            total: res.page.total
          })
          this.$router.push(`/search`)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>
.top .title,
.btm .title {
  font-size: 16px;
  margin-bottom: 5px;
  margin-left: 285px;
  text-align: left;
  color: #666;
}
.top {
  text-align: center;
  height: 190px;
  padding: 60px 0;
  border-bottom: 1px solid #ededed;
}
.btm {
  padding: 60px 0;
}
.btm .el-form {
  margin-left: 270px;
}
.btm ul li {
  margin-top: 10px;
}
</style>
