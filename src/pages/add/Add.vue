<template>
      <div id="app" style="height:100%">
   <!-- 左侧导航 -->
    <div class="main-left" style="width:15%;height:100%;background-color: rgb(79, 92, 100);float:left">
    <el-col :span="12" style="width:100%;height:100%">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
       <el-menu-item index="5">
      <img src="../../assets/long.png" style="width:20%;height:50%" />
      <i style="color: rgb(58, 194, 144);margin-left: 10%;">豹豹龙后台系统</i>
      </el-menu-item>
      </el-submenu>
    </el-menu>
    <el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText">
</el-input>
 <el-tree
  class="filter-tree"
  :data="data2"
  style="background:rgb(84, 92, 100);color:#000"
  :props="defaultProps"
  default-expand-all
  @node-click="handleNodeClick"
  :filter-node-method="filterNode"
  ref="tree2">
</el-tree>
  </el-col>
</el-row>
            </div>

              <!-- 右侧主内容区 -->
              <div  class="main-right"  style="width:85%;height:100%;float:left;margin-top:2%;overflow-y:scroll;" >
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="题目ID" prop="name">
    <el-input v-model="ruleForm.qid"></el-input>
  </el-form-item>
    <el-form-item label="书籍ID" prop="name">
    <el-input v-model="ruleForm.bi"></el-input>
  </el-form-item>
      <el-form-item label="等级" prop="name">
    <el-input v-model="ruleForm.level"></el-input>
  </el-form-item>
  <el-form-item label="" style="width:100%;height:100%;float:left;">
        <el-select @change="selectGet" v-model="form.region" placeholder="选择题">
          <el-option 
            v-for="item in selectList" 
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <div>题目</div>
      <div>
      <el-form-item label="题干" prop="name">
    <el-input v-model="ruleForm.qt"></el-input>
  </el-form-item>
      <el-form-item label="图片地址" prop="name">
    <el-input v-model="ruleForm.qi"></el-input>
      <el-button type="primary"  @click="submitForm(imgedit1)"  >添加图片</el-button>
  </el-form-item>
 <img  :src="imageUrl" class="avatar">
    <el-form-item label="音频地址" prop="name">
    <el-input v-model="ruleForm.qa"></el-input>
      <el-button type="primary" @click="submitForm1(musicedit1)"   >添加音频</el-button>
  </el-form-item>
  </div>

 <div>答案列表</div>
 <div>
 <div>
 <div>答案A</div>
  <el-form-item label="图片描述" prop="name">
    <el-input v-model="ruleForm.addqtA1"></el-input>
  </el-form-item>
  <el-form-item label="图片地址" prop="name">
    <el-input v-model="ruleForm.addqiA1"></el-input>
  </el-form-item>
   <img  :src="ruleForm.qiA" class="avatar">
    <el-form-item label="音频地址" prop="name">
    <el-input v-model="ruleForm.addqaA1"></el-input>
  </el-form-item>
<el-button type="primary"  @click="A(answera1)"  >添加答案A</el-button>
 
 <el-form-item label="是否正确答案" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="1"></el-radio>
     
    </el-radio-group>
  </el-form-item>
</div>
<div>
 <div>答案B</div>
  <el-form-item label="图片描述" prop="name">
    <el-input v-model="ruleForm.qtB"></el-input>
  </el-form-item>
  <el-form-item label="图片地址" prop="name">
    <el-input v-model="ruleForm.qiB"></el-input>
  </el-form-item>
   <img  :src="ruleForm.qiB" class="avatar">
    <el-form-item label="音频地址" prop="name">
    <el-input v-model="ruleForm.qaB"></el-input>
  </el-form-item>
  <el-button type="primary"  @click="B(answerb)"  >添加答案B</el-button>
 <el-form-item label="是否正确答案" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="2"></el-radio>

    </el-radio-group>
  </el-form-item>
  </div>
  <div>
  <div>答案C</div>
   <el-form-item label="图片描述" prop="name">
    <el-input v-model="ruleForm.qtC"></el-input>
  </el-form-item>
  <el-form-item label="图片地址" prop="name">
    <el-input v-model="ruleForm.qiC"></el-input>
  </el-form-item>
   <img  :src="ruleForm.qiC" class="avatar">
    <el-form-item label="音频地址" prop="name">
    <el-input v-model="ruleForm.qaC"></el-input>
  </el-form-item>
  <el-button type="primary"  @click="C(answerc)"  >添加答案C</el-button>
  <el-form-item label="是否正确答案" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="3"></el-radio>
    </el-radio-group>
  </el-form-item>
  </div>
  <div>
   <div>答案D</div>
    <el-form-item label="图片描述" prop="name">
    <el-input v-model="ruleForm.qtD"></el-input>
  </el-form-item>
  <el-form-item label="图片地址" prop="name">
    <el-input v-model="ruleForm.qiD"></el-input>
  </el-form-item>
   <img  :src="ruleForm.qiD" class="avatar">
    <el-form-item label="音频地址" prop="name">
    <el-input v-model="ruleForm.qaD"></el-input>
  </el-form-item>
  <el-button type="primary"  @click="D(answerd)"  >添加答案D</el-button>
   <el-form-item label="是否正确答案" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="4"></el-radio>
    </el-radio-group>
  </el-form-item>
  </div>
 </div>

