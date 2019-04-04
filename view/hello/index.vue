<template>
  <div class="page page-hello">
    <div class="page-content">
      <wxc-button text="Open Popup"
                  @wxcButtonClicked="buttonClicked">
      </wxc-button>
      <wxc-popup width="500"
                 pos="left"
                 :show="isShow"
                 @wxcPopupOverlayClicked="overlayClicked">
      </wxc-popup>
      <!-- 静态资源路径写法事例 -->
      <image style="width:200px; height:200px;" src="images/logo.png"></image>
      <text>{{msg}}</text>
      <text>{{message}}</text>
      <text>接口请求示例：</text>
      <text>{{response}}</text>
    </div>
  </div>
</template>

<script>
  /**
   * 以下仅为事例代码，可以随意扩展修改
   */
  // 工具类
  import {formatDate} from '@liwb/cloud-utils';
  import {SendCode} from '@/ui';
  import services from '@/api';
  import {WxcButton, WxcPopup} from 'weex-ui';

  export default {
    components: {
      WxcButton,
      WxcPopup
    },

    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        start: false,
        response: null,
        message: '现在时间是：' + formatDate(Date.now()),
        isShow: false
      };
    },

    created() {
      this.movieComingSoon();
    },

    methods: {
      buttonClicked() {
        this.isShow = true;
      },
      overlayClicked() {
        this.isShow = false;
      },
      movieComingSoon() {
        services.octocat({}).then((res) => {
          this.response = JSON.stringify(res, null, 2);
          console.log('接口请求成功：' + this.response);
        }).catch((err) => {
          console.log('接口请求异常：' + JSON.stringify(err));
        });
      }
    }
  };
</script>

<style scoped src="./style.css"></style>