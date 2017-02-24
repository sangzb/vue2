<template>
  <div class="container" id="LoginPage">
	<form class="ui form">
	  <div class="ui field" v-bind:class="[username.status]">
		<input
			type="text"
			name="username"
			placeholder="姓名..."
			v-model="username.text"
			v-on:blur="userNameBlur"
			v-on:focus="inputFocus('username', $event)"
		/>
	  </div>
	  <div class="ui field" v-bind:class="[password.status]">
		<input
			type="password"
			name="password"
			placeholder="密码..."
			v-model="password.text"
			v-on:blur="passwordNameBlur"
			v-on:focus="inputFocus('password', $event)"
		/>
	  </div>

	  <button class="ui button primary submitBtn" v-on:click="loginSubmit">登录</button>
	</form>

	<div class="userControl ui two column grid ">
	  <div class="column">
		<a href="#">用户注册</a>
	  </div>
	  <div class="column right">
		<a href="#">忘记密码</a>
	  </div>
	</div>

	<div v-if="isLoading || process">
	  <maskComponent v-bind:message="message"></maskComponent>
	</div>
  </div>
</template>

<script>
  import maskComponent from '../../components/mask/index.vue';
  import { mapGetters } from 'vuex';
  export default {
	//components
	components: {
	  maskComponent
	},
	//props & method
	data() {
	  let that = this;
	  return {
		process: false,
		message: '',
		username: {
		  text: '',
		  status: ''
		},
		password: {
		  text: '',
		  status: ''
		},
		loginSubmit(e) {
		  e.preventDefault();
		  if (that.username.text === '' || that.password.text === '') {
			that.message = '请输入用户名和密码';
			that.process = true;
		  }else {
			that.$store.dispatch('userLogin', { userName: that.username.text, pasword: that.password.text } );
		  }
		},
		userNameBlur(e) {
		  e.preventDefault();
		  if (that.username.text.length) {

		  }else {
			that.username.status = 'error';
		  }
		},
		passwordNameBlur(e) {
		  e.preventDefault();
		  if (that.password.text.length === 0) {
			that.password.status = 'error';
		  }
		},
		inputFocus(type, e) {
		  that[type].status = '';
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

<style lang="scss">
  @import "./index.scss";
</style>
