import demo from '@/components/tabs'
import analysis from '@/components/analysis'
import simulation from '@/components/simulation'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: demo,
      children: [
        {
          path: '/demo/simulation',
          name: 'simulation',
          component: simulation

        },
        {
          path: '/demo/analysis',
          name: 'analysis',
          component: analysis

        }
      ]
    }
  ]
})
