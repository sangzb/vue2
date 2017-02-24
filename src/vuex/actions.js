import { fetch, C } from '../utils';

export const add = ({commit}, action) => {
  commit('COUNT_ADD', action);
};


//redux与vuex最大的区别在于redux的dispatch可以接受{type: '', action: {}},也可以接受(dispatch) => {}这样的匿名函数
//vuex只能接受已经存在的action的函数名
export const getInfo = ( { commit }, action) => {
  return fetch({
    url: C('API_URI'),
    method: 'get',
    type: 'GET_INFO'
  })()({ commit }, action);
};

