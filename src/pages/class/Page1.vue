<template>
<div>
<Head></Head>
    <ul>
        <li>所有餐饮项目</li>
        <router-link to="/n2" tag="li">中餐</router-link>
        <li>西餐</li>
        <li>快餐</li>
        <li>小吃</li>
        <li>甜品</li>
        <li>咖啡店</li>
        <li>茶馆</li>
        <li>日韩料理</li>
        <li>烧烤</li>
        <li>饮品</li>
        <li>面包蛋糕店</li>
        <li>混沌</li>
        <li>拉面</li>
        <li>米线</li>
        <li>熟食</li>
        <li>其他</li>
        <li>汉堡</li>
        <li>奶茶</li>
        <li>冰激凌</li>
        <li>烘焙</li>
        <li>鸡排</li>
        <li>冒菜</li>
        <li>麻辣烫</li>
        <li>肉蟹堡</li>
        <li>燜锅</li>
        <li>中式快餐</li>
        <li>寿司</li>
        <li>烤鱼</li>
        <li>牛排</li>
        <li>披萨</li>
        <li>串串香</li>
        <li>鱼</li>
        <li>酸菜鱼</li>
        <li>烤鱼</li>
        <li>沙拉</li>
        <li>地方特色菜</li>
    </ul>
<Foot></Foot>
</div>
</template>
<script>
import Head from 'components/common/Head'
import Foot from 'components/common/Foot'
export default {
components: {
    Head,
    Foot
  }, 
}
</script>
<style lang="stylus" scoped>
li
 height .7rem
</style>


