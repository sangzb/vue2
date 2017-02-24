<template>
  <div id="LoadingMaskComponent">
    {{message}}
    <div v-if="message" class='container'>
      <span>{{message}}</span>
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
    computed: mapGetters({
      isLoading: 'getIsLoading'
    }),
    mounted() {
      console.log('loading......')
    }
  }
</script>

<style lang='sass'>
  @import './index.scss';
</style>