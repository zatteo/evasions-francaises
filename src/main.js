import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import vSelect from 'vue-select';
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.component('v-select', vSelect);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
