<template>
  <div>
    <div class="cont">
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      activeIndex: 1,
      fileList: []
    }
  },
  mounted () {
    console.log(324)
  },
  methods: {

  }
}
</script>

<style scoped>
.cont {
  margin: 30px 0;
  height: 720px;
  border-radius: 5px;
  background-color: #f4f4f4;
}
</style>
