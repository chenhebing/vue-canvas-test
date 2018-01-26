import Vue from 'vue'
import Router from 'vue-router'
import CoolClock from '@/pages/CoolClock/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cool-clock',
      name: 'CoolClock',
      component: CoolClock,
    },
  ],
})
