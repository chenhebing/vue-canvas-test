import Vue from 'vue'
import Router from 'vue-router'
import CoolClock from '@/pages/CoolClock/index.vue'
import MusicPlayer from '@/pages/MusicPlayer/index.vue';
import FireWork from '@/pages/FireWork/index.vue';
import Resume from '@/pages/Resume/index.vue';

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
    }, {
      path: '/firework',
      name: 'FireWork',
      component: FireWork,
    }, {
      path: '/resume',
      name: 'Resume',
      component: Resume,
    },
  ],
})
