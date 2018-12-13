import Vue from 'vue'
import ElementUI from 'element-ui'

import '@/styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import './icons'
import './permission'
import Cookies from 'js-cookie'

Vue.prototype.$cookies = Cookies

import App from './App.vue'
import router from './router/router'
import store from './store/index'
import './registerServiceWorker'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
