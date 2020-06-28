import VueRouter from 'vue-router';

import Landing from '../pages/p-Landing.vue';
import Alternative from '../pages/p-Alternative.vue';
import AlternativesList from '../pages/p-AlternativesList.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Landing,
    },
    {
      path: '/destination/:destinationSlug/',
      component: Landing,
      props: true,
    },
    {
      path: '/alternative/:alternativeSlug/',
      component: Alternative,
      props: true,
    },
    {
      path: '/alternatives',
      component: AlternativesList,
    },
    // { path: '*', component: NotFoundComponent },
  ],
});

export default router;
