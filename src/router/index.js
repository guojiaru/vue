// 引入vue
import Vue from 'vue'
// 引入vue路由插件
import VueRouter from 'vue-router'
// 使用路由
Vue.use(VueRouter)

// 导入组件
import Movies from 'pages/movies/Movie'
import Class from 'pages/class/Class'
import Foot from 'pages/foot/Foot'
import Profile from 'pages/profile/Profile'
import N1 from 'pages/movies/N1'
import N2 from 'pages/movies/N2'
import People from 'pages/movies/People'
import Money from 'pages/movies/Money'
import Mo from 'pages/movies/Mo'
import Page1 from 'pages/class/Page1'
import Page2  from 'pages/class/Page2'
import Page3  from 'pages/class/Page3'

// 定义路由
const routes = [
    {
        path: '/',
        redirect:'/movies'
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
        name: 'foot',
        path:'/foot',
        component:Foot,
        meta :3
    },
    {
        name: 'profile',
        path:'/profile',
        component:Profile,
        meta:4
    },
    {
        name: 'n1',
        path:'/n1',
        component:N1,
    },
    {
        name: 'n2',
        path:'/n2',
        component:N2,
        children:[
            {
                name: 'people',
                path:'/people',
                component:People,
            },
            {
                name: 'money',
                path:'/money',
                component:Money,
            },
            {
                name: 'mo',
                path:'/mo',
                component:Mo,
            },
            {
                path: '/',
                redirect:'/mo'
            },
        ]
    }
]

// 实例化路由对象
const router = new VueRouter({
    mode:'history',
    routes
})

// 导出模块
export default router
