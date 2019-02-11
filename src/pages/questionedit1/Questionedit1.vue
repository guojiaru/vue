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
                <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="题干" prop="name"">
                  <el-input v-model="ruleForm.qt"></el-input>
                </el-form-item>
                <el-form-item label="题目ID" prop="name"">
                  <el-input v-model="ruleForm.qid"></el-input>
                </el-form-item>
                <el-form-item label="书籍ID" prop="name"">
                  <el-input v-model="ruleForm.bid"></el-input>
                </el-form-item>
                 <el-form-item label="问题描述" prop="name"">
                  <el-input v-model="ruleForm.ab"></el-input>
                </el-form-item>
                 <el-form-item label="题目等级" prop="name"">
                  <el-input v-model="ruleForm.level"></el-input>
                </el-form-item>
                 <el-form-item label="题目图片" prop="name"">
                  
                  <img :src='ruleForm.qi' alt="" style="width:50px;height:50px">
                </el-form-item>
                     <el-form-item label="题目音频" prop="name"">
                  <el-input v-model="ruleForm.qa"></el-input>
                  <el-button type="text" @click="muiscPlay1(ruleForm.qa)" size="small">试听</el-button>
                </el-form-item>
                </el-form>
               
                </el-form>
                </div>
                <div>
                 <div>答案</div>
                 
                  <el-table
    :data="tableData"
    border
    style="width: 100%">
        <el-table-column

      prop="answer_id"
      label="选项id"
      width="250">
    </el-table-column>
    <el-table-column

      prop="image"
      label="选项图片"
      width="250"
      height="250">
      <template slot-scope="scope">
        <img :src='scope.row.image' alt="" style="width:50px;height:50px">
      </template>
    </el-table-column>
    <el-table-column
      prop="audio"
      label="选项音频"
      width="250">
       <template slot-scope="scope">
        <el-button type="text" @click="muiscPlay1(scope.row.audio)" size="small">试听</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="txt"
      label="选项文本"
      width="250">
    </el-table-column>

    <el-table-column
    
      label="操作"
      width="100">
      <template slot-scope="scope">
         <el-button type="primary" size="mini" @click="removeUser(scope.$index,scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="text" @click="">提交</el-button>
              </div>
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
         tableData: this.$route.query.table,
           imageUrl: localStorage.getItem('qi'),
          
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
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
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
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          qt:this.$route.query.qt,
         qid:this.$route.query.qid,
          bid:this.$route.query.bid,
         ab:this.$route.query.ab,
          level:this.$route.query.level,
          qi:this.$route.query.qiurl,
          qa:this.$route.query.qa,
         
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
        removeUser(index,w){
              console.log(index)
             this.tableData.splice(index,1)
        },
        muiscPlay1(r){
        console.log(r)
        this.gamemuiscs1 = new Audio(r);
        this.gamemuiscs1.play();
      },
          A(answera){
              this.$router.push('/answera')
          },
       
          re(profile){
 this.$router.push('/profile')
          },
                 async fn(){
                     var _this= this
        let result = await http({
      method :'post',
      url:'/api/questions/get_answer',
      data: {
      "answer_id":array,
       question_bank:1
    },
    headers: {
    'Content-Type': 'application/json',
    'Authorization':'jwt'+' '+localStorage.getItem('access_token')
  },
      params: {
      question_bank:1
    },

    })
    .then(function(result){
        console.log(result.data[0])

    })
        },
           handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
        submitForm(imgedit) {
        this.$router.push('/imgedit')
      },
        submitForm1(imgedit) {
        this.$router.push('/musicedit')
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
         muiscPlay1(r){
        
        this.gamemuiscs1 = new Audio(r);
        this.gamemuiscs1.play();
      },
     async  handleClick(row) {
        console.log(row);
          
         var _this= this
       let result = await http({
      method :'post',
      url:'/api/questions/get_answer_list',
      data: {
    
     question_bank:1,
    },
    headers: {
    'Content-Type': 'application/json',
    'Authorization':'jwt'+' '+localStorage.getItem('access_token')
  },
    })
    // 将ajax拿到的值赋值给p
  
     .then(function(result){
       console.log(_this.tableData)
       let answerall = result.data.result
      let tableData = _this.tableData
       _this.$router.push({path: '/answera', query: {tableData:tableData}})

      })
      },
         go(log){
        this.$router.push(log),
        localStorage.clear()
      },
         handleNodeClick(data) {
        console.log(data)
        let id = data.id
        if(data.id===9){
          this.$router.push('/class')
        }  
         if(data.id===11){
           console.log(data.id)
          this.$router.push('/profile')

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