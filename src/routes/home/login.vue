<template>
  <div id="login">
    <div class="background"></div>
    <div class="content">
      <div class="top">长城华冠KMP管理平台</div>
      <el-form ref="form" label-width="103px">
        <el-form-item label="登录账号">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="bottom">
        <el-button type="primary" @click="login">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (!this.username) {
        this.$message.warning('请输入登录账号！')
        return false
      }
      if (!this.password) {
        this.$message.warning('请输入用户密码！')
        return false
      }
      this.$service.user.login({
        account: this.username,
        password: this.password
      }).then(res => {
        if (res) {
          this.userName = res.name
          this.$cookies.set('userName', res.name)
          this.dialogVisible = false
          this.$router.push('/')
        }
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>
#login {
  position: fixed;
  width: 100%; height: 100%;
}
#login .background {
  width: 100%; height: 100%;
  background: #333;
}
#login .content {
  position: absolute;
  top: 50%; left: 50%;
  width: 400px; height: 300px;
  margin-left: -200px;
  margin-top: -150px;
  background: white;
  border-radius: 5px;
}
#login .content .top {
  height: 100px;
  font-size: 24px;
  font-weight: bolder;
  line-height: 100px;
  text-align: center;
  color: #555;
}
#login .content .bottom {
  text-align: center;
}
#login .content .el-input {
  width: 250px;
}
#login .content .bottom .el-button {
  width: 318px;
}
</style>
