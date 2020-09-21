<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
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
      <el-table-column prop="id" label="菜单编号" sortable width="150"></el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="120"></el-table-column>
      <el-table-column prop="icon" label="菜单图标"></el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
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
      this.$http.get("/menulist", { istree: true }).then((res) => {
      this.list = res.data.list;
    });
    },
    del(id){
        this.$http.post('/menudelete',{id}).then(res =>{
          console.log(res);
          alert('删除成功')
          this.getList()
        })
    },
    handleEdit(row) {
      console.log(row);
      this.$router.push(`/menu/edit?id=${row.id}`);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    menuadd() {
      this.$router.push("./menu/add");
    },
  },
  mounted() {
    this.getList()
  },
};
</script>

<style lang="stylus" scoped></style>