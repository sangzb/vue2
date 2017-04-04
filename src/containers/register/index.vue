<template>
  <div class="container" id="RegisterPage">
	<form class="ui form">
	  <div class="ui field userNameContainer" v-bind:class="[username.status]">
		<input
          type="text"
          name="username"
          placeholder="姓名..."
          v-model="username.text"
          v-on:blur="userNameBlur"
          v-on:focus="inputFocus('username', $event)"
		/>
		<!--等待效果-->
		<template v-if="username.checking">
		  <span class="userNameTip"></span>
		</template>
		<!--错误提示-->
		<transition name="username-warn">
		  <p class="warn username" v-if="username.warn.show">{{ username.warn.text }}</p>
		</transition>
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
          v-model="repeatpwd.text"
          v-on:blur="passwordNameBlur('repeatpwd', $event)"
          v-on:focus="inputFocus('repeatpwd', $event)"
		/>
	  </div>

	  <button class="ui button primary submitBtn" v-on:click="loginSubmit">注册</button>
	</form>

	  <transition name="mask">
		<template v-if="isLoading || process">
		  <loadingComponent v-bind:message="message"
		  ></loadingComponent>
		</template>
	  </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import loadingComponent from '../../components/loading/index.vue';
  import { mapGetters } from 'vuex';
  import Vue from 'vue';
  export default {
	//components
	components: {
	  loadingComponent
	},
	//props & method
	data() {
	  let that = this;
	  return {
		process: false,
		message: '',
		username: {
		  text: '',
		  status: '',
		  checking: false,
		  warn: {
			show: false,
			text: '用户名已经存在'
		  }
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
		  const { dispatch } = that.$store;
		  if (that.username.text === '' || that.password.text === '' || that.repeatpwd.text === '') {
			that.message = '请输入必填内容';
			that.process = true;

			setTimeout(() => {
			  that.process = false;
			}, 1000);
		  }else if (that.password.text !== that.repeatpwd.text) {
			that.message = '密码不相同';
			that.process = true;

			setTimeout(() => {
			  that.process = false;
			}, 1000);
		  }else {
			dispatch('userRegister', { userName: that.username.text, pasword: that.password.text }).then((data) => {
			  if (data && data.length) {
				  console.log(that.$router.push({
					path: '/test',
					query: { test: '123' }
				  }));
			  }else {
				that.message = '登录失败';
				that.process = true;

				setTimeout(() => {
				  that.process = false;
				}, 1000);
			  }
			});
		  }
		},
		userNameBlur(e) {
		  const { dispatch } = that.$store;
		  e.preventDefault();
		  if (that.username.text.length) {
			that.username.checking = true;
			dispatch('userExist', { userName: that.username.text }).then((data) => {
			  that.username.checking = false;
			  console.log(data,'----')
			  if (data.data && data.data.length) {
				that.username.warn.show = true;
				that.username.status = 'error';
				
				setTimeout(() => {
				  that.username.warn.show = false;
				}, 2000);
			  }
			});
		  }else {
			that.username.status = 'error';
		  }
		},
		passwordNameBlur(type, e) {
		  e.preventDefault();
		  if (!that.password.text.length) {
			that.password.status = 'error';
		  }
		  if (!that.repeatpwd.text.length || that.repeatpwd.text !== that.password.text) {
			that.repeatpwd.status = 'error';
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

</script>

<style lang="scss">
  @import "./index.scss";
</style>
