// template是v层，相当于html

<template>
<!-- 引入子组件 -->
  <Home></Home>
</template>

// script相当于js
<script>
// 引入全局初始化css home
import '@/assets/styles/reset.styl'
import Home from './pages/Home'

// 导出组件
export default {
  components: {
    Home
  }
}
</script>

<style lang="stylus">
</style>
