<template>
    <div id="cityscroll">
        <div>
        <b>定位城市</b>
        <div class="position">
            <span>定位失败，请点击重试</span>
        </div>
         <div class="visitcity">
            <i>最近访问城市</i>
            <ul>
                <li></li>
            </ul>
        </div>
        <div class="hotcity" >
            <i>热门城市</i>
            <ul>
                <li  to="/foot" active-class="active" v-for="item of hotcity" :key="item.id" @click="pickIt(item.name)">
                <!-- <li v-for="item of hotcity" :key="item.id" > -->
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div class="allcity" v-for="(val,key) of allcity" :key="key">
            <span>{{key}}</span>
            <!-- <li v-for="item of val" :key="item.id"> -->
            <li to="/foot"  active-class="active"v-for="item of val" :key="item.id" @click="pickIt(item.name)">
                {{item.name}}
            </li>
        </div>
        <div class="nav">
            <router-link to="/movies" tag="div">返回</router-link>
        </div>
    </div>
    </div>
   
</template>


<script>
import http from 'utils/http'
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
    data(){
        return {
            hotcity:[],
            allcity:null
        }
    },
    computed: {
    ...mapState(['city'])
    },

    async mounted(){
        let result = await http({
            url:'/cities.json',
            method:'get'
        })
         this.hotcity = result.hotCities
         this.allcity = result.cities
         console.log( this.allcity)
         this.$nextTick(() => {
         this.bscroll = new BScroll('#cityscroll', {
        probeType: 1,
        click: true
      })
    })
},
    methods:{ 
    pickIt (city) {
      this.$router.push('/foot')
    console.log(city)
      if (city) {
        this.$store.commit('changeCity', city)
      }
    }, 
    // gotohot () {
    //   console.log(1)
    // },
    }
}
</script>


<style lang="stylus" scoped>
* 
  list-style-type none 
  background #fff
  padding .04rem
b
  height .3rem
.position
  height .56rem
  span 
   height .33rem
   display block
   line-height .33rem
.visitcity  
  i 
    height .3rem 
    display block
.hotcity
    i 
        height .3rem
        display block 
    ul
      display flex
      flex-direction row
      flex-wrap wrap
      li
       width .95rem
       background #ccc
       margin-left .1rem
       margin-top .1rem
       line-height 100%
       text-align center
.allcity
   display flex
   flex-direction column
   span 
    height  .3rem
    float left
   li
    height .45rem
    line-height .45rem
    float left 
    border-bottom .01rem solid #ccc
.nav
  width .4rem
  position fixed
  right 0
  top 0    

   

</style>
