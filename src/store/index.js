import Vue from 'vue'
import Vuex from 'vuex'

// 使用vuex
Vue.use(Vuex)
 const state = {
     city:'北京',
     shopId:'12618631',
     shopName:'八米创新丨工业设计',
     shopPhoto:'https://avatar.zbjimg.com/012/61/86/200x200_avatar_31.jpg!big?time=1542113197944',
 }
 const mutations = {
     changeCity(state,pickedCity){
         state.city = pickedCity
         console.log(1)
     },
     changeImg(state,{pickedImg,pickedId,pickedName,}){
        state.shopPhoto = pickedImg;
        state.shopId = pickedId;
        state.shopName = pickedName;
        console.log(state,pickedImg,pickedId,pickedName)
    }
 }

 const store = new Vuex.Store({
     state,
     mutations
 })

 export default store