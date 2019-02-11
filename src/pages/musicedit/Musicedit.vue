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
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalItems">
               </el-pagination>
   <el-input v-model="book_id"></el-input>
   <el-button type="primary" @click='check()'>按bookid搜索</el-button>
       <el-input v-model="level"></el-input>
   <el-button type="primary" @click='check1()'>按level搜索</el-button>
                     <el-table
      :data="music"
      style="width: 100%">
      <el-table-column
        prop="audio_id"
        label="音频ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="book_id"
        label="书籍ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="level"
        label="等级"
        width="100">
      </el-table-column>
      <el-table-column
        prop="url"
        label="路径"
        width="400">
      </el-table-column>
     
      <el-table-column
      
      label="操作"
      width="100">
      <template slot-scope="scope">
       <el-button type="text" @click="handleClick(scope.row)" size="small">选择</el-button>
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
        book_id:'',
        level:'',
           qt:this.$route.query.qt,
         qid:this.$route.query.qid,
          bid:this.$route.query.bid,
         ab:this.$route.query.ab,
          level:this.$route.query.level,
          qi:this.$route.query.qi,
           qiurl:this.$route.query.qiurl,
          qa:this.$route.query.qa,
        datamap:{
          9:'https://www.baidu.com',
          11:'https://www.baidu.com'},
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
  music: [],
  audio:[],
   audio1:[],

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
        this.a()
      
        },
      methods: {
   async check(){
      var _this= this
      let result = await http({
      method :'get',
      url:'/api/questions/get_audio_list',
      params: {
      question_bank:1,
     book_id:this.book_id
     },
    headers: {
    'Content-Type': 'application/json',
    'Authorization':'jwt'+' '+localStorage.getItem('access_token')
     },
    })
    // 将ajax拿到的值赋值给p
     .then(function(result){
        console.log(result)
         var audio1 = []
        for(var k=0;k<(result.data.result).length;k++){
          var obj = {}
          obj.audio_id = (result.data.result)[k].audio_id;
          obj.book_id = (result.data.result)[k].book_id;
          obj.create_time = (result.data.result)[k].create_time;
          obj.describe = (result.data.result)[k].describe;
          obj.id = (result.data.result)[k].id;
          obj.is_online = (result.data.result)[k].is_online;
          obj.level = (result.data.result)[k].level;
          obj.status = (result.data.result)[k].status;
          obj.update_time = (result.data.result)[k].update_time;
          obj.url = (result.data.result)[k].url;
          audio1[k] = obj;
         }
        _this.music = audio1;
      })
      },
        async check1(){
      var _this= this
      let result = await http({
      method :'get',
      url:'/api/questions/get_audio_list',
      params: {
      question_bank:1,
     level:this.level
     },
    headers: {
    'Content-Type': 'application/json',
    'Authorization':'jwt'+' '+localStorage.getItem('access_token')
     },
    })
    // 将ajax拿到的值赋值给p
     .then(function(result){
        console.log(result)
         var audio1 = []
        for(var k=0;k<(result.data.result).length;k++){
          var obj = {}
          obj.audio_id = (result.data.result)[k].audio_id;
          obj.book_id = (result.data.result)[k].book_id;
          obj.create_time = (result.data.result)[k].create_time;
          obj.describe = (result.data.result)[k].describe;
          obj.id = (result.data.result)[k].id;
          obj.is_online = (result.data.result)[k].is_online;
          obj.level = (result.data.result)[k].level;
          obj.status = (result.data.result)[k].status;
          obj.update_time = (result.data.result)[k].update_time;
          obj.url = (result.data.result)[k].url;
          audio1[k] = obj;
          console.log(obj)
         }
        _this.music = audio1;
      })
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
            console.log(row)
          this.$store.state.saveInfo.question_audio_id = row.audio_id
            this.$store.state.editAnswer.audio_id = row.audio_id
           this.$store.state.answerList.audio_id = row.audio_id
          this.$store.state.saveInfo.question_audio_url = row.url
           this.$store.state.questionList.question_audio_id = row.audio_id
           this.$store.state.editAudio.audio_id = row.audio_id
           this.$store.state.editAudio.url = row.url
           this.$store.state.editInfo.question_audio_id = row.audio_id
          this.$store.state.editInfo.question_audio_url = row.url
          this.$store.dispatch('saveInfo',this.$store.state.saveInfo)
          this.$store.dispatch('answerList',this.$store.state.answerList)
            this.$store.dispatch('questionList',this.$store.state.questionList)
             this.$store.dispatch('editAnswer',this.$store.state.editAnswer)
               this.$store.dispatch('editAudio',this.$store.state.editAudio)
                this.$store.dispatch('editInfo',this.$store.state.editInfo)
           if(this.$store.state.answerList.source === 1){
             this.$router.push({name:'addanswer',params:this.$store.state.answerList}) 
           }
            if(this.$store.state.questionList.source === 2){
            this.$router.push({name:'addquestion',params:this.$store.state.questionList}) 
            console.log(this.$store.state.questionList)
          } 
          if(this.$store.state.editAudio.source === 6){
            this.$router.push({name:'audioedit',params:this.$store.state.editAudio}) 
            console.log(this.$store.state.editAudio)
          } 
           if(this.$store.state.editAnswer.source === 4){
            this.$router.push({name:'answeredit',params:this.$store.state.editAnswer}) 
            console.log(this.$store.state.editAnswer)
          } 
          if(this.$store.state.saveInfo.source1 === 0){
            this.$router.push({name:'questionedit',params:this.$store.state.saveInfo})
            console.log(this.$store.state.questionList)
          } 
           if(this.$store.state.editInfo.source1 === 7){
            this.$router.push({name:'addquestion',params:this.$store.state.editInfo})
           console.log(this.$store.state.editInfo)
          } 
          
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
      async a(pageIndex){
          var _this= this
       let result = await http({
      method :'get',
      url:'/api/questions/get_audio_list',
      params: {
     question_bank:1,
        pageSize:10,
     pageIndex:pageIndex,
    },
    headers: {
    'Content-Type': 'application/json',
    'Authorization':'jwt'+' '+localStorage.getItem('access_token')
  },
    })
    // 将ajax拿到的值赋值给p

      .then(function(result){
        let p=result.data.result
    console.log(p)
 var music1 = []
        for(var k=0;k<(result.data.result).length;k++){
         var obj = {}
          obj.audio_id = (result.data.result)[k].audio_id;
          obj.book_id = (result.data.result)[k].book_id;
          obj.level = (result.data.result)[k].level;
          obj.url = (result.data.result)[k].url;
          obj.img = (result.data.result)[k].url;
          music1[k] = obj;
          console.log(obj)}
        _this.music= music1;
          _this.totalItems = result.data.total_count
     

      })
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