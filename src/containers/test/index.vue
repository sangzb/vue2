<template>
  <div id="TestComponent">
    <p>测试模块</p>
    <span>{{ count }}</span>
    <div v-if='isLoading'>
      <loading></loading>
    </div>
    <button class='ui button primary' v-on:click='addCount'>+</button>
    <button class='ui button primary'>-</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { fetch, C } from '../../utils';
  import loading from '../../components/loading/index.vue';
  export default {
    components: {
      loading
    },
    data() {
      let that = this;
      return {
        author: 'sangzb',
        articles: [],
        addCount(param) {
          console.log('count');
          that.$store.dispatch('add', { test: 123 });
        }
      }
    },
    computed: mapGetters({
      count: 'getCount',
      isLoading: 'getIsLoading'
    }),
    mounted() {
      this.$store.dispatch('getInfo', { type: 'GET_INFO' })
    }

  }
</script>

<style>
</style>