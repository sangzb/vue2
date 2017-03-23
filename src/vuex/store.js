import Vue from 'vue';
import Vuex from 'vuex';

//引入getters与actions
import * as getters from './getters';
import actions from './actions/';
import mutations from './mutations/index.js';

//注册vuex
Vue.use(Vuex);

const state = {
  isLoading: false,
  message: '',
  status: 0,
  count: 0
};

//导出vuex的实例，其中包含state，mutations，getters，actions
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});

