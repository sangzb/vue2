<template>
  <div id="ProfileComponent">
    <div class="ui form">
      <div class="avatar field">
        <input v-on:change="changeAvatar" type="file" />
        <img class="ui centered small circular image" v-bind:src="avatar.src">
      </div>
      <div class="field">
        <input
          type="text"
          name="username"
          placeholder="昵称..."
          v-model="nickname.text"
        />
      </div>
      <div class="field datetime">
        <input
          type="date"
          placeholder="生日"
          v-model="birthday.date"
        />
        <input
          type="text"
          v-model="birthday.date"
          readonly="readonly"
        />
      </div>
      <div class="field inline">
        <label>性别：</label>
        <div class="ui radio checkbox">
          <input type="radio" name="gender" value="male" v-model="gender">
          <label>男</label>
        </div>

        <div class="ui radio checkbox">
          <input type="radio" name="gender" value="female" v-model="gender">
          <label>女</label>
        </div>
      </div>
      <div class="field inline">
        <label>兴趣爱好：</label>
        <div class="ui checkbox">
          <input type="checkbox" name="hobby" value="reading" v-model="hobby">
          <label>阅读</label>
        </div>
        <div class="ui checkbox">
          <input type="checkbox" name="hobby" value="travel" v-model="hobby">
          <label>旅行</label>
        </div>
        <div class="ui checkbox">
          <input type="checkbox" name="hobby" value="otaku" v-model="hobby">
          <label>宅</label>
        </div>
      </div>
        <button class="ui button primary submit">提交</button>
    </div>
    <transition name="mask">
      <template v-if="isLoading || process">
        <loading v-bind:message="message"
        ></loading>
      </template>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import moment from 'moment';
  import { fetch, C } from '../../utils';
  import loading from '../../components/loading/index.vue';
  export default {
    components: {
      loading
    },
    data() {
      let that = this;
      const { dispatch } = that.$store;
      return {
        message: '',
        process: false,
        avatar: {
          src: require('./empty.png')
        },
        nickname: {
          text: '',
          status: 0
        },
        birthday: {
          date: '2017-01-01'
        },
        gender: 'male',
        hobby: [],
        changeAvatar(e) {
          let files = e.currentTarget.files;
          let img = files[0];
          if(img && img.name.match(/\.(jpg|jpeg|png|gif)/)) {
            let data = new FormData();
            data.append('file', files[0]);
            dispatch('uploadAvartar', data).then((data) => {
              if (data && data.src) {
                that.avatar.src = data.src;
              }
            });
          }else {
            that.message = '请选择图片文件';
            that.process = true;
            setTimeout(() => {
              that.process = false;
            }, 1000);
          }
        }
      };
    },
    computed: mapGetters({
      isLoading: 'getIsLoading'
    }),
    mounted() {
      //monted
    }
  };
</script>

<style lang="scss">
  @import './index.scss';
</style>