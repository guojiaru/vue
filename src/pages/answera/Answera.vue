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
               <el-input v-model="describe"></el-input>
                 <el-button type="primary" @click='check()'>按describe搜索</el-button>
   <el-button type="primary"  @click="addanswer()">添加</el-button>
                     <el-table
      :data="answer"
      style="width: 100%">
      <el-table-column
        prop="answer_id"
        label="题目ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="image"
        label="图片"
        width="400">
         <template slot-scope="scope">
        <img :src='scope.row.image' alt="" style="width:50px;height:50px">
      </template>
      </el-table-column>
      <el-table-column
        prop="audio"
        label="音频"
        width="400">
         <template slot-scope="scope">
        <el-button type="text" @click="muiscPlay1(scope.row.audio)" size="small">试听</el-button>
      </template>
      </el-table-column>
      <el-table-column
        prop="txt"
        label="文字"
        width="100">
      </el-table-column>

     
      <el-table-column
      
      label="操作"
      width="100">
      <template slot-scope="scope">
       <el-button type="text" @click="addUser(scope.$index,scope.row)" size="small">选择</el-button>
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
           tableData:this.$route.query.tableData,
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
  answer: [],
        
         qt:this.$route.query.qt,
         qid:this.$route.query.qid,
          bid:this.$route.query.bid,
         ab:this.$route.query.ab,
          level:this.$route.query.level,
          qi:this.$route.query.qi,
           qiurl:this.$route.query.qiurl,
          qa:this.$route.query.qa,

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
    async  check(){
      var _this= this
      let result = await http({
      method :'post',
      url:'/api/questions/get_answer_list',
     data: {
      question_bank:1,
      describe:this.describe

    },
    headers: {
    'Content-Type': 'application/json',
    'Authorization':'jwt'+' '+localStorage.getItem('access_token')
     },
    })
    // 将ajax拿到的值赋值给p
  
     .then(function(result){
        console.log(result)
           var answer1 = []
          for(var k=0;k<(result.data.result).length;k++){
          var obj = {}
          obj.answer_id = (result.data.result)[k].answer_id;
          obj.audio = (result.data.result)[k].audio;
          obj.create_time = (result.data.result)[k].create_time;
          obj.describe = (result.data.result)[k].describe;
          obj.id = (result.data.result)[k].id;
          obj.image = (result.data.result)[k].image;
          obj.is_online = (result.data.result)[k].is_online;
          obj.status = (result.data.result)[k].status;
          obj.txt = (result.data.result)[k].txt;
          obj.update_time = (result.data.result)[k].update_time;
          answer1[k] = obj;
          console.log(obj)
         }
        _this.answer = answer1;
    

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
   async a(pageIndex){
     var _this= this
     let result = await http({
     method :'post',
     url:'/api/questions/get_answer_list',
     data: {
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
      var answer1 = []
        for(var k=0;k<(result.data.result).length;k++){
         var obj = {}
          obj.audio = (result.data.result)[k].audio;
          obj.image = (result.data.result)[k].image;
          obj.txt = (result.data.result)[k].txt;
          obj.answer_id = (result.data.result)[k].answer_id;
          answer1[k] = obj;
          console.log(obj)}
        _this.answer= answer1;
        _this.totalItems = result.data.total
     

      })
      },
    muiscPlay1(r){
        console.log(r)
        this.gamemuiscs1 = new Audio(r);
        this.gamemuiscs1.play();
      },
    addUser(index,w){
        //console.log(w.answer_id)
         
        // console.log(this.$store.state.editInfo)
         
         //console.log(this.$store.state.editInfo.answer_list)
         
         
         if(this.$store.state.editInfo.source1 === 7){
           let answer_list1= this.$store.state.editInfo.answer_list.push(w)
           this.$store.state.editInfo.answer_list = this.$store.state.editInfo.answer_list
        
         this.$store.dispatch('editInfo',this.$store.state.editInfo)
         this.$router.push({name:'addquestion',params:this.$store.state.editInfo})   
         }
         if(this.$store.state.saveInfo.source1 === 0){
         let answer_list= this.$store.state.saveInfo.answer_list.push(w)
         this.$store.state.saveInfo.answer_list = this.$store.state.saveInfo.answer_list
          this.$store.dispatch('saveInfo',this.$store.state.saveInfo)
         this.$router.push({name:'questionedit',params:this.$store.state.saveInfo})    
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