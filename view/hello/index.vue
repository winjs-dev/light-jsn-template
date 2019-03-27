<template>
  <div class="page page-hello">
    <div class="page-content">
      <!-- 静态资源路径写法事例 -->
      <image style="width:200px; height:200px;" src="assets/img/logo.png"></image>
      <h1 v-text="msg"></h1>
      <h2 v-text="message"></h2>
      <send-code class="btn btn-default" v-model="start" @click.native="sendCode"></send-code>
    </div>
  </div>
</template>

<script>
  /**
   * 以下仅为事例代码，可以随意扩展修改
   */
  // 工具类
  import { formatDate } from '@liwb/cloud-utils';
  import { SendCode } from '@/components';
  import services from '@/services';

  export default {
    components: {
      SendCode
    },

    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        start: false,
        logo: require('@/assets/img/logo.png'),
        message: '现在时间是：' + formatDate(Date.now())
      };
    },

    created() {
      this.movieComingSoon();
    },

    methods: {
      movieComingSoon() {
        const data = {};
        services.octocat({
          method: 'get',
          data
        }).then((res) => {
          console.log('接口请求成功：' + JSON.stringify(res, null, 2));
        }).catch((err) => {
          console.log('接口请求异常：' + err);
        });
      },
      sendCode() {
        setTimeout(() => {
          this.start = true;
        }, 1000);
      }
    }
  };
</script>

<style scoped src="./style.css"></style>