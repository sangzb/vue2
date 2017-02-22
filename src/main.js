//import 'bootstrap/dist/css/bootstrap.min.css';
import './style/semantic/dist/semantic.min.css';
import Vue from 'vue';
import VueRouter from "vue-router";
import VueResource from 'vue-resource';
import App from './App.vue';
import TestComponent from './components/test.vue';
import UploadComponent from './components/upload.vue';

//载入页面
import LoginPage from './containers/login/index.vue';

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);


const router = new VueRouter({
  mode: 'history',
  base: './',
  routes: [
    { path: '/test', component: TestComponent },
    { path: '/upload', component: UploadComponent },
    { path: '/login', component: LoginPage }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});


