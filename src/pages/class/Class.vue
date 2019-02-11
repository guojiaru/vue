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
 <div class="block">
    <el-date-picker
      v-model="value7"
      type="daterange"
      style="width:30%;height:100%;float:left"
      unlink-panels
      overflow-y:scroll
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions2"
      @change="formatTime" 
      value-format="yyyyMMdd">
    </el-date-picker>

    <el-form ref="form" :model="form" style="width:20%;height:100%;float:left;margin-left:4%;">
      <el-form-item label="" style="width:100%;height:100%;float:left;">
        <el-select @change="selectGet" v-model="form.region" placeholder="设备端">
          <el-option 
            v-for="item in selectList" 
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
     <el-button plain @click="a()"  style="width:5%;height:100%;float:left;margin-left:3%;">查询</el-button>
      <el-button plain @click="c()"  style="width:5%;height:100%;float:left;margin-left:3%;">导出</el-button>
      <div  style="width:5%;height:40px;line-height:40px;text-align:'center';float:left;margin-left:3%;">{{ message }}</div>
         <el-button plain @click="go('log')"  style="width:5%;height:100%;float:left;margin-left:3%;">退出</el-button>
  </div>
        <el-table  align="center"   class="tb-edit" highlight-current-row  height='100%'  :data="tableData" style="width: 100%; ">

            <template v-for="(col ,index) in cols">
                <el-table-column  align="center"  :prop="col.prop" :label="col.label"></el-table-column>
               
            </template>
        </el-table>
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
        datamap:{10:'https://www.baidu.com'},
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
      form: {
        region: "设备端"
      },
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

  // 生命周期钩子
   created(){
let token=localStorage.getItem('access_token')
            this.b(token)
      
        },
      methods: {
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
      fn(){
        alert("1")
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


</style>