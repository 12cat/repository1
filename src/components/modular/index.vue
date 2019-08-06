<template>
  <div class="modular">
    <h1>自定义模块：modular</h1>
    <ul>
      <li>setting属性 - num：{{ num }}</li>
      <li>setting属性 - str：{{ str }}</li>
      <li>setting属性 - bln：{{ bln }}</li>
      <li>setting属性 - obj：{{ obj.name }}</li>
      <li>setting属性 - arr：{{ arr[0] }}</li>
      <li>setting属性 - fun：<button @click="fun(text)">调用传递的方法</button></li>
      <li>modular属性 - text：{{ text }}</li>
      <li>modular属性 - check：<button @click="checkParent">调用父组件方法</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'modular',
  data () {
    return {
      text: 'modular'
    }
  },
  // 接收父级模块传递的参数
  props: {
    num: {
      type: Number,
      default: 0
    },
    str: {
      type: String,
      default: 'str'
    },
    bln: {
      type: Boolean,
      default: false
    },
    obj: {
      type: Object,
      default () {
        return {name: 'name'}
      }
    },
    arr: {
      type: Array,
      default () {
        return [1, 2, 3]
      }
    },
    fun: {
      type: Function,
      default () {
        alert('fun is run')
      }
    }
  },
  methods: {
    modularFun () {
      this.$message.success('modularFun is run')
    },
    checkParent () {
      this.$emit('parentFun', this.text)
    }
  }
}
</script>

<style scoped>
  h1 {
    font-size: 15px;
    color: blue;
  }
  li {
    color: green;
    padding: 5px 10px;
  }
  li button {
    padding: 5px 10px;
    background-color: blueviolet;
    border: none;
    border-radius: 3px;
    color: white;
    cursor: pointer;
  }
</style>
