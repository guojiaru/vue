<template>
<div style="width:100%;height:100%;">
 <img src="../../assets/big.png" style="width:40%;height:40%;display:block;float:left;margin-top:10%;margin-left:10%;" />
<div style="width:30%;height:30%;margin-top:20%;float:left">
  <div style="width:100%;height:10%;text-align:center">豹豹龙内容管理系统</div>
  <div style="width:100%;height:10%;text-align:center">OA账号登陆</div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="OA账号" prop="name">
    <el-input v-model="ruleForm.name" :model="ruleForm"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
       <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary"  @click="submitForm('ruleForm,ruleForm2,movies')"   >登陆</el-button>
   <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</div>
</template>
<script>

import { mapState } from 'vuex'
import http from 'utils/http'


export default {
   data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          movies:''
        },
          ruleForm2: {
          pass: '',
          checkPass: '',
          age: '',
          movies:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          
          ],
         
        }
      };
    },
    methods: {
     go(movies){
        this.$router.push('/movies')
        console.log(this)
      },
    async  submitForm(ruleForm,ruleForm2,movies) {
       var _this= this
    let result = await http({
      method :'post',
      url:'api/auth',
       headers: {
    'Content-Type': 'application/json'
  },
      data: {
      username:this.ruleForm.name,
	    password:this.ruleForm2.pass
     
    },
    })
      .then(function (result) {
        let p =result;
       if(p.code===400||p.code===401){
         alert('登陆失败，请点击重新登陆')
         return;
        }
        if(p.code!==400||p.code!==401){

         localStorage.setItem('access_token',p.access_token)
         localStorage.setItem('name',p.user_info.user_name)
          _this.$router.push({path:'/movies'})
        }})
 

 
 
    // 将ajax拿到的值赋值给
     
      },
        resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>