<template>
    <div>
        <Head></Head>
        <ul>
            <!-- 准备使用嵌套路由，就是n2路由下有三个路由 -->
            <router-link to="/people" tag="li">人气</router-link>
            <router-link to="/money" tag="li">金额</router-link>
            <router-link to="/mo" tag="li">默认</router-link>
        </ul>
        <router-view></router-view>
        <!-- <div>
            <div>
                <img src=""/>
            </div>
            <div>
                <b>1</b>
                <i>2</i>
                <span>3</span>
            </div>
        </div> -->
    </div>
</template>
<script>
import Head from 'components/common/Head'
export default {
  components: {
    Head,
  },
}
</script>
<style lang="stylus" scoped>
ul
  height .44rem
  display flex
  flex-direction row
  justify-content space-between
  align-items center
  li
   height 100%
   width 33%
   line-height .44rem
   text-align center
   color #444
   font-size .14rem

</style>
