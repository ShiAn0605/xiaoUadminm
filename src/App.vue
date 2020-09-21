<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components:{
  }
};
</script>
  
<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body,#app,.el-container{
    width: 100%;
    height: 100%;
  }
 
</style>
