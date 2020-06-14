import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { nprogress } from './helpers/utils';

Vue.config.productionTip = false;

new Vue({
  nprogress,
  store,
  render: h => h(App)
}).$mount('#app')
