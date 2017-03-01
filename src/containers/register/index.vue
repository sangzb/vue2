<template>
  <div class="container" id="RegisterPage">
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
			v-on:blur="passwordNameBlur('password', $event)"
			v-on:focus="inputFocus('password', $event)"
		/>
	  </div>
	  <div class="ui field" v-bind:class="[repeatpwd.status]">
		<input
			type="password"
			name="repeatpwd"
			placeholder="重复密码..."
			v-model="repeatpwd.repeatpwd"
			v-on:blur="passwordNameBlur('repeatpwd', $event)"
			v-on:focus="inputFocus('repassword', $event)"
		/>
	  </div>

	  <button class="ui button primary submitBtn" v-on:click="loginSubmit">注册</button>
	</form>

	<div v-if="isLoading || process">
	  <maskComponent
		  v-bind:message="message"
		  v-bind:className="maskdisplay"
	  ></maskComponent>
	</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import maskComponent from '../../components/mask/index.vue';
  import { mapGetters } from 'vuex';
  import Vue from 'vue';
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
		maskdisplay: '',
		message: '',
		username: {
		  text: '',
		  status: ''
		},
		password: {
		  text: '',
		  status: ''
		},
		repeatpwd: {
		  text: '',
		  status: ''
		},
		loginSubmit(e) {
		  e.preventDefault();
		  if (that.username.text === '' || that.password.text === '') {
			that.message = '请输入用户名和密码';
			that.process = true;
			that.maskdisplay = 'showAnimate';
			hideMask.bind(that)();
		  }else {
			that.$store.dispatch('userLogin', { userName: that.username.text, pasword: that.password.text } ).then((data) => {
			  if (data && data.length) {
				  console.log(that.$router.push({
					path: '/test',
					query: { test: '123' }
				  }));
			  }else {
				that.message = '登录失败';
				that.process = true;
				that.maskdisplay = 'showAnimate';
				hideMask.bind(that)(true);
			  }
			});
		  }
		},
		userNameBlur(e) {
		  e.preventDefault();
		  if (that.username.text.length) {

		  }else {
			that.username.status = 'error';
		  }
		},
		passwordNameBlur(type, e) {
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
	  console.log(Vue.location);
	}
  }



  function hideMask(noAnimate) {
	let _hideFunc = new Promise((resolve, reject) => {
		setTimeout(() => {
		  this.maskdisplay = 'hideAnimate';
		  resolve('success');
		}, 1000);
	});
	let _removeFunc = new Promise((resolve, reject) => {
		setTimeout(() => {
		  this.process = false;
		  resolve('success');
		}, 2000);
	});

	_hideFunc.then(() => {
	  if (noAnimate) {
		this.process = false;
	  }else {
		_removeFunc.then(() => {
		  console.log('---remove---');
		});
	  }
	});
  }
</script>

<style lang="scss">
  @import "./index.scss";
</style>
