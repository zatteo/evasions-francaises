import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import vSelect from 'vue-select';
import App from './App.vue';
import router from './router/router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import loadedAlternatives from './assets/alternatives.json';
import loadedPlaces from './assets/places.json';

Vue.prototype.$loadedAlternatives = loadedAlternatives;
Vue.prototype.$loadedPlaces = loadedPlaces;

Vue.use(VueRouter);

Vue.use(BootstrapVue);

Vue.component('v-select', vSelect);

Vue.config.productionTip = false;


new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
