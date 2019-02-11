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
                     <el-table
      :data="img"
      style="width: 100%">
      <el-table-column
        prop="image_id"
        label="图片ID"
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
       <el-button type="text" @click="handleClick(scope.row,add)" size="small">选择</el-button>
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
  img: [],

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
      
        },
      methods: {
          handleClick(row,add) {
          console.log(row)
          localStorage.setItem('addqid',row.url)
           this.$router.push('/add')

          
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
      url:'/api/questions/get_image_list',
      params: {
    
     question_bank:1,
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
 var img1 = []
        for(var k=0;k<(result.data.result).length;k++){
         var obj = {}
          obj.image_id = (result.data.result)[k].image_id;
          obj.book_id = (result.data.result)[k].book_id;
          obj.level = (result.data.result)[k].level;
          obj.url = (result.data.result)[k].url;
          obj.img = (result.data.result)[k].url;
          img1[k] = obj;
          console.log(obj)}
        _this.img= img1;
     

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


</style>