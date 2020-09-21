<template>
  <el-col :span="24">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#202229"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="0">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>{{menu[0].title}}</span>
        </template>
        <el-menu-item  v-for="(item,index) in menu[0].children" :key="index" @click="push(item.url)">{{item.title}}</el-menu-item>
      </el-submenu>
      <el-submenu index="2" v-if="menu[1]">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>{{menu[1].title}}</span>
        </template>
        <el-menu-item  v-for="(item,index) in menu[1].children" :key="index" @click="push(item.url)">{{item.title}}</el-menu-item>
      </el-submenu> -->
      <el-submenu :index="index.toString()" v-for="(item,index) in menu" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="val.url" v-for="val in menu[index].children" :key="val.id">{{val.title}}</el-menu-item>
      </el-submenu>
     
    </el-menu>
  </el-col>
</template>

<script>
export default {
  //children
  mounted() {
     console.log(this.$store.state.userList.menus);
  },
  computed: {
    menu(){
      return this.$store.state.userList.menus
    }
  },
};
</script>

<style lang="stylus" scoped>
.el-menu-item{
  background-color red
}
</style>