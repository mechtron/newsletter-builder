import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Router from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import Newsletters from './components/Newsletters.vue'
import Articles from './components/Articles.vue'
import Preview from './components/Preview.vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Router)
Vue.config.productionTip = false

const router = new Router({
  routes: [
    {
      path: '/',
      name:'newsletters',
      component: Newsletters,
    },
    {
      path: '/articles',
      name:'articles',
      component: Articles,
    },
    
    {
      path: '/preview',
      name:'preview',
      component: Preview,
    },
  ],
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