</el-form>
  
              </div>
      
      </div>
    </template>

<script>
// 引入子组件

 import BScroll from 'better-scroll'

// 引入http模块
import http from 'utils/http'

export default {
  // 想要动态渲染p

  data(){
      return {
           imageUrl:localStorage.getItem('addqid'),
          
           selectList:[
          {id:1,name:'选择题'},
          {id:2,name:'填空题'},
        ],
      form: {
        region: "选择题"
      },
        question:[],
        datamap:{9:'https://www.baidu.com'},
         message:localStorage.getItem('name'),
        filterText: '',
         data2: [{
          id: 1,
          label: '数据',
          children: [{
            id: 4,
            label: '报表',
            children: [{
              id: 9,
              label: '核心数据'
            }, ]
          }]
        },{
          id: 2,
          label: '运营',
          children: [{
            id: 5,
            label: '英语习题',
            children: [{
              id: 11,
              label: '问题管理'
            },
     {
              id: 13,
              label: '答案管理'
            },
            {
              id: 15,
              label: '图片管理'
            },
            {
              id: 16,
              label: '音频管理'
            }],
          },{
            id: 6,
            label: '聊天串',
     
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
         dialogTableVisible: false,
        dialogFormVisible: false,
         ruleForm: {
          qid: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          level:'',
          bi:'',
          qt:'',
          qa:localStorage.getItem('addqaurl'),
          qi:localStorage.getItem('addqid'),
           addqaA1:localStorage.getItem('addqaA1'),
          addqiA1:localStorage.getItem('addqaA1'),
          addqtA1:localStorage.getItem('addqaA1'),
          addqaB:'',
         addqiB:'',
          addqtB:'',
         addqaC:'',
          addqiC:'',
          addqtC:'',
          addqaD:'',
          addqiD:'',
          addqtD:'',
            
        },

      
        
    }
  },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

  // 子组件集合
  components: {
   
  },

  // 生命周期钩子
   created(){
     
let token=localStorage.getItem('access_token')
     
      
        },
      methods: {
          re(profile){
 this.$router.push('/profile')
          },
                
           handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
        submitForm(imgedit1) {
        this.$router.push('/imgedit1')
      },
        submitForm1(musicedit1) {
        this.$router.push('/musicedit1')
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
         muiscPlay1(r){
        
        this.gamemuiscs1 = new Audio(r);
        this.gamemuiscs1.play();
      },
        handleClick(row) {
        console.log(row.question_audio_id);
        this.muiscPlay1(row.question_audio_id)
      },
         go(log){
        this.$router.push(log),
        localStorage.clear()
      },
         handleNodeClick(data) {
       let id = data.id
        if(data.id===9){
          this.$router.push('/class')
        }  
         if(data.id===11){
           console.log(data.id)
          this.$router.push('/profile')

        }    
         if(data.id===13){
           console.log(data.id)
          this.$router.push('/answermanagement')

        }  
         if(data.id===15){
           console.log(data.id)
          this.$router.push('/imgmanagement')

        }   
         if(data.id===16){
           console.log(data.id)
          this.$router.push('/audiomanagement')

        }      
      
       
      },
   filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
        formatTime(time) {
    this.createdate=time;   //date是绑定的值
},
        selectGet(vId){
      let obj = {};
      obj = this.selectList.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.id === vId;//筛选出匹配数据
      });
      console.log(obj.name);//我这边的name就是对应label的
      this.id=obj.id;
    },
   
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      async a(){
         var _this= this
       let result = await http({
      method :'get',
      url:'/api/questions/questions_list',
      params: {
      pageSize:10,
      pageIndex:1,
      question_bank:1
    },
    headers: {
    'Content-Type': 'application/json',
    'Authorization':'jwt'+' '+localStorage.getItem('access_token')
  },
    })
    // 将ajax拿到的值赋值给p
  
     .then(function(result){
        console.log(result)
        var question1 = []
        for(var k=0;k<(result.data.result).length;k++){
         var obj = {}
          obj.question_id = (result.data.result)[k].question_id;
          obj.question_audio_id = (result.data.result)[k].question_audio_id;
          obj.question_image_id = (result.data.result)[k].question_image_id;
          obj.question_txt = (result.data.result)[k].question_txt;
          obj.book_id = (result.data.result)[k].book_id;
          obj.level = (result.data.result)[k].level;
          obj.correct_answer_id = (result.data.result)[k].correct_answer_id;
          obj.answer_list = (result.data.result)[k].answer_list;
          question1[k] = obj;
          console.log(obj)}
        _this.question = question1;
     

      })
     
      },
   
        
         handleCurrentChange(row, event, column) {
            console.log(row, event, column, event.currentTarget);
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
  
  },
};
</script>
<style lang="stylus" scoped>
el-col el-col-12
  width:100% !import;
  body{
    height:100%;
    width:100%;
  }
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>