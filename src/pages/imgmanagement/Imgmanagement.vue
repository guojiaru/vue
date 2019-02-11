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
 <el-button type="primary" @click="addimg()">添加</el-button>
 <el-button type="primary" round>保存</el-button>
  <div >
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
    :data="img"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="book_id"
      label="book_id"
      width="100">
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
      prop="image_id"
      label="image_id"
      width="100">
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
      prop="level"
      label="level"
      width="100">
    </el-table-column>
        <el-table-column
      prop="status"
      label="status"
      width="100">
    </el-table-column>
            <el-table-column
      prop="update_time"
      label="update_time"
      width="100">
    </el-table-column>
    <el-table-column
      prop="url"
      label="url"
      width="150">
       <template slot-scope="scope">
        <img :src='scope.row.url' alt="" style="width:50px;height:50px">
      </template>
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
        level: '',
           selectList:[
          {id:1,name:'选择题'},
          {id:2,name:'填空题'},
        ],
      form: {
        region: "选择题"
      },
        img:[],
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
      handleClick(row) {
        console.log(row)
          var obj = {}
          obj.book_id = row.book_id;
          obj.create_time = row.create_time;
          obj.describe = row.describe;
          obj.id = row.id;
          obj.image_id = row.image_id;
          obj.is_online = row.is_online;
          obj.status = row.status;
          obj.level = row.level;
          obj.update_time = row.update_time;
          obj.url = row.url;
          obj.source = 5;
         this.$router.push({name:'imageedit',params:obj})
          this.$store.dispatch('editImg',this.$route.params )
          console.log( this.$store.state.editImg)
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
      async check(){
        if(this.level !== ''){
         var _this= this
          let result = await http({
          method :'get',
          url:'/api/questions/get_image_list',
          params: {
          question_bank:1,
          level:this.level  
        },
        headers: {
        'Content-Type': 'application/json',
        'Authorization':'jwt'+' '+localStorage.getItem('access_token')
        },
        })
        // 将ajax拿到的值赋值给
        .then(function(result){
            console.log(result.data)
            var img1 = []
              for(var k=0;k<(result.data.result).length;k++){
              var obj = {}
              obj.book_id = (result.data.result)[k].book_id;
              obj.create_time = (result.data.result)[k].create_time;
              obj.id = (result.data.result)[k].id;
              obj.describe = (result.data.result)[k].describe;
              obj.image_id = (result.data.result)[k].image_id;
              obj.is_online = (result.data.result)[k].is_online;
              obj.level = (result.data.result)[k].level;
              obj.status = (result.data.result)[k].status;
              obj.update_time = (result.data.result)[k].update_time;
              obj.url = (result.data.result)[k].url;
              img1[k] = obj;
              //console.log(obj)
            }
            _this.img = img1;
            })
        }
            else{
              alert('请输入条件')
            }
        },
      async a(pageIndex){
      var _this= this
      let result = await http({
      method :'get',
      url:'/api/questions/get_image_list',
      params: {
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
         var img1 = []
        for(var k=0;k<(result.data.result).length;k++){
          var obj = {}
          obj.book_id = (result.data.result)[k].book_id;
          obj.create_time = (result.data.result)[k].create_time;
          obj.id = (result.data.result)[k].id;
          obj.describe = (result.data.result)[k].describe;
          obj.image_id = (result.data.result)[k].image_id;
          obj.is_online = (result.data.result)[k].is_online;
          obj.level = (result.data.result)[k].level;
          obj.status = (result.data.result)[k].status;
          obj.update_time = (result.data.result)[k].update_time;
          obj.url = (result.data.result)[k].url;
          img1[k] = obj;
          //console.log(obj)
         }
        _this.img = img1;
        console.log(_this.img)
        console.log(_this.$store.state.imgList)
          _this.totalItems = result.data.total_count
      })    

        },
      deleteRow(index, rows) {
        rows.splice(index, 1);
        console.log(rows)
        this.$store.dispatch('imgList',rows ); 
        console.log(this.$store.state.imgList)
      },
      addimg(){
          this.$router.push({name:'addimg',params:this.$store.state.imgList})
      },
      async isonline(row) {
        var _this = this
        let result = await http({
        method :'post',
        url:'/api/questions/edit_image',
        data: {
        question_bank:1,
        is_online: 0,
	      image_id: row.image_id,
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
       var _this = this
        let result = await http({
        method :'post',
        url:'/api/questions/edit_image',
        data: {
        question_bank:1,
        is_online: 1,
	      image_id: row.image_id,
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
        },
      }
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