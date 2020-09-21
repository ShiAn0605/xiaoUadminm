<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="!falg">商品添加</el-breadcrumb-item>
      <el-breadcrumb-item v-if="falg">商品修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="ruleForm.first_cateid" placeholder="请选择商品分类" @change="catelist">
          <el-option :label="item.catename" :value="item.id" v-for="item in list" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="ruleForm.second_cateid" placeholder="请选择商品分类">
          <el-option :label="item.catename" :value="item.id" v-for="item in cateList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="ruleForm.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model="ruleForm.market_price"></el-input>
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

      <el-form-item label="商品规格" prop="specsid">
        <el-select v-model="ruleForm.specsid" placeholder="请选择商品分类" @change="specsList()">
          <el-option :label="item.specsname" :value="item.id" v-for="item in specslist" :key="item.id"></el-option>
          
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性" prop="specsattr">
        <el-select v-model="ruleForm.specsattr" placeholder="请选择商品分类">
          <el-option :label="item" :value="item" v-for="item in second_specs" :key="item.id"></el-option>
         
        </el-select>
      </el-form-item>
       <el-form-item label="是否新品" prop="isnew">
        <el-radio-group v-model="ruleForm.isnew">
          <el-radio :label="1"   >是</el-radio>
          <el-radio :label="2"  >否</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item label="是否热卖" prop="ishot">
        <el-radio-group v-model="ruleForm.ishot">
          <el-radio :label="1"   >是</el-radio>
          <el-radio :label="2"  >否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品描述">
          <Wangtext />
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
import Wangtext from '@/components/Wangtext'
export default {
  components:{
    Wangtext,
  },
  data() {
    return {
      second_specs:'',
      specslist:'',
      cateList:'',
      id: "",
      editlist: "",
      str: "",
      falg: "",
      list: "",
      imglist: [],
      ruleForm: {
        first_cateid:'',
        second_cateid:'',
        goodsname:'',
        price:'',
        market_price:'',
        img: "",
        description:'',
        specsid:'',
        specsattr:'',
        isnew:'',
        ishot:'',
        status: true,
      },
      rules: {
        first_cateid: [
          { required: true, message: "请输入菜单名称", trigger: "change" },
        ],
        second_cateid:[
          {required : true, message : '请选择分类', trigger:'change'}
        ],
        goodsname:[
          {required : true, message : '请输入商品名称', trigger:'brul'}
        ],
      },
    };
  },
  methods: {
    specsList(){
      
      let specsname = this.ruleForm.specsid
      this.$http.get('/specsinfo',{id:specsname}).then(res=>{
           this.second_specs =  res.data.list[0].attrs
          //  console.log(res.data.list[0].attrs);
      })
    },

    catelist(){
       
       let cateid = this.ruleForm.first_cateid
       this.$http.get("/getcatetree").then(res=>{
        //  console.log(res.data.list);
        this.cateList= res.data.list.filter(item =>{
            return cateid == item.id
         })[0].children;
         console.log(this.cateList);
       }) 
      
    },
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
            this.$http.post("/goodsedit", from).then((res) => {
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
            console.log(this.ruleForm);
            this.$http.post("/goodsadd", from).then((res) => {
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
      // console.log(res);
      this.list = res.data.list;
      // console.log(this.list);
    });
    if (this.id) {
      this.falg = true;
      this.str = "修改";
      this.$http.get("/goodsinfo", { id: this.id }).then((res, req) => {
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
    //获取规格分类
    //specsname
    this.$http.get('/specslist').then(res=>{
      this.specslist = res.data.list
      // console.log(this.specslist);   
    }) 
        
  },
};
</script>
<style lang="stylus" scoped></style>