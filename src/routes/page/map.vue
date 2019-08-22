<template>
  <div class="cont">
    <div class="cont-left card">
      <div class="top">
        <span class="title">专利技术</span>
      </div>
      <div class="cont">
        <el-tree
        :data="categoryData"
        :props="defaultProps"
        node-key="id"
        @node-click="handleNodeClick"></el-tree>
      </div>
    </div>
    <div class="cont-right card pad-0">
      <img src="../../assets/image/ditu.png" width="810" height="605" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      categoryData: [],
      defaultProps: {
        children: 'childs',
        label: 'name'
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
        if (res) {
          this.categoryData = res
        }
      }).catch(_ => {})
    },
    handleNodeClick (data) {
      console.log(data)
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
.cont-right {
  margin-left: 390px;
  width: 810px;
  height: 605px;
}

</style>
