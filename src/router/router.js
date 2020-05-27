import VueRouter from 'vue-router';

import Landing from '../pages/Landing.vue';
import AlternativeList from '../pages/AlternativeList.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Landing,
    },
    {
      path: '/destination/:destinationSlug',
      component: Landing,
      props: true,
    },
    {
      path: '/alternatives',
      component: AlternativeList,
    },
    // { path: '*', component: NotFoundComponent },
  ],
});

export default router;
