// 引入vue
import Vue from 'vue'
// 引入vue路由插件
import VueRouter from 'vue-router'
// 使用路由
Vue.use(VueRouter)

// 导入组件
import Movies from 'pages/movies/Movie'
import Class from 'pages/class/Class'
import Log from 'pages/log/Log'
import Profile from 'pages/profile/Profile'
import Questionedit from 'pages/questionedit/Questionedit'
import Answeredit from 'pages/answeredit/Answeredit'
import Audioedit from 'pages/audioedit/Audioedit'
import Questionedit1 from 'pages/questionedit1/Questionedit1'
import Imgedit from 'pages/imgedit/Imgedit'
import Imageedit from 'pages/imageedit/Imageedit'
import Answermanagement from 'pages/answermanagement/Answermanagement'
import Imgmanagement from 'pages/imgmanagement/Imgmanagement'
import Audiomanagement from 'pages/audiomanagement/Audiomanagement'
import Imgedit1 from 'pages/imgedit1/Imgedit1'
import Musicedit from 'pages/musicedit/Musicedit'
import Musicedit1 from 'pages/musicedit1/Musicedit1'
import Addimg from 'pages/addimg/Addimg'
import Addaudio from 'pages/addaudio/Addaudio'
import Addanswer from 'pages/addanswer/Addanswer'
import Addquestion from 'pages/addquestion/Addquestion'
import Answera from 'pages/answera/Answera'
import Page1 from 'pages/class/Page1'
import Page2  from 'pages/class/Page2'
import Page3  from 'pages/class/Page3'
import Add  from 'pages/add/Add'
import Menu  from 'pages/menu/Menu'
import Addmenu  from 'pages/addmenu/Addmenu'
// 定义路由
const routes = [
    {
        path: '/',
        redirect:'/log'
    },
    {
        name: 'movies',
        path:'/movies',
        component:Movies,
        meta: 1
    },
    {
        name: 'class',
        path:'/class',
        component:Class,
        meta: 2
    },
    {
        name: 'questionedit',
        path:'/questionedit',
        component:  Questionedit,
    },
    {
        name: 'questionedit1',
        path:'/questionedit1',
        component:  Questionedit1,
    },
    {
        name: 'imgedit',
        path:'/imgedit',
        component:  Imgedit,
    },
    {
        name: 'add',
        path:'/add',
        component:  Add,
    },
    {
        name: 'answera',
        path:'/answera',
        component:  Answera,
    },
    {
        name: 'musicedit',
        path:'/musicedit',
        component:  Musicedit,
    },
    {
        name: 'musicedit1',
        path:'/musicedit1',
        component:  Musicedit1,
    },
    {
        name: 'page1',
        path:'/page1',
        component:Page1,
    },
    {
        name: 'page2',
        path:'/page2',
        component:Page2,
    },
    {
        name: 'page3',
        path:'/page3',
        component:Page3,
    },
    {
        name: 'log',
        path:'/log',
        component:Log,
        meta :3
    },
    {
        name: 'profile',
        path:'/profile',
        component:Profile,
        meta:4
    },
    {
        name: 'answermanagement',
        path:'/answermanagement',
        component:Answermanagement,
        meta:4
    },
    {
        name: 'imgmanagement',
        path:'/imgmanagement',
        component:Imgmanagement,
        meta:4
    },
    {
        name: 'audiomanagement',
        path:'/audiomanagement',
        component:Audiomanagement,
        meta:4
    },
   {
        name: 'addimg',
        path:'/addimg',
        component:Addimg,
        meta:4
    }, 
    {
        name: 'addaudio',
        path:'/addaudio',
        component:Addaudio,
        meta:4
    },
    {
        name: 'addanswer',
        path:'/addanswer',
        component:Addanswer,
        meta:4
    },  
    {
        name: 'addquestion',
        path:'/addquestion',
        component:Addquestion,
        meta:4
    },  
    {
        name: 'answeredit',
        path:'/answeredit',
        component:Answeredit,
        meta:4
    }, 
    {
        name: 'imageedit',
        path:'/imageedit',
        component:Imageedit,
        meta:4
    }, 
    {
        name: 'audioedit',
        path:'/audioedit',
        component:Audioedit,
        meta:4
    }, 
    {
         name:'menu',
         path:'/menu',
         component:Menu
    },
    {
        name:'addmenu',
        path:'/addmenu',
        component:Addmenu
   },

]

// 实例化路由对象
const router = new VueRouter({
    mode:'history',
    routes
})

// 导出模块
export default router
