<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/cate' }">商品分类列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="!falg">商品分类添加</el-breadcrumb-item>
      <el-breadcrumb-item v-if="falg">商品分类修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择商品分类">
          <el-option :label="item.catename" :value="item.id" v-for="item in list" :key="item.id"></el-option>
          <el-option label="顶级分类" :value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="ruleForm.catename"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="change"
          :file-list="imglist"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{str}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      editlist: "",
      str: "",
      falg: "",
      list: "",
      imglist: [],
      ruleForm: {
        pid: "",
        catename: "",
        img: "",
        status: true,
      },
      rules: {
        catename: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        pid:[
          {required : true, message : '请选择分类', trigger:'change'}
        ]
      },
    };
  },
  methods: {
    change(file, filelist) {
      console.log(file);
      console.log(filelist);
      this.ruleForm.img = file.raw;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过，调用添加的接口
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          let from = new FormData();
          for (var key in this.ruleForm) {
            from.append(key, this.ruleForm[key]);
          }
          if (this.id) {
            from.append("id", this.id);
            this.$http.post("/cateedit", from).then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                this.$router.back();
              } else {
                this.$message.error("修改失败");
              }
            });
          } else {
            // console.log(this.ruleForm);
            this.$http.post("/cateadd", from).then((res) => {
              console.log(res);
              if (res.data.code == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                this.$router.back();
              } else {
                this.$message.error("修改失败");
              }
            });
          }
        } else {
          // 验证没通过
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    // console.log(this.$route.query);
    this.id = this.$route.query.id;
    this.$http.get("/catelist", { pid: 0 }).then((res, req) => {
      console.log(res);
      this.list = res.data.list;
      // console.log(this.list);
    });
    if (this.id) {
      this.falg = true;
      this.str = "修改";
      this.$http.get("/cateinfo", { id: this.id }).then((res, req) => {
        console.log(res.data.list.img);
        this.ruleForm = res.data.list;
        this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
        this.imglist = [
          {
            name: res.data.list.catename,
            url: "http://localhost:3000" + res.data.list.img,
          },
        ];
      });
    } else {
      this.falg = false;
      this.str = "添加";
    }
  },
};
</script>
<style lang="stylus" scoped></style>