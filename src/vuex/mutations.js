import { C } from '../utils';
export default {
  COUNT_ADD (state, param) {
    console.log(param);
    state.count++;
  },
  COUNT_MINUS (state, param) {
    state.count--;
  },

  REQUEST_GET_INFO (state, param) {
    state.isLoading = true;
  },
  RECIEVE_GET_INFO (state, param) {
    state.isLoading = false;
  },

  REQUEST_USER_LOGIN (state, param) {
    state.isLoading = true;
  },
  RECIEVE_USER_LOGIN (state, param) {
    state.isLoading = false;
  },

  REQUEST_USER_REGISTER (state, param) {
    state.isLoading = true;
  },
  RECIEVE_USER_REGISTER (state, param) {
    state.isLoading = false;
  },

  REQUEST_USER_EXIST (state, param) {
    //todo
  },
  RECIEVE_USER_EXIST (state, param) {
    //todo
  }
};
