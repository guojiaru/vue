import Vue from 'vue'
import App from './App.vue'

// 引入上面进度条
import VueProgressBar from 'vue-progressbar'

import router from './router'
import store from './store'
// import store2 from './store/index2'
// main.js是入口文件 
// 对上面进度条进行配置
const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
// 使用

Vue.use(VueProgressBar, options)

// 解决控制台环境报错的问题
Vue.config.productionTip = false

// 新建一个vue实例，入口文件是app
new Vue({
  router,
  store,
  // store2,
  render: h => h(App)
}).$mount('#app')
// 防抖
export function _debounce(fn, delay) {

  var delay = delay || 200;
  var timer;
  return function () {
      var th = this;
      var args = arguments;
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(function () {
          timer = null;
          fn.apply(th, args);
      }, delay);
  };
}
// 节流
export function _throttle(fn, interval) {
  var last;
  var timer;
  var interval = interval || 200;
  return function () {
      var th = this;
      var args = arguments;
      var now = +new Date();
      if (last && now - last < interval) {
          clearTimeout(timer);
          timer = setTimeout(function () {
              last = now;
              fn.apply(th, args);
          }, interval);
      } else {
          last = now;
          fn.apply(th, args);
      }
  }
}
