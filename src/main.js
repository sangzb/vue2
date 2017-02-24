//import 'bootstrap/dist/css/bootstrap.min.css';
import './style/semantic/dist/semantic.min.css';
import Vue from 'vue';
import VueRouter from "vue-router";
import VueResource from 'vue-resource';
import store from './vuex/store';
import App from './App.vue';
import UploadComponent from './components/upload.vue';

//载入页面
import TestPage from './containers/test/index.vue';
import LoginPage from './containers/login/index.vue';

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);


const router = new VueRouter({
  mode: 'history',
  base: './',
  routes: [
    { path: '/test', component: TestPage },
    { path: '/login', component: LoginPage },

    { path: '/upload', component: UploadComponent }

  ]
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});


