<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
      <el-table-column prop="id" label="商品编号" width="150"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="150"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="150"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="150"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img :src="'http://localhost:3000' + scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isnew == 1">{{scope.row.isnew | hotFormat}}</el-tag>
          <el-tag v-if="scope.row.isnew == 2" type="danger">{{scope.row.isnew | hotFormat}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.ishot == 1">{{scope.row.ishot | hotFormat}}</el-tag>
          <el-tag v-if="scope.row.ishot == 2" type="danger">{{scope.row.ishot | hotFormat}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" width="100">
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
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000" :page-size='5'></el-pagination>
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
    aaa(row) {
      console.log(row);
    },
    getList() {
      this.$http.get("/goodslist", { size: 10, page: 1 }).then((res) => {
        this.list = res.data.list;
      });
    },
    del(id) {
      this.$http.post("/goodsdelete", { id }).then((res) => {
        console.log(res);
        alert("删除成功");
        this.getList();
      });
    },
    handleEdit(row) {
      console.log(row);
      this.$router.push(`/goods/edit?id=${row.id}`);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    menuadd() {
      this.$router.push("./goods/add");
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
  
<style lang="stylus" scoped>
img {
  width: 150px;
  height: 150px;
}
</style>