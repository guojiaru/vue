<template>
<div>
    <!-- <div>
        <img src=""/>
    </div>
    <div>
        <b>1</b>
        <i>2</i>
        <span>3</span>
    </div> -->
    <list2 :p="p"></list2>
</div>
</template>
<script>
import list2 from 'pages/movies/list2'
import http from 'utils/http'
export default {
    data(){
    return {
      p:null
    }
  },
  // 子组件集合
  components: {
    list2
  },
    async beforeCreate (){
  // 在准备阶段进行ajax请求
    let result = await http({
      method :'get',
      url:'/shunt/favorite/',
    })
    // 将ajax拿到的值赋值给p
    this.p=result.data.list
    // console.log(this.p)
    //  console.log(this.p.brandModel0.loginName)
  }
}
</script>
