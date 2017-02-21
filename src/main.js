import Vue from 'vue';
import VueRouter from "vue-router";
import VueResource from 'vue-resource';
import App from './App.vue';
import TestComponent from './components/test.vue';
import UploadComponent from './components/upload.vue';

//载入页面
import LoginPage from './containers/login.vue';

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);


const InnerComponet = { template: '<div><h2>我是第 1 个子页面</h2></div>' };

const router = new VueRouter({
  mode: 'history',
  base: './',
  routes: [
    { path: '/test', component: TestComponent },
    { path: '/inner', component: InnerComponet },
    { path: '/upload', component: UploadComponent },
    { path: '/login', component: LoginPage }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});


