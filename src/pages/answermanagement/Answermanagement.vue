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
    <el-button type="primary"  @click="addanswer()">添加</el-button>
    <el-button type="primary" round>保存</el-button>
    <div >
        <div style="width:70px;height:40px;float:left;margin_right:5px;line_height:40px;text_align:'center'">describe:</div><el-input v-model="describe" style="width:100px;float:left;margin_right:5px;"></el-input>
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
    :data="answer"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="answer_id"
      label="answer_id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="audio"
      label="audio"
      width="150">
      <template slot-scope="scope">
        <el-button @click="muiscPlay1(scope.row.audio_url)"  type="text" size="small">试听</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="create_time"
      width="100">
    </el-table-column>
    <el-table-column
      prop="describe"
      label="describe"
      width="100">
    </el-table-column>
    <el-table-column
      prop="id"
      label="id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="image"
      label="image_url"
      width="150">
      <template slot-scope="scope">
        <img :src='scope.row.image_url' alt="" style="width:50px;height:50px">
      </template>
    </el-table-column>
    <el-table-column
      prop="is_online"
      label="上下线状态"
      width="100">
       <template slot-scope="scope">
       <div v-if="scope.row.is_online === 0 ">
        下线
      </div>
       <div v-if="scope.row.is_online === 1 ">
        上线
      </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="status"
      width="100">
    </el-table-column>
    <el-table-column
      prop="txt"
      label="txt"
      width="100">
    </el-table-column>
    <el-table-column
      prop="update_time"
      label="update_time"
      width="100">
    </el-table-column>
    <el-table-column

      label="操作"
      width="100">
      <template slot-scope="scope">
         <el-button type="text" size="small" @click="ononline(scope.row)">上线</el-button>
         <el-button type="text" size="small" @click="isonline(scope.row)">下线</el-button>
        <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
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
           
          describe:'',
           selectList:[
          {id:1,name:'选择题'},
          {id:2,name:'填空题'},
        ],
      form: {
        region: "选择题"
      },
        answer:[],
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
      async  check(){
        if(this.describe !== ''){
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

        }
        else{
          alert('请输入条件')
        }
   
        },
      async isonline(row) {
        var _this = this
        let result = await http({
        method :'post',
        url:'/api/questions/edit_answer',
        data: {
        question_bank:1,
        is_online: 0,
	      answer_id: row.answer_id,
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
     async ononline(row) {
        console.log(row);
        var _this =this
        let result = await http({
        method :'post',
        url:'/api/questions/edit_answer',
        data: {
        question_bank:1,
        is_online: 1,
	      answer_id: row.answer_id,
      },
      headers: {
      'Content-Type': 'application/json',
      'Authorization':'jwt'+' '+localStorage.getItem('access_token')
      },
      })
      
          .then(function(result){
          if(result.code === 200){  
             alert('上线成功')
              _this.$router.go(0)
          }
        })
      },
       deleteRow(index, answer) {
        answer.splice(index, 1);
        console.log(answer)
        this.$store.dispatch('answerList',answer ); 
        console.log(this.$store.state.answerList)
      },
      addanswer(){
          this.$router.push('/addanswer')
      },
      async a(pageIndex){
      var _this= this
      let result = await http({
      method :'post',
      url:'/api/questions/get_answer_list',
     data: {
      question_bank:1,
       pageIndex:pageIndex,
       pageSize:10,
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
          obj.image_id = (result.data.result)[k].image_id;
          obj.audio_id = (result.data.result)[k].audio_id;
          obj.audio_url = (result.data.result)[k].audio_url;
          obj.create_time = (result.data.result)[k].create_time;
          obj.describe = (result.data.result)[k].describe;
          obj.id = (result.data.result)[k].id;
          obj.image_url = (result.data.result)[k].image;
          obj.is_online = (result.data.result)[k].is_online;
          obj.status = (result.data.result)[k].status;
          obj.txt = (result.data.result)[k].txt;
          obj.update_time = (result.data.result)[k].update_time;
          answer1[k] = obj;
          console.log(obj)
         }
        _this.answer = answer1;
        _this.totalItems = result.data.total_count
    

      })
     
      },
    muiscPlay1(r){
        
        this.gamemuiscs1 = new Audio(r);
        this.gamemuiscs1.play();
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
      handleClick(row) {
        console.log(row)
          var obj = {}
          obj.answer_id = row.answer_id;
          obj.image_id = row.image_id;
          obj.audio_id = row.audio_id;
          obj.audio_url = row.audio_url;
          obj.create_time = row.create_time;
          obj.describe = row.describe;
          obj.id = row.id;
          obj.image = row.image_url;
          obj.is_online = row.is_online;
          obj.status = row.status;
          obj.txt = row.txt;
          obj.update_time = row.update_time;
          obj.source = 4;
         this.$router.push({name:'answeredit',params:obj})
          this.$store.dispatch('editAnswer',this.$route.params )
        

        
          


  
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