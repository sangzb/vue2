//import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import Vue from 'vue';
import VueRouter from "vue-router";
import VueResource from 'vue-resource';
import store from './vuex/store';
import App from './App.vue';
import { location } from './utils';

//载入页面
import TestPage from './containers/test/index.vue';
import LoginPage from './containers/login/index.vue';
import RegisterPage from './containers/register/index.vue';

import UploadComponent from './components/upload.vue';

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(location);

const router = new VueRouter({
  mode: 'history',
  base: './',
  routes: [
    { path: '/test', component: TestPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/upload', component: UploadComponent }
  ]
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

/*
 14882
 53040
 22349.5
 1200
 20305.5
 (7500)
 */


