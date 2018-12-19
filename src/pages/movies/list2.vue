<template>
 <!-- 模板渲染的样式 -->
 <ul>
    <li v-for='item of views'> 
        <img :src="item.shopPhoto" to="/page2"  @click="pickImg(item.shopPhoto,item.shopId,item.shopName)">
        <div class="con">
            <b>{{item.shopId}}</b>
            <i>{{item.shopName}}</i>
            <span>{{item.title}}</span>
        </div>
     </li>
 </ul>
    <!-- <div>11</div> -->
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
 computed: {
    ...mapState(['shopId','shopPhoto','shopName','isAllChecked'])
  },
 methods:{ 
    
    pickImg (pickedImg,pickedId,pickedName) {
        //  console.log("list2"),
        // console.log(pickedImg,pickedId,pickedName)
      this.$router.push('/page2')
      if (pickedImg) {
          console.log(pickedImg,pickedId,pickedName)
        this.$store.commit('changeImg',{pickedImg,pickedId,pickedName})
      }
    },
 }
}

</script>

<style lang="stylus" scoped>
 li
    width 100%
    height .91rem
    display flex
    img
        width .9rem
        height .7rem
    .con
        flex 1
        display flex
        flex-direction column
        b
            width 100%
            height .26rem 
        i
            height .24rem 
            width 100%
        span
                height .24rem 
                width 100%
</style>
