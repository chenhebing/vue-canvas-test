import Vue from 'vue'
import Router from 'vue-router'
import CoolClock from '@/pages/CoolClock/index.vue'
import MusicPlayer from '@/pages/MusicPlayer/index.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cool-clock',
      name: 'CoolClock',
      component: CoolClock,
    }, {
      path: '/music-player',
      name: 'MusicPlayer',
      component: MusicPlayer,
    },
  ],
})
