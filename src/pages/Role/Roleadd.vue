<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="!falg">角色添加</el-breadcrumb-item>
      <el-breadcrumb-item v-if="falg">角色修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="ruleForm.rolename"></el-input>
      </el-form-item>

      <el-form-item label="角色权限" prop="menus">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1]"
          :default-checked-keys="roleArr"
          :props="defaultProps"
          check-strictly  
          ref="mytree"
        ></el-tree>
        <!-- check-strictly 选项框的严格模式， 父子不相干 -->
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
        rolename: "",
        menus:[],
        status: true,
      },
      roleArr:[],
      rules: {
        rolename: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过，调用添加的接口
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          this.ruleForm.menus = this.$refs.mytree.getCheckedKeys()
          if (this.id) {
            this.$http
              .post("/roleedit", { ...this.ruleForm, id: this.id })
              .then((res) => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.$router.back();
                }else{
                   this.$message.error('修改失败');
                }
              });
          } else {
              
              console.log(this.ruleForm.menus);
              this.$http.post("/roleadd", this.ruleForm).then((res) => {
              console.log(res);
             if (res.data.code == 200) {
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  this.$router.back();
                }else{
                   this.$message.error('添加失败');
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
    this.$http.get("/menulist", { istree: true }).then((res, req) => {
      this.data = res.data.list;
      console.log(this.list);
    });
    if (this.id) {
      this.falg = true;
      this.str = "修改";
      this.$http.get("/roleinfo", { id: this.id }).then((res, req) => {
        console.log(res);
        this.ruleForm = res.data.list;
        this.roleArr = this.ruleForm.menus.split(',')
        console.log(this.roleArr);
        this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
      });
    } else {
      this.falg = false;
      this.str = "添加";
    }
  },
};
</script>
<style lang="stylus" scoped></style>