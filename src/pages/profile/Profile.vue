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
              <div  class="main-right"  style="width:85%;height:100%;float:left;margin-top:2%;overflow-y:scroll;">
              <el-button type="primary"  @click="addquestion()">添加</el-button>
               <el-button type="primary" @click="Batch_online()">发布</el-button>
              <div >
                <div style="width:70px;height:40px;float:left;margin_right:5px;line_height:40px;text_align:'center'">题目ID:</div><el-input v-model="question_id" style="width:100px;float:left;margin_right:5px;"></el-input>
                <div style="width:70px;height:40px;float:left;margin_right:5px;line_height:40px;text_align:'center'">题目等级:</div><el-input v-model="level"style="width:100px;float:left;margin_right:5px;"></></el-input>
                 <el-button type="primary" @click='check()'>搜索</el-button>
              </div> 
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalItems">
              </el-pagination>  
             <el-table
    :data="question"
    border
    style="width: 100%；overflow-y:scroll;">
    
    <el-table-column
      fixed
      prop="question_id"
      label="题目Id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="question_txt"
      label="题干"
      width="200">
    </el-table-column>
    <el-table-column
      prop="question_image_url"
      label="题目图片"
      width="120">
      <template slot-scope="scope">
        <img :src='scope.row.question_image_url' alt="" style="width:50px;height:50px">
      </template>
    </el-table-column>
       <el-table-column
      prop="book_id"
      label="书籍Id"
      width="100">
      </el-table-column>
      <el-table-column
      prop="level"
      label="等级"
      width="100">
       </el-table-column>
  <el-table-column
      prop="create_time"
      label="create_time"
      width="100">
       </el-table-column>
        <el-table-column
      prop="updata_time"
      label="create_time"
      width="100">
       </el-table-column>
   
    <el-table-column
     
      label="操作"
      width="300">
      <template slot-scope="scope">
        <el-button type="text" @click="muiscPlay1(scope.row.url)" size="small">试听</el-button>
        <el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
        <el-button type="text" @click="downline(scope.row)">下线</el-button>
      </template>
    </el-table-column>
  </el-table>
  
  
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
       tableDataName: "",
      tableDataEnd: [],
      currentPage: 4,
      pageSize: 2,
      totalItems: 0,
      filterTableDataEnd:[],
      flag:false,
      level:'',
      question_id:'',
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
            },]
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
        this.a()
       this.totalItems = this.tableDataBegin.length;
    if (this.totalItems > this.pageSize) {
      for (let index = 0; index < this.pageSize; index++) {
        this.tableDataEnd.push(this.tableDataBegin[index]);
      }
    } else {
      this.tableDataEnd = this.tableDataBegin;
    }
        },
      methods: {
       async Batch_online(){
         await http({
        method :'post',
        url:'/api/questions/create_exercise',
        data: {
        question_bank:1
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'jwt'+' '+localStorage.getItem('access_token')
      },
        })
       },
       async downline(row){
          var arr =[]
          arr.push(row.question_id)
          var _this =this
          console.log(arr)
          await http({
        method :'post',
        url:'/api/questions/un_line_question',
        data: {
        question_bank:1,
        question_id_list:arr
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'jwt'+' '+localStorage.getItem('access_token')
      },
        })
        .then(function(result){
          if(result.code === 200){  
              _this.$router.go(0)
            alert('下线成功')
          }
        })
       
       },
        addquestion(){
          this.$router.push('/addquestion')
      },
    async a(pageIndex){
      var _this= this
      let result = await http({
        method :'get',
        url:'/api/questions/questions_list',
        params: {
        pageSize:10,
        pageIndex:pageIndex,
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
          obj.answer_describe = (result.data.result)[k].answer_describe;
          obj.answer_list = (result.data.result)[k].answer_list;
          obj.answer_style = (result.data.result)[k].answer_style;
          obj.book_id = (result.data.result)[k].book_id;
          obj.correct_answer_id = (result.data.result)[k].correct_answer_id;
          obj.create_time = (result.data.result)[k].create_time;
          obj.id = (result.data.result)[k].id;
          obj.is_online = (result.data.result)[k].is_online;
          obj.level = (result.data.result)[k].level;
          obj.question_audio_id = (result.data.result)[k].question_audio_id;
          obj.question_audio_url = (result.data.result)[k].question_audio_url;
          obj.question_describe = (result.data.result)[k].question_describe;
          obj.question_id = (result.data.result)[k].question_id;
          obj.question_image_id = (result.data.result)[k].question_image_id;
          obj.question_image_url = (result.data.result)[k].question_image_url;
          obj.question_style = (result.data.result)[k].question_style;
          obj.question_txt = (result.data.result)[k].question_txt;
          obj.question_type = (result.data.result)[k].question_type;
          obj.source= (result.data.result)[k].source;
          obj.status= (result.data.result)[k].status;
          obj.type= (result.data.result)[k].type;
          obj.updata_time= (result.data.result)[k].update_time;
          question1[k] = obj;
          //console.log(obj)
         }
        _this.question = question1;
        _this.totalItems = result.data.total
      })
      },
      async check(pageIndex){
        if(this.question_id !==''){
              var _this= this
              let result = await http({
              method :'get',
              url:'/api/questions/questions_list',
              params: {
              pageSize:10,
              pageIndex:1,
              question_bank:1,
              question_id:this.question_id,
            },
              headers: {
              'Content-Type': 'application/json',
              'Authorization':'jwt'+' '+localStorage.getItem('access_token')
            },
          })
        // 将ajax拿到的值赋值给p
            .then(function(result){
              var question1 = []
              for(var k=0;k<(result.data.result).length;k++){
              var obj = {}
              obj.answer_describe = (result.data.result)[k].answer_describe;
              obj.answer_list = (result.data.result)[k].answer_list;
              obj.answer_style = (result.data.result)[k].answer_style;
              obj.book_id = (result.data.result)[k].book_id;
              obj.correct_answer_id = (result.data.result)[k].correct_answer_id;
              obj.create_time = (result.data.result)[k].create_time;
              obj.id = (result.data.result)[k].id;
              obj.is_online = (result.data.result)[k].is_online;
              obj.level = (result.data.result)[k].level;
              obj.question_audio_id = (result.data.result)[k].question_audio_id;
              obj.question_audio_url = (result.data.result)[k].question_audio_url;
              obj.question_describe = (result.data.result)[k].question_describe;
              obj.question_id = (result.data.result)[k].question_id;
              obj.question_image_id = (result.data.result)[k].question_image_id;
              obj.question_image_url = (result.data.result)[k].question_image_url;
              obj.question_style = (result.data.result)[k].question_style;
              obj.question_txt = (result.data.result)[k].question_txt;
              obj.question_type = (result.data.result)[k].question_type;
              obj.source= (result.data.result)[k].source;
              obj.status= (result.data.result)[k].status;
              obj.type= (result.data.result)[k].type;
              obj.updata_time= (result.data.result)[k].updata_time;
              question1[k] = obj;
              console.log(obj)
            }
            _this.question = question1;
          })
        }
        if(this.level !== ''){
          var _this= this
          let result = await http({
          method :'get',
          url:'/api/questions/questions_list',
          params: {
          pageSize:10,
          pageIndex:pageIndex,
          question_bank:1,
          level:this.level,
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
              obj.answer_describe = (result.data.result)[k].answer_describe;
              obj.answer_list = (result.data.result)[k].answer_list;
              obj.answer_style = (result.data.result)[k].answer_style;
              obj.book_id = (result.data.result)[k].book_id;
              obj.correct_answer_id = (result.data.result)[k].correct_answer_id;
              obj.create_time = (result.data.result)[k].create_time;
              obj.id = (result.data.result)[k].id;
              obj.is_online = (result.data.result)[k].is_online;
              obj.level = (result.data.result)[k].level;
              obj.question_audio_id = (result.data.result)[k].question_audio_id;
              obj.question_audio_url = (result.data.result)[k].question_audio_url;
              obj.question_describe = (result.data.result)[k].question_describe;
              obj.question_id = (result.data.result)[k].question_id;
              obj.question_image_id = (result.data.result)[k].question_image_id;
              obj.question_image_url = (result.data.result)[k].question_image_url;
              obj.question_style = (result.data.result)[k].question_style;
              obj.question_txt = (result.data.result)[k].question_txt;
              obj.question_type = (result.data.result)[k].question_type;
              obj.source= (result.data.result)[k].source;
              obj.status= (result.data.result)[k].status;
              obj.type= (result.data.result)[k].type;
              obj.updata_time= (result.data.result)[k].updata_time;
              question1[k] = obj;
            }
            _this.question = question1;
            console.log(_this.question)
            _this.totalItems = result.data.total_count
            
          })
            }
        if(this.question_id !== 0 && this.level !== 0){
           var _this= this
          let result = await http({
          method :'get',
          url:'/api/questions/questions_list',
          params: {
          pageSize:10,
          pageIndex:pageIndex,
          question_bank:1,
          level:this.level,
          question_id:this.question_id,
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
              obj.answer_describe = (result.data.result)[k].answer_describe;
              obj.answer_list = (result.data.result)[k].answer_list;
              obj.answer_style = (result.data.result)[k].answer_style;
              obj.book_id = (result.data.result)[k].book_id;
              obj.correct_answer_id = (result.data.result)[k].correct_answer_id;
              obj.create_time = (result.data.result)[k].create_time;
              obj.id = (result.data.result)[k].id;
              obj.is_online = (result.data.result)[k].is_online;
              obj.level = (result.data.result)[k].level;
              obj.question_audio_id = (result.data.result)[k].question_audio_id;
              obj.question_audio_url = (result.data.result)[k].question_audio_url;
              obj.question_describe = (result.data.result)[k].question_describe;
              obj.question_id = (result.data.result)[k].question_id;
              obj.question_image_id = (result.data.result)[k].question_image_id;
              obj.question_image_url = (result.data.result)[k].question_image_url;
              obj.question_style = (result.data.result)[k].question_style;
              obj.question_txt = (result.data.result)[k].question_txt;
              obj.question_type = (result.data.result)[k].question_type;
              obj.source= (result.data.result)[k].source;
              obj.status= (result.data.result)[k].status;
              obj.type= (result.data.result)[k].type;
              obj.updata_time= (result.data.result)[k].updata_time;
              question1[k] = obj;
            }
            _this.question = question1;
            console.log(_this.question)
            _this.totalItems = result.data.total
            
          })
        }
         else{
          alert('请输入条件')
        }
      },
      muiscPlay1(r){
        this.gamemuiscs1 = new Audio(r);
         this.gamemuiscs1.play();
      },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.a(val)
      //需要判断是否检索
      //if(!this.flag){
      //this.currentChangePage(this.tableDataEnd)
     // }else{
      //this.currentChangePage(this.filterTableDataEnd)      
      //}
    }, //组件自带监控当前页码
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize;
      let to = this.currentPage * this.pageSize;
      this.tableDataEnd = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from]);
        }
      }
    },
      handleClick(row) {
          var obj = {}
          obj.answer_describe =row.answer_describe;
          obj.answer_list = row.answer_list;
          obj.answer_style = row.answer_style;
          obj.book_id = row.book_id;
          obj.correct_answer_id = row.correct_answer_id;
          obj.create_time = row.create_time;
          obj.id = row.id;
          obj.is_online = row.is_online;
          obj.level = row.level;
          obj.question_audio_id = row.question_audio_id;
          obj.question_audio_url = row.question_audio_url;
          obj.question_describe = row.question_describe;
          obj.question_id = row.question_id;
          obj.question_image_id = row.question_image_id;
          obj.question_image_url = row.question_image_url;
          obj.question_style = row.question_style;
          obj.question_txt =row.question_txt;
          obj.question_type = row.question_type;
          obj.source1 = 0;
          obj.status= row.status;

          this.$router.push({name:'questionedit',params:obj})
          this.$store.dispatch('saveInfo',this.$route.params )
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


</style>