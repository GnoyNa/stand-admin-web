import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '../static/theme/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import router from './router'
import store from "./store";
import App from './App.vue'

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
var less = require('less')

new Vue({
  render: h => h(App),
  router,
  less,
  store
}).$mount('#app')
