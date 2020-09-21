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
      <el-table-column prop="id" label="角色编号"  width="150"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"  width="120"></el-table-column>
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
            @onConfirm="del(scope.row.id)"
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
    };
  },
  methods: {
    getList(){
      this.$http.get("/rolelist").then((res) => {
      this.list = res.data.list;
    });
    },
    del(id){
        this.$http.post('/roledelete',{id}).then(res =>{
          console.log(res);
          this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
          this.getList()
        })
    },
    // ...mapMutations(["handleEdit"]),
    handleEdit(row) {
      console.log(row);
      this.$router.push(`/role/edit?id=${row.id}`);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    menuadd() {
      this.$router.push("./role/add");
    },
  },
  mounted() {
    this.getList()
  },
};
</script>

<style lang="stylus" scoped></style>