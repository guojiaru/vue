<template>
  <div>
    <div class="logo">
      <img src="http://www.91jm.com/resource/images/new/logo-v2.png"/>
    </div>
    <div class="input">
        <div class="input1">
            <input type="text" placeholder="手机号码" v-model="items.text" ref="count">
            <div class="svg">
                <svg t="1541682707441" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2597" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="22"><path d="M907.264 966.656H114.688c-16.384 0-32.768-8.192-43.008-20.48-10.24-14.336-14.336-30.72-10.24-47.104 40.96-208.896 210.944-364.544 415.744-380.928 68.608 0 142.848 8.704 217.088 38.912 21.504 8.704 28.672 14.336 40.96 20.48 118.784 67.584 200.704 184.32 227.328 321.536 4.096 16.384 0 32.768-12.288 47.104-10.24 12.288-26.624 20.48-43.008 20.48z" fill="#bfbfbf" p-id="2598"></path><path d="M115.712 933.376c-6.656 0-12.8-2.56-16.384-7.168-0.512-0.512-0.512-1.024-1.024-1.536-5.12-5.12-5.632-13.824-4.608-18.944 37.888-194.56 197.12-340.48 387.584-354.304h15.36c91.648 0 179.712 28.672 222.72 55.808C832 674.816 907.264 780.8 930.816 905.728c1.024 7.168-0.512 13.824-5.632 20.48-3.584 4.608-9.728 7.168-16.384 7.168H115.712z" fill="#bfbfbf" p-id="2599"></path><path d="M496.64 563.712c89.088 0 174.592 27.648 216.064 53.76h0.512c109.568 65.024 182.272 167.936 204.8 289.792 0.512 2.56 0.512 6.144-3.584 10.752-0.512 1.024-3.072 2.048-6.144 2.048H115.712c-3.072 0-5.632-1.024-6.144-2.048-0.512-1.024-1.536-2.048-2.56-2.56-1.024-1.024-2.048-4.096-1.024-7.68 36.864-188.928 190.976-330.24 375.808-344.064 4.608 0.512 9.728 0 14.848 0m0-25.6c-5.12 0-10.752 0-15.872 0.512C284.16 552.96 120.32 702.464 81.408 903.168c-2.048 10.24 0 22.528 8.192 30.72 6.144 8.192 16.384 12.288 26.624 12.288H908.8c10.24 0 20.48-4.096 26.624-12.288 6.144-8.192 10.24-18.432 8.192-30.72-24.576-131.072-102.4-238.592-217.088-307.2-43.52-27.136-132.608-57.856-229.888-57.856zM512 536.576c-129.024 0-235.52-106.496-235.52-235.52S382.976 65.536 512 65.536s235.52 106.496 235.52 235.52S641.024 536.576 512 536.576z" fill="#bfbfbf" p-id="2600"></path><path d="M512 503.296c-111.616 0-202.24-90.624-202.24-202.24S400.384 98.816 512 98.816s202.24 90.624 202.24 202.24-90.624 202.24-202.24 202.24z" fill="#bfbfbf" p-id="2601"></path><path d="M512 111.616c104.448 0 189.44 84.992 189.44 189.44S616.448 490.496 512 490.496s-189.44-84.992-189.44-189.44 84.992-189.44 189.44-189.44m0-25.6c-118.784 0-215.04 96.256-215.04 215.04s96.256 215.04 215.04 215.04 215.04-96.256 215.04-215.04S630.784 86.016 512 86.016z" fill="#bfbfbf" p-id="2602"></path></svg>
            </div>
        </div>
        <div class="news1"  v-if="state">输入错误</div>
        <div class="news1"  v-else>输入正确</div>
        <div class="input1">
            <input type="password" placeholder="请输入您的密码" v-model="items.text1" ref="count1">
            <div class="svg">
                <svg t="1541683400679" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3383" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="22"><path d="M760.384 441.376l0-103.616c0 0-0.032-241.728-241.728-241.728-241.696 0-241.728 241.728-241.728 241.728l0 103.616L173.312 441.376l0 483.488L864 924.864 864 441.376 760.384 441.376zM553.184 708.064l0 113.184-69.056 0 0-113.184c-20.544-11.968-34.528-34.016-34.528-59.488 0-38.176 30.944-69.088 69.056-69.088 38.112 0 69.056 30.912 69.056 69.088C587.744 674.048 573.76 696.096 553.184 708.064M691.328 441.344 345.984 441.344l0-103.136c0.384-28.928 10.56-173.12 172.672-173.12s172.288 144.192 172.672 172.672L691.328 441.344z" p-id="3384" fill="#bfbfbf"></path>
              </svg>
            </div>
          
        </div>
        <div class="news1"  v-if="state1">输入错误</div>
        <div class="news1"  v-else>输入正确</div>
    </div>
    <div class="button">
      <button>
          用户登录
      </button>
    </div>
    <div class="news">
      <span class="newscon">
        <b>您还可以，</b>
        <i>注册新帐号</i>
      </span>
      <span class="newscon">
        <b>忘记密码，</b>
        <i>点此使用短信验证码登录</i>
      </span>
    </div>
    <Foot></Foot>
  </div>
