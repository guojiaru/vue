<template>
 <!-- 模板渲染的样式 -->
 <ul>
    <li v-for='item of views'> 
        <img :src="item.shopPhoto"/>  
        <b>{{item.shopId}}</b>
        <i>{{item.shopName}}</i>
        <span>{{item.title}}</span>
     </li>
 </ul>
    <!-- <div>11</div> -->
</template>

<script>
// 父组件将p传给子组件,子组件通过props进行接受
export default {
   props: {
      p: Array
  },
  // 刚开始传的p值是null,所以用watch进行监听,如果ajax数据全部拿到,在进行渲染
  data (){
    return {
      views:[]
    }
  },
  watch:{
    p (){
      this.views = this.p  && this.p || []
      console.log(this.views)
    }
  },
}

</script>

<style lang="stylus" scoped>
 li
    width 1.71rem
    height 2.61rem
    display flex
    flex-direction column
    img
     width 1.71rem
     height 1.71rem
</style>
