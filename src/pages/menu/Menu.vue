<template>
<el-container>
  <el-header>
    <div>儿童内容CMS后台</div>
    <div><el-button type="text">更新日志记录</el-button></div>
    <div>你好，</div>
  </el-header>
  <el-container>
    <el-aside width="200px">
        <el-input
            height="40px"
            placeholder="输入关键字进行过滤"
            v-model="filterText">
        </el-input>

        <el-tree
          class="filter-tree"
          :data="data2"
          :props="defaultProps"
          default-expand-all
           @node-click="handleNodeClick"
          :filter-node-method="filterNode"
          ref="tree2">
        </el-tree>
    </el-aside>
    <el-main>
    <el-row :gutter="20">
      <el-col :span="4">
          <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="query">
                <el-input v-model="form.query" ></el-input>
              </el-form-item>
          </el-form>
      </el-col>
      <el-col :span="5">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="身份">
            <el-select v-model="form.region" >
              <el-option label="无限制" value="no"></el-option>
              <el-option label="家长" value="parents"></el-option>
              <el-option label="儿童" value="children"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="mid">
              <el-input v-model="form.mid"></el-input>
            </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-form ref="form" :model="form" label-width="100px">
           <el-form-item label="客户端版本号">
             <el-input v-model="form.custom"></el-input>
           </el-form-item>
        </el-form>
     </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
             <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="年龄段">
                <el-select v-model="form.age" >
                  <el-option label="无限制" value="noage"></el-option>
                  <el-option label="0-6岁" value="six"></el-option>
                  <el-option label="7-12岁" value="twelve"></el-option>
                </el-select>
              </el-form-item>
          </el-form>
      </el-col>
      <el-col :span="4">
             <el-form ref="form" :model="form" label-width="80px">
               <el-form-item label="生效周期">
               <el-select v-model="form.cicle" >
                  <el-option label="无限" value="nocicle"></el-option>
                  <el-option label="工作日" value="week"></el-option>
                  <el-option label="周末" value="weeend"></el-option>
                  <el-option label="自定义" value="own"></el-option>
               </el-select>
              </el-form-item>
            </el-form>
      </el-col>
     <el-col :span="7">
                <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="推送时间段">
            <el-select v-model="form.time" >
              <el-option label="早晨07:00:00-08:59:59" value="morning"></el-option>
              <el-option label="其他09:00:00-17:59:59" value="other"></el-option>
              <el-option label="晚上18:00:00-20:29:59" value="night"></el-option>
              <el-option label="睡前20:30:00-21:59:59" value="own"></el-option>
            </el-select>
        </el-form-item>   
    </el-form>
    </el-col>
    </el-row>
    <el-button type="primary" style="height:50px;float:left">搜索</el-button>
    <el-button type="primary" style="height:50px;float:left">新建串内容</el-button>
    <el-table
    :data="tableData"
    border
    @selection-change="changeFun"
     height="450"
    style="width: 100%;">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column
            fixed
            prop="date"
            label="日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            width="120">
          </el-table-column>
          <el-table-column
            prop="city"
            label="市区"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            width="300">
          </el-table-column>
          <el-table-column
            prop="zip"
            label="邮编"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
    </el-table>
    <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalItems">
     </el-pagination>

    </el-main>
  </el-container>
</el-container>
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
     //树形控件数据
      filterText: '',
        data2: [{
          id: 1,
          label: '菜单管理',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '内容管理',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '串内容管理',
          children: [{
            id: 7,
            label: '串内容菜单管理'
          }, {
            id: 8,
            label: '串内容物料管理'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },  
        //表单数据
       form: {
          query: '',
          region: '儿童',
          mid:'',
          custom:'1.3版本',
          age:'0-6岁',
          cicle:'不限',
          time:'早晨07:00:00-08:59:59'
        },
        //表格数据
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },],
        currentPage:1,
        pageSize:1,
        totalItems:1,
        checkBoxData: [],
    }
  },
    watch: {
      //树形控件过滤
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

  // 子组件集合
  components: {
   
  },

  // 生命周期钩子
   created(){
       
  },
   methods: {
    //树形控件
     filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
        },
    //表格
       handleClick(row) {
        console.log(row);
      },
    //获取多选框的值
     changeFun(val) {
            this.checkBoxData = val;
            console.log(this.checkBoxData)
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
        console.log(id)
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
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #fff;
    //text-align: center;
    line-height: 60px;
  }
 .el-header>div {
   float:left
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
.el-row {
    margin-bottom: 5px;
    height:62px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 0px 0;
    background-color: #f9fafc;
  }

</style>