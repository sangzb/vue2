<template>
  <div id="TestComponent">
    <p>测试模块</p>
    <a> from {{ author }} </a>
    <input type='text' v-module='author' value />
  </div>
</template>

<script>
  import { fetch, C } from '../utils';
  export default {
    data() {
      return {
        author: 'sangzb',
        articles: []
      }
    },
    mounted() {
      fetch({
        url: C('API_URI'),
        method: 'get'
      })();
    }
  }
</script>

<style>
</style>