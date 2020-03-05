import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(VueLazyload);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
