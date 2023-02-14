import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import store from './store';
import VueBus from 'vue-bus';
import axs from "./common/axs";
//引入配置好的路由
import myrouter from './router'
// 引用lib-flexible插件
import "lib-flexible"


Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$axs = axs




Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueBus);

Vue.prototype.$addStorageValue = function (key, data) {

  // 创建一个StorageEvent幕件
  var newStorageEvent = document.createEvent('StorageEvent');
  const storage = {
    setItem: function (k, val) {
      localStorage.setItem(k, val);
      // 設始化创建的事件
      newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
      // 委派对象
      window.dispatchEvent(newStorageEvent);
    }
  }
  return storage.setItem(key, data);
}



new Vue({
  store,
  router: myrouter,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this //安装全局事件总线
  }
}).$mount('#app')
