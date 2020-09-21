<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">管理员列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="!falg">用户添加</el-breadcrumb-item>
      <el-breadcrumb-item v-if="falg">用户修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
       <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="ruleForm.roleid" placeholder="请选择商品分类">
          <el-option :label="item.rolename" :value="item.id" v-for="item in list" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
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
      ruleForm: {
        roleid: "",
        username: "",
        password: "",
        status: true,
      },
      rules: {
        username: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        roleid:[{required: true}]
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过，调用添加的接口
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          if (this.id) {
            this.$http
              .post("/useredit", { ...this.ruleForm, id: this.id })
              .then((res) => {
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
            console.log(this.ruleForm.roleid);
            this.$http.post("/useradd", this.ruleForm).then((res) => {
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
    this.$http.get("/rolelist", { istree: true }).then((res, req) => {
      this.list = res.data.list;
      // console.log(this.list);
    });
    if (this.id) {
      this.falg = true;
      this.str = "修改";
      this.$http.get("/userinfo", { uid: this.id }).then((res, req) => {
        console.log(res);
        this.ruleForm = res.data.list;
        this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
        this.ruleForm.password = ''
      });
    } else {
      this.falg = false;
      this.str = "添加";
    }
  },
};
</script>
<style lang="stylus" scoped></style>