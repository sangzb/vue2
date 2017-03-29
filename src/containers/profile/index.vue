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
          src: './empty.png'
        },
        nickname: {
          text: '',
          status: 0
        },
        birthday: {
          date: '2017-02-03'
        },
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
            })
          }else {
            that.message = '请选择图片文件';
            that.process = true;
            setTimeout(() => {
              that.process = false;
            }, 1000);
          }
        }
      }
    },
    computed: mapGetters({
      isLoading: 'getIsLoading'
    }),
    mounted() {
      //monted
    }
  }
</script>

<style lang="scss">
  @import './index.scss';
</style>