// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import Myrouter from '@/router/myrouter'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
Myrouter.push({
  name: 'demo'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Myrouter,
  components: { App },
  template: '<App/>'
})
