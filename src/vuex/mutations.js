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
  }
};
