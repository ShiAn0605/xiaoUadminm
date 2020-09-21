<template>
  <div class="login">
    <el-form label-width="80px">
      <h1>登陆</h1>
      <el-form-item label="用户名">
        <el-input v-model="username" placeholder="请输入用户名"  @keydown.enter="login"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" type="password" placeholder="请输入密码"  @keydown.13="login"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="login">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
        password:'',
        username:''
    };
  },
  methods: {
      login(){
        console.log(111);
          this.$http.post('/userlogin',{username:this.username,password:this.password}).then(res=>{
              console.log(res);
              if(res.data.code == 200){
                  this.$store.commit('userList',res.data.list)
                  this.$router.push('/home')
              }
          })
      }
  },
};
</script>

<style lang="stylus" scoped>
.login{
  width 100%
  height 100%
  background-image: linear-gradient(90deg, #cccccc, transparent);
  text-align center
  position relative
}

.el-form-item,{
  width 330px
}
.el-form{
  width 400px
  height 200px
  position absolute
  top -300px
  bottom 0
  left 0
  right 0
  margin auto
}
.el-form h1{
  margin-bottom 20px
}


</style>