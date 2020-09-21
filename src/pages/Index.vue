<template>
  
    <el-container class="index">
      <el-aside width="200px">
        <Navbar />
      </el-aside>
      <el-container>
        
        <el-header >{{ username }} <i class="el-icon-setting"></i></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components:{
    Navbar,
  },
  computed: {
    username(){
      return this.$store.state.userList.username
    }
  },
};
</script>
  
<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body,.index,.el-container{
    width: 100%;
    height: 100%;
  }
  .el-header{
    background-color: #b2c0d0;
    color: #333;
    text-align: right;
    line-height: 60px;
    font-size: 12px;
  }
  
  .el-aside {
    background-color: #202229;
    color: #333;
    text-align: center;
    height: 100%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
  }
  .el-button--primary{
    margin: 10px 0px;
  }
  .el-submenu,.el-menu-item{
    width: 200px;
  }
</style>
