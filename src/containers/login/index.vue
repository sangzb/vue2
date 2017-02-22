<template>
  <div class='container' id='LoginPage'>
	<form class="ui form">
	  <div class='field'>
		<input type="text" name="first-name" placeholder="姓名...">
	  </div>
	  <div class='field'>
		<input class='six wide column' type="password" name="last-name" placeholder="密码">
	  </div>

	  <button class="ui button primary submitBtn" type="submit">登录</button>
	</form>

	<div class='userControl ui two column grid '>
	  <div class='column'>
		<a href='#'>用户注册</a>
	  </div>
	  <div class='column right'>
		<a href='#'>忘记密码</a>
	  </div>

	</div>
  </div>
</template>

<script>

</script>

<style lang='scss'>
  #LoginPage {
	padding-top: 10%;
	.userControl {
	  padding-top: 10% !important;
	  .right {
		text-align: right;
	  }
	}
  }

  .submitBtn {
	color: #ffffff;
	background-color: #00b3ee;
	display: flex;
	width: 100%;
  }
</style>