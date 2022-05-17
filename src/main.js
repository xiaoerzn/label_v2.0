import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/global.css";

Vue.use(ElementUI);

Vue.config.productionTip = false

import axios from "axios";
Vue.prototype.$http = axios;
// 配置请求的根路径
axios.defaults.baseURL = "http://10.15.1.192:8002/apis";

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
