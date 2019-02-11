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
                  <el-input v-model="ruleForm.question_txt"   ></el-input>
                </el-form-item>
                <div>
                 <el-select @change="selectGet1" v-model="form.region1" placeholder="请选择问题类型">
                    <el-option 
                      v-for="item in selectList1" 
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  </div>
                  <div>
                  <el-select @change="selectGet" v-model="form.region" placeholder="请选择问题格式">
                    <el-option 
                      v-for="item in selectList" 
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  </div>
                <el-form-item label="题目ID" prop="name"">
                  <el-input v-model="ruleForm.question_id"></el-input>
                </el-form-item>
                <el-form-item label="书籍ID" prop="name"">
                  <el-input v-model="ruleForm.book_id"></el-input>
                </el-form-item>
                 <el-form-item label="问题描述" prop="name"">
                  <el-input v-model="ruleForm.answer_describe"></el-input>
                </el-form-item>
                 <el-form-item label="题目等级" prop="name"">
                  <el-input v-model="ruleForm.level"></el-input>
                </el-form-item>
                 <el-form-item label="题目图片" prop="name"">
                  
                  <img :src='ruleForm.question_image_url' alt="" style="width:50px;height:50px">
                </el-form-item>
                <div v-if="ruleForm.question_image_url !== undefined"><el-button type="text" @click="submitForm()">更改图片</el-button></div>
                <div v-if="ruleForm.question_image_url === undefined"><el-button type="text" @click="submitForm()">添加图片</el-button></div>
                <el-form-item label="题目音频" prop="name"">
                  <el-button type="text" @click="muiscPlay1(ruleForm.question_audio_url)" size="small">试听</el-button>
                </el-form-item>
                <div v-if="ruleForm.question_audio_url !== undefined"><el-button type="text" @click="submitForm1()">更改音频</el-button></div>
               <div v-if="ruleForm.question_audio_url === undefined"><el-button type="text" @click="submitForm1()">添加音频</el-button></div>
                </el-form>
                </el-form>
                </div>
                <div>
                 <div>答案</div>
                 <div>
                   <el-select @change="selectGet2" v-model="form.region2" placeholder="请选择答案格式">
                    <el-option 
                      v-for="item in selectList2" 
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  </div>
                  <el-button @click="handleClick()">添加</el-button>
                    <el-table
                    :data="ruleForm.answer_list"
                    border
                    style="width: 100%.height:500px">
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
                      width="150">
                      <template slot-scope="scope">
                          <el-button type="primary" size="mini" @click="getanswer(scope.$index,scope.row)">正确答案</el-button>
                        <el-button type="primary" size="mini" @click="removeUser(scope.$index,scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button type="primary" @click="push()">提交</el-button>
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
        checkedValue:'',
         ruleForm: {
         answer_describe:'',
         answer_list:[],
         answer_style:'',
         book_id:'',
         correct_answer_id:[],
         create_time:'',
         id:'',
         is_online:'',
         level:'',
         question_audio_id:'',
         question_audio_url:'',
         question_describe:'',
         question_id:'',
         question_image_id:'',
         question_image_url:'',
         question_style:'',
         question_txt:'',
         question_type:'',
         source:'',
         status:'',
         type:'',
         updata_time:'',
        
        },
        arr:[],
        str:'',
        saveinfo:this.$store.state.saveInfo,
          
      selectList:[
          {id:1,name:'选择题'},
          {id:2,name:'填空题'},
        ],
      form: {
      region: "选择题"
      },
      selectList1:[
          {id:1,name:'文本加音频'},
          {id:2,name:'图片'},
          {id:3,name:'图片加音频'},
          {id:4,name:'文本'},
          {id:5,name:'音频'},
          {id:6,name:'文字加图片加音频'},
        ],
      form1: {
        region: "文本加音频"
      },
        selectList2:[
          {id:1,name:'图片'},
          {id:2,name:'文字加音频'},
          {id:3,name:'文字'}
        ],
      form2: {
        region: "图片"
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
        rules: {
                  name: [
                    {},
                  ]
                }  
    }
  },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      },
   


    },

  // 子组件集合
  components: {
  },
  // 生命周期钩子
      created(){
        if((this.$store.state.editInfo).length!==0){
          console.log(this.$store.state.editInfo)
       this.ruleForm.answer_describe = this.$store.state.editInfo.answer_describe
       this.ruleForm.answer_list = this.$store.state.editInfo.answer_list
       this.ruleForm.answer_style = this.$store.state.editInfo.answer_style
      this.ruleForm.book_id = this.$store.state.editInfo.book_id
        this.ruleForm.correct_answer_id = this.$store.state.editInfo.correct_answer_id
      this.ruleForm.create_time = this.$store.state.editInfo.create_time
       this.ruleForm.id = this.$store.state.editInfo.id
       this.ruleForm.is_online    = this.$store.state.editInfo.is_online
       this.ruleForm.level      = this.$store.state.editInfo.level
        this.ruleForm.question_audio_id = this.$store.state.editInfo.question_audio_id
       this.ruleForm.question_audio_url = this.$store.state.editInfo.question_audio_url
        this.ruleForm.question_image_id = this.$store.state.editInfo.question_image_id
       this.ruleForm.question_image_url = this.$store.state.editInfo.question_image_url
        this.ruleForm.question_describe = this.$store.state.editInfo.question_describe
        this.ruleForm.question_id       = this.$store.state.editInfo.question_id
        this.ruleForm.question_style    = this.$store.state.editInfo.question_style 
       this.ruleForm.question_txt = this.$store.state.editInfo.question_txt
        this.ruleForm.question_type = this.$store.state.editInfo.question_type
      this.ruleForm.source    = this.$store.state.editInfo.source
       this.ruleForm.status   = this.$store.state.editInfo.status
      this.ruleForm.type = this.$store.state.editInfo.type
        this.ruleForm.updata_time  = this.$store.state.editInfo.updata_time
        }else{
          
        }
      },
      methods: {
        getanswer(index,row){
            console.log(row)
             console.log(this.$store.state.editInfo)
             this.$store.state.editInfo.correct_answer_id = row
             this.$store.dispatch('editInfo',this.$store.state.editInfo)
             console.log(this.$store.state.editInfo)
          //  this.str = this.$store.state.editInfo.correct_answer_id

        },

      submitForm() {
       var obj = {}
       obj.answer_describe = this.ruleForm.answer_describe
       obj.answer_list = this.ruleForm.answer_list
       obj.answer_style = this.ruleForm.answer_style
       obj.book_id = this.ruleForm.book_id
       obj.correct_answer_id = this.ruleForm.correct_answer_id
       obj.create_time = this.ruleForm.create_time
       obj.id = this.ruleForm.id
       obj.is_online = this.ruleForm.is_online   
       obj.level = this.ruleForm.level     
       obj.question_audio_id = this.ruleForm.question_audio_id
       obj.question_audio_url = this.ruleForm.question_audio_url
       obj.question_image_id = this.ruleForm.question_image_id
       obj.question_image_url = this.ruleForm.question_image_url
       obj.question_describe = this.ruleForm.question_describe
       obj.question_id = this.ruleForm.question_id      
       obj.question_style = this.ruleForm.question_style    
       obj.question_txt = this.ruleForm.question_txt
       obj.question_type = this.ruleForm.question_type     
       obj.source = this.ruleForm.source   
       obj.status = this.ruleForm.status  
       obj.type = this.ruleForm.type 
       obj.updata_time = this.ruleForm.updata_time 
       obj.source1 = 7

       this.$router.push({name:'imgedit',params:obj})
       this.$store.dispatch('editInfo',obj )
       console.log(this.$store.state.editInfo)
         
      },
      submitForm1() {
      var obj = {}
       obj.answer_describe = this.ruleForm.answer_describe
       obj.answer_list = this.ruleForm.answer_list
       obj.answer_style = this.ruleForm.answer_style
       obj.book_id = this.ruleForm.book_id
       obj.correct_answer_id = this.str
       obj.create_time = this.ruleForm.create_time
       obj.id = this.ruleForm.id
       obj.is_online = this.ruleForm.is_online   
       obj.level = this.ruleForm.level     
       obj.question_audio_id = this.ruleForm.question_audio_id
       obj.question_audio_url = this.ruleForm.question_audio_url
       obj.question_image_id = this.ruleForm.question_image_id
       obj.question_image_url = this.ruleForm.question_image_url
       obj.question_describe = this.ruleForm.question_describe
       obj.question_id = this.ruleForm.question_id      
       obj.question_style = this.ruleForm.question_style    
       obj.question_txt = this.ruleForm.question_txt
       obj.question_type = this.ruleForm.question_type     
       obj.source = this.ruleForm.source   
       obj.status = this.ruleForm.status  
       obj.type = this.ruleForm.type 
       obj.updata_time = this.ruleForm.updata_time 
       obj.source1 = 7

       this.$router.push({name:'musicedit',params:obj})
       this.$store.dispatch('editInfo',obj )
       console.log(this.$store.state.editInfo)
      },
      handleClick() {
      var obj = {}
       obj.answer_describe = this.ruleForm.answer_describe
       obj.answer_list = this.ruleForm.answer_list
       obj.answer_style = this.ruleForm.answer_style
       obj.book_id = this.ruleForm.book_id
       obj.correct_answer_id = this.ruleForm.correct_answer_id
       obj.create_time = this.ruleForm.create_time
       obj.id = this.ruleForm.id
       obj.is_online = this.ruleForm.is_online   
       obj.level = this.ruleForm.level     
       obj.question_audio_id = this.ruleForm.question_audio_id
       obj.question_audio_url = this.ruleForm.question_audio_url
       obj.question_image_id = this.ruleForm.question_image_id
       obj.question_image_url = this.ruleForm.question_image_url
       obj.question_describe = this.ruleForm.question_describe
       obj.question_id = this.ruleForm.question_id      
       obj.question_style = this.ruleForm.question_style    
       obj.question_txt = this.ruleForm.question_txt
       obj.question_type = this.ruleForm.question_type     
       obj.source = this.ruleForm.source   
       obj.status = this.ruleForm.status  
       obj.type = this.ruleForm.type 
       obj.updata_time = this.ruleForm.updata_time 
       obj.source1 = 7
       this.$store.dispatch('editInfo',obj )
       this.$router.push({name:'answera',params:this.$store.state.editInfo})
       console.log(this.$store.state.editInfo)

      },
      removeUser(index,w){
        console.log(index)
        console.log(w)
        console.log( this.$store.state.editInfo)
        console.log(this.ruleForm.answer_list)
         this.ruleForm.answer_list.splice(index,1)
          this.$store.state.saveInfo.answer_list =this.ruleForm.answer_list.splice(index,1)
           this.$store.dispatch('editInfo',this.$store.state.editInfo)
           console.log(this.$store.state.editInfo)

      },
      async push(){
       var _this= this;
       let result = await http({
       method :'post',
       url:'/api/questions/add_question',
      data:{
       question_image_id:this.$store.state.editInfo.question_image_id,
       question_image_url:this.$store.state.editInfo.question_image_url,
       answer_describe:this.$store.state.editInfo.answer_describe, 
       answer_list: this.$store.state.editInfo.answer_list, 
       answer_style:this.$store.state.editInfo.answer_style ,
       book_id:this.$store.state.editInfo.book_id,
       correct_answer_id:this.$store.state.editInfo.correct_answer_id,
       create_time:this.$store.state.editInfo.create_time,
       id:this.$store.state.editInfo.id,
       is_online:this.$store.state.editInfo.is_online,
       level:this.$store.state.editInfo.level,
       question_audio_id:this.$store.state.editInfo.question_audio_id,
       question_audio_url:this.$store.state.editInfo.question_audio_url,
       question_describe:this.$store.state.editInfo.question_describe ,
      // question_id:this.$store.state.editInfo.question_id     ,
       question_style:this.$store.state.editInfo.question_style ,
       question_txt:this.$store.state.editInfo.question_txt,
       question_type:this.$store.state.editInfo.question_type ,    
       source: this.$store.state.editInfo.source ,
       status:this.$store.state.editInfo.status ,  
       type: this.$store.state.editInfo.type,
       updata_time: this.$store.state.editInfo.updata_time,
      "question_bank":1,
	
      },
      headers: {
          'Content-Type': 'application/json',
          'Authorization':'jwt'+' '+localStorage.getItem('access_token')
        },
        })
         .then(function(result){
        console.log(result)
         if(result.code == 200){
         _this.$router.push({name:'profile',params:_this.$store.state.saveInfo})
         _this.$store.dispatch('saveInfo',_this.$store.state.saveInfo)
         }

      })
       
        },
      handleEditPric(item, e) {
			  item.price = e.target.value
		  },
       muiscPlay1(r){
        console.log(r)
        this.gamemuiscs1 = new Audio(r);
        this.gamemuiscs1.play();
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
      
      
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
         muiscPlay1(r){
        
        this.gamemuiscs1 = new Audio(r);
        this.gamemuiscs1.play();
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
      console.log(obj.id)
     this.ruleForm.question_type = obj.id
     console.log(this.ruleForm.question_type)
       this.$store.state.editInfo.question_type = this.ruleForm.question_type
             this.$store.dispatch('editInfo',this.$store.state.editInfo)

    },
      selectGet1(vId){
      let obj = {};
      obj = this.selectList1.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.id === vId;//筛选出匹配数据
      });
      console.log(obj.name);//我这边的name就是对应label的
      this.id=obj.id;
     this.ruleForm.question_style = obj.id
       this.$store.state.editInfo.question_style = this.ruleForm.question_style
             this.$store.dispatch('editInfo',this.$store.state.editInfo)
    },
     selectGet2(vId){
      let obj = {};
      obj = this.selectList2.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.id === vId;//筛选出匹配数据
      });
      console.log(obj.name);//我这边的name就是对应label的
      this.id=obj.id;
       this.ruleForm.answer_style = obj.id
  this.$store.state.editInfo.answer_style = this.ruleForm.answer_style
             this.$store.dispatch('editInfo',this.$store.state.editInfo)
    },
   
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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