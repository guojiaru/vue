<template>
<!-- 目的:当我点击上一个页面的图片时,跳转到这个页面,将信息进行渲染 -->
    <div>
        <Head></Head>
        <div class="shopmain">
            <img :src='shopPhoto'/>
            <div class="shopright">
                <div class="shopid">{{shopId}}</div>
                <div class="shopname">{{shopName}}</div>
            </div>
        </div>
        <div class="shopnews">
            <span>了解{{shopName}}的加盟信息</span>
            <b>所属行业：餐饮</b>
            <b>门店总数：500家</b>
            <b>适合人群：自由创业 在岗投资 现有公司增顶</b>
            <div class="join">
                <span>同意加盟，请点击</span>
                <router-link to='/page3' tag='button'>立即申请，我要加盟</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Head from 'components/common/Head'
export default {
  computed: {
    ...mapState(['shopId','shopPhoto','shopName'])
  },
  mounted (){
      console.log( this.$store.state,this.shopId,this.shopPhoto)
  },
  components: {
    Head,
  },
}
</script>
<style lang="stylus" scoped>
.shopmain
    height 1rem
    width 100%
    display flex
    padding .1rem
    img 
        width 1.18rem
        height .88rem
    .shopright
        flex 1    
        .shopid
                width 2rem
                height .56rem
        .shopname
            width 2rem
            height .19rem    
.shopnews
    height 2.98rem
    display flex
    flex-direction column  
    padding .1rem
    span  
        height .23rem  
        margin-top .25rem
        font-size .2rem
    b
        height .2rem 
        margin-bottom .17rem  
    .join  
         height .77rem
         display flex
         flex-direction column
         span
            height .18rem
            margin-top 0
            font-size .16rem
         button 
            width 1.5rem
            height .44rem     
            background #008aff 
            color #fff
            margin-top .16rem  
            margin-left 1rem    
</style>