</template>
<script>
// 节流函数
function debounce(func, wait=500) {
   let timeout;  // 定时器变量
    return function(event) {
        clearTimeout(timeout);  // 每次触发时先清除上一次的定时器,然后重新计时
        timeout = setTimeout(()=>{
            console.log(123,this)
            func.call(this,event)
        }, wait);  // 指定 xx ms 后触发真正想进行的操作 handler
    };
}

import Foot from 'components/common/Foot'
export default {
  components: {
    Foot
  },
  data(){
    return{
     state :true, 
     state1 :true, 
     items: {
        text:'',
        text1:'',
      }
    }
  },
    watch:{   //watch()监听某个值（双向绑定）的变化，从而达到change事件监听的效果
    items:{
      // 节流函数的使用
        handler:debounce(function(){
            var _this = this;
            var reg = _this.$refs.count.value
            var _sum = 11; //字体限制为100个
            _this.$refs.count.setAttribute("maxlength",_sum);
            _this.number= _sum- _this.$refs.count.value.length;
             _this.$refs.count1.setAttribute("maxlength",_sum);
             _this.number1= _sum- _this.$refs.count1.value.length;
            if( _this.number == 0 && (/^((13|14|15|17|18)[0-9]{1}\d{8})$/).test(reg)){
               this.state = false
            }
            if( _this.number1 == 0 ){
               this.state1 = false
            }
            console.log(_this.number1)
            console.log(this.state1)
        }),
         deep:true
        }
    },
}
</script>
<style lang="stylus" scoped>
.logo
  height .7rem
  width 2.24rem
  img 
   height .5rem
   width 2.04rem
   margin-left .8rem
   margin-top .2rem
   margin-bottom .35rem
   display block
.input
  width 100%
  height 1.6rem 
  margin-bottom .1rem
  display flex
  flex-direction column
  align-items center
  padding .1rem .35rem 
  justify-content space-between
  .input1
    width 100%
    height .45rem 
    display flex
    justify-content space-between
    input
      width 80%
      height 100% 
      border none
      text-indent .1rem
    .svg
      flex 1
      background #fff
      display flex
      justify-content center
      align-items center
.news
   height .2rem
.button 
   width 100%
   height .45rem 
   text-align center
   button
    width 2.88rem
    height .45rem 
    display inline-block
    background #3598db
    color #fff
    font-size .2rem
.news
  width 100%
  height .5rem
  text-align center
  margin-top .18rem
  margin-bottom 2rem
  .newscon
    width 2.9rem
    height .25rem
    display inline-block
    b
     float left
     height .21rem
     margin-top .02rem
     margin-bottom .02rem
    i
     float left
     height .21rem
     color #3598db
     margin-top .02rem
     margin-bottom .02rem




   

</style>
