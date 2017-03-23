export default {
  COUNT_ADD (state, param) {
    console.log(param);
    state.count++;
  },
  COUNT_MINUS (state, param) {
    state.count--;
  }
};
