// home是整体布局，在template里定义其基本结构
<template>
  <div class="home-wrap">
    <main style="width:100%;height:100%;">
      
        <transition :name="transitionName">
          <!-- 会有一个一下子跳动的效果,用户体验不好,想办法取消,方法是父级相对定位,子级绝对定位,上下左右为0 -->
          <div id="main-scroll" style="width:100%;height:100%;">
          <router-view class="not" style="width:100%;height:100%;"></router-view>
          </div> 
        </transition>
    <!-- 上面的效果 -->
       <vue-progress-bar></vue-progress-bar>
      
    </main>

  </div>
</template>
// 引入两个子组件
<script>
// import Movies from 'pages/movies/Movie'
import TabBar from 'components/layout/TabBar'
import BScroll from 'better-scroll'
export default {
  data (){
    return {
      transitionName:''
    }
  },
  components: {
    // Movies,
    TabBar
  },
  // 上面效果官方文档
   mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
    
    this.$nextTick(()=>{
        let bscroll = new BScroll('#main-scroll', {
        // scrollX: horizontal,
        probeType: 1,
  })
    })
  },
   created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
      // console.log(meta)
    })
  },
  watch:{
    // 判断向左还是向右
    $route(to,from){
       if ( to.meta > from.meta ) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  },
}

</script>

// 现在想要的效果是上下固定，中间弹性盒模型
<style lang="stylus" scoped>
// 定义向左向右的动画
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 3s;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.home-wrap
  height 100%
  display flex
  flex-direction column
  main
    // flex 1
    height 100%
    overflow hidden
    position relative 
    margin-bottom .44rem
     .not
        position absolute
        top 0
        left 0
        right 0
        bottom 0
      

</style>


