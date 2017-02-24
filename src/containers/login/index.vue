<template>
  <div class='container' id='LoginPage'>
	<form class="ui form">
	  <div class='field'>
		<input type="text" name="first-name" placeholder="姓名...">
	  </div>
	  <div class='field'>
		<input class='six wide column' type="password" name="last-name" placeholder="密码">
	  </div>

	  <button class="ui button primary submitBtn" v-on:click='loginSubmit'>登录</button>
	</form>

	<div class='userControl ui two column grid '>
	  <div class='column'>
		<a href='#'>用户注册</a>
	  </div>
	  <div class='column right'>
		<a href='#'>忘记密码</a>
	  </div>
	</div>

	<div v-if='isLoading'>
	  <loading></loading>
	</div>
  </div>
</template>

<script>
  import loading from '../../components/loading/index.vue';
  import { mapGetters } from 'vuex';
  export default {
	//components
	components: {
	  loading
	},
	//props & method
	data() {
	  return {
		loginSubmit(e) {
		  e.preventDefault();
		  console.log('submit');
		}
	  }
	},
	//state props
	computed: mapGetters({
	  isLoading: 'getIsLoading'
	}),
	//life cycle
	mounted() {
	  console.log('login page inited');
	}
  }
</script>

<style lang='scss'>
  @import './index.scss';
</style>
