require('./bootstrap');

import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import swal from 'sweetalert'
Vue.use({
    // this is the required "install" method for Vue plugins
    install (Vue) {
      Vue.swal = swal
      Vue.prototype.$swal = swal
    }
  })

import routes from './routes'

import App from './components/App.vue'

Vue.component('app', require('./components/App.vue').default);
Vue.component('pagination', require('laravel-vue-pagination'));

const app = new Vue({
    el: '#app',
    component: { App },
    router: new VueRouter(routes)
});
