<template>
  <div id="app" class='ui container'>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    console.log(new Date(), 'mounted main');
  }
}
</script>
