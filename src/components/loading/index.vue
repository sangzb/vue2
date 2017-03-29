<template>
  <div id="LoadingMaskComponent">
    <div v-if="message && message.length" class='container'>
      <span class="text">{{message}}</span>
    </div>
    <div v-else class='container'>
      <div class='loadingImage'></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        author: 'sangzb'
      }
    },
    props: ['message'],
    mounted() {
      let $ = window.jQuery;
      let ww = document.documentElement.clientWidth;
      let wh = document.documentElement.clientHeight;
      let text = $('.container span.text');
      text.css({ left: (ww - text.outerWidth()) / 2, top: (wh - text.outerHeight()) / 2 });
    }
  }
</script>

<style lang='sass'>
  @import './index.scss';
</style>