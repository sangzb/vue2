<template>
  <div id='UploadComponent'>
    <p>上传文件</p>
    <input type='file' v-on:change='fileChange'>
  </div>
</template>

<script>
  import { fetch, C } from '../utils';
  export default {
    data() {
      return {
        author: 'sangzb',
        articles: [],
        fileChange: function(e) {
          let files = e.currentTarget.files;
          let data = new FormData();
          data.append('file', files[0]);
          fetch({
            url: C('API_URI') + '/upload',
            method: 'post'
          })(data);
        }
      }
    },
    mounted() {
      fetch({
        url: C('API_URI') + '/test',
        method: 'post'
      })();
    }

  }
</script>

<style>
</style>