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
              <div  class="main-right"  style="width:85%;height:100%;float:left;margin-top:2%">
                <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="book_id">
                    <el-input v-model="form.book_id"></el-input>
                </el-form-item>
                <el-form-item label="describe">
                    <el-input v-model="form.describe"></el-input>
                </el-form-item>
                <el-form-item label="level">
                    <el-input v-model="form.level"></el-input>
                </el-form-item>
                <el-upload
                    class="avatar-uploader"
                    action="http://10.100.38.81:80/api/commons/upload"
                    :show-file-list="false"
                    :headers="headers"
                    :on-success="handleAvatarSuccess">
                    <i  class="el-icon-plus avatar-uploader-icon">请选择音频</i>
                   
                </el-upload>
                <el-form-item label="audioUrl1">
                    <el-input v-model="audioUrl1"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
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
           audioUrl: '',
           audioUrl1:'',
         form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                book_id: "",
                create_time: "",
                describe: "",
                id: '',
                audio_id: "",
                is_online: '',
                level: '',
                status: '',
                update_time: "",
                url: "",
                },
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
        selectList:[
                {id:1,name:'设备端'},
                {id:2,name:'移动端'},
                ],
   
        radio: '1',
        cols: [],
            tableData: [
            ],
            pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
         value7:[new Date(new Date(new Date().toLocaleDateString()).getTime()-24*60*60*1000*15),new Date(new Date().toLocaleDateString())],

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
 computed:{
    headers(){
      return {
        'Authorization':'jwt'+' '+localStorage.getItem('access_token')
      } 
    }
  },

  // 生命周期钩子
   created(){
            let token=localStorage.getItem('access_token')
            this.b(token)
      
        },
      methods: {
      handleAvatarSuccess(res, file) {
        this.audioUrl = URL.createObjectURL(file.raw);
        console.log(this.imgUrl)
        this.audioUrl1 = res.data
        console.log(this.audioUrl1)

      },
      muiscPlay1(r){
          alert(1)
        console.log(r)
        this.gamemuiscs1 = new Audio(r);
        this.gamemuiscs1.play();
      },

     go(log){
        this.$router.push(log),
        localStorage.clear()
      },
      async onSubmit() {
        var obj = {}
        obj.book_id  = this.form.book_id;
        obj.describe  = this.form.describe;
        obj.level  = this.form.level;
        obj.url  = this.audioUrl1;
        let result = await http({
          method :'post',
          url:'api/questions/add_audio',
          data: {
            book_id: obj.book_id,
            describe: obj.describe,
            level: obj.level,
            url:obj.url,
            question_bank:1
        },
        headers: {
        'Content-Type': 'application/json',
        'Authorization':'jwt'+' '+localStorage.getItem('access_token')
      },
    })
    console.log(this.$store.state.imgList)
      this.$router.push('/audiomanagement')
     console.log(this.$store.state.imgList)
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
      async a(){
       let result = await http({
      method :'get',
      url:'/api/report/get_table',
      params: {
      begin_time: this.value7[0],
      end_time :this.value7[1],
      platform: this.id,
    },
    headers: {
    'Content-Type': 'application/json',
    'Authorization':'jwt'+' '+localStorage.getItem('access_token')
  },
    })
    // 将ajax拿到的值赋值给p
   this.p=result
    this.cols=this.p.data.cols
     this.tableData=this.p.data.tableData
      },
         async b(token){
            var data =new Date(new Date().toLocaleDateString());
      let data1 =new Date(new Date().toLocaleDateString()).getTime()-24*60*60*1000*15;
      var data2 = new Date(data1)

       let  Y = data.getFullYear() ;
       let  M = (data.getMonth()+1 < 10 ? '0'+(data.getMonth()+1) : data.getMonth()+1);
       let D = (data.getDate()<10 ? '0'+data.getDate():data.getDate());
         let  Y1 = data2.getFullYear() ;
       let  M1= (data2.getMonth()+1 < 10 ? '0'+(data2.getMonth()+1) : data2.getMonth()+1);
       let D1 = (data2.getDate()<10 ? '0'+data2.getDate():data2.getDate());
 
       let result = await http({
      method :'get',
      url:'/api/report/get_table',
       headers: {
    'Content-Type': 'application/json',
    'Authorization':'jwt'+' '+token
  },
      params: {
      begin_time:Y1+M1+D1,
      end_time :Y+M+D,
      platform:1,
    }
    })
    // 将ajax拿到的值赋值给p
   this.p=result
    this.cols=this.p.data.cols
     this.tableData=this.p.data.tableData
         },
              async c(){
       let result = await http({
      method :'get',
      url:'/api/report/download',
      params: {
      begin_time: this.value7[0],
      end_time :this.value7[1],
      platform: this.id,
    },
    headers: {
    'Content-Type': 'application/json',
    'Authorization':'jwt'+'p'+localStorage.getItem('access_token')
  },
    })
    // 将ajax拿到的值赋值给p
   this.p=result
    this.cols=this.p.data.cols
     this.tableData=this.p.data.tableData
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