<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="menuadd">添加</el-button>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="用户编号"  width="150"></el-table-column>
      <el-table-column prop="username" label="用户名称"  width="150"></el-table-column>
      <el-table-column  label="所属角色"  width="150">
          <template slot-scope="scope">
              {{scope.row.roleid | userFilter(roltList)}}
          </template>
      </el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag>{{scope.row.status | statusFormat}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            confirmButtonText="好的"
            cancelButtonText="不用了"
            icon="el-icon-info"
            iconColor="red"
            title="这是一段内容确定删除吗？"
            @onConfirm="del(scope.row.uid)"
          >
          <el-button slot="reference" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </el-popconfirm>
          
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      list: [],
      roltList:[],
    };
  },
  filters:{
      userFilter(roleid,roltList){
          if(roltList.length>0){
             let item = roltList.find(item =>{
                return  item.id == roleid
              })
              // console.log(item);
               return item.rolename
          }
         
      }
  },
  methods: {
    getList(){
      this.$http.get("/userlist",{size:10,page:1}).then((res) => {
          // console.log(res);
      this.list = res.data.list;
    });
    },
    del(id){
        this.$http.post('/userdelete',{uid:id}).then(res =>{
          console.log(res);
          if (res.data.code == 200){
              this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
          }
          
          this.getList()
        })
    },
    // ...mapMutations(["handleEdit"]),
    handleEdit(row) {
      // console.log(row);
      this.$router.push(`/user/edit?id=${row.uid}`);
    },
    handleDelete(index, row) {
      // console.log(index, row);
    },
    menuadd() {
      this.$router.push("./user/add");
    },
  },
  mounted() {
    this.getList()
    this.$http.get('/rolelist').then(res=>{
        this.roltList = res.data.list
        // console.log(this.roltList);
    })
  },
};
</script>

<style lang="stylus" scoped></style>