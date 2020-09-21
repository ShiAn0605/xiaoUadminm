<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">规格列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="!falg">规格添加</el-breadcrumb-item>
      <el-breadcrumb-item v-if="falg">规格修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="specsname" label="规格名称">
        <el-input v-model="ruleForm.specsname"></el-input>
      </el-form-item>
    <el-form-item
    v-for="(domain, index) in ruleForm.attrs"
    label="规格属性"
    :key="index"

  >
    <el-input v-model="domain.value" class="newinput"></el-input>
    <el-button @click="addDomain" v-if="index == 0" type="primary">新增属性</el-button>
    <el-button @click.prevent="removeDomain(index)" v-if="index != 0" type="danger">删除</el-button>
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
      domains: [{
            value: ''
          }],  
      id: "",
      editlist: "",
      str: "",
      falg: "",
      list: "",
      ruleForm: {
        pid: "",
        specsname: "",
        attrs: [
                    {
                        value: ""
                    }
                ],
        status: true,
      },
      rules: {
        specsname: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
       removeDomain(item) {
           console.log(this.domains);
        if (item !== -1) {
          this.ruleForm.attrs.splice(item, 1)
        }
      },
      addDomain() {
        this.ruleForm.attrs.push({
          value: ''
        });
      },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证通过，调用添加的接口
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
          this.ruleForm.attrs = this.ruleForm.attrs.map(item =>{
              return item.value
          }).join(',')
          if (this.id) {
            this.$http.post("/specsedit", this.ruleForm).then((res) => {
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
            this.$http.post("/specsadd", this.ruleForm).then((res) => {
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
    // this.$http.get("/catelist", { pid: 0 }).then((res, req) => {
    //   console.log(res);
    //   this.list = res.data.list;
    //   // console.log(this.list);
    // });
    if (this.id) {
      this.falg = true;
      this.str = "修改";
      this.$http.get("/specsinfo", { id: this.id }).then((res, req) => {
          console.log(res);
          let arr = []
          res.data.list[0].attrs.forEach(item => {
              arr.push({value:item})
          });
        //   console.log(arr);
            this.ruleForm = res.data.list[0];
            this.ruleForm.attrs = arr
        this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
      });
    } else {
      this.falg = false;
      this.str = "添加";
    }
  },
};
</script>
<style lang="stylus" scoped>
.newinput{
    width 500px
}
</style>
