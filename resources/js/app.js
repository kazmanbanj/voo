require('./bootstrap');

import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './routes'

import App from './components/App.vue'

Vue.component('app', require('./components/App.vue').default);
Vue.component('pagination', require('laravel-vue-pagination'));

const app = new Vue({
    el: '#app',
    component: { App },
    router: new VueRouter(routes)
});
