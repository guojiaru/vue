<template>
    <div>
        <div class="tit">欢迎加盟</div>
        <table id="list">
            <tr>
                <td><label id="firstlabel"for="firstcheck"><input type="checkbox"  @click="c" id="firstcheck" ><span>全选</span></label></td>
                <td>图片</td>
                <td>加盟数量</td>
                <td>操作</td>
                <td>单价</td>
            </tr>
            <tr>
                    <td><label id="firstlabel"for="firstcheck"><input type="checkbox"  class="mcheck"></label></td>
                    <td><img :src='shopPhoto'/></td>
                    <td>{{count}}</td>
                    <td>
                        <button class="reduce" @click="reduce">-</button>
                        <i>{{count}}</i>
                        <button class="add" @click="add"> + </button>
                    </td>
                    <td>10万</td>
            </tr>

	</table>
	<div class="total">总计：<span>{{count*10}}</span><span>万</span></div>
    <button class="sub">确定加盟</button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
      computed: {
    ...mapState(['shopId','shopPhoto','shopName',])
  },
  data(){
    return {
      count:1,
    }

  },
    methods:{
    reduce:function(){
      this.count--
      if(this.count<=0){
          this.count=0
      }
    },
    add:function(){
      this.count++
       if(this.count>5){
          this.count=5
    }
  },
        c:function(){
         var _this = this;
        var firstcheck = document.getElementById("firstcheck")
        var mcheck =document.getElementsByClassName("mcheck")
        console.log(firstcheck)
        console.log(mcheck)
        console.log(_this)
        if(firstcheck.checked){
            console.log('nnn')
            for(var i=0;i<mcheck.length;i++){
                mcheck[i].checked = "checked"}
        }
        else{
            for(var i=0;i<mcheck.length;i++){
            mcheck[i].checked = ""}
        }
    
      }
        }
}
</script>

<style lang="stylus" scoped>
.tit
    height .44rem
    font-size .2rem 
#list
    width: 100%;
    display flex
    flex-direction column
    tr
        width 100%
        height .4rem
        display flex
        flex-direction row
        margin-bottom .2rem
        td
            width 20%
            height 100%
            display flex
            flex-direction row
            line-height .4rem
            text-align center
            button 
                width 25%
                height 70%
                position relative
                top 15%
            i 
                 width 50%  
            img 
                width 100%
                height 100%       
.total
    height .4rem
    line-height .4rem
    font-size .18rem
.sub
    height .44rem
    width 40%
    margin-left 30%
    color #fff
    font-size .18rem
    background #008aff 


</style>
