<template>
  <div class="pb-common-nav">
    <div :style="{height: isAndroid ? '22px':'20px'}" v-if="remain"></div>
    <div class="navbar common-nav navbar-fixed-top">
      <div class="navbar-header">
        <div>
          <a v-if="goback" class="back" :href="gobackUrl">
            <img src="../assets/images/title-back.png">
          </a>
          <a v-if="search" class="search" :href="searchUrl">
            <img src="../assets/images/title-search.png">
          </a>
          <slot></slot>
        </div>
      </div>
      <div class="navbar-body">
        <div>
          <slot name="body"></slot>
        </div>
      </div>
      <div class="navbar-footer">
        <div>
          <message-icon v-if="message"></message-icon>
          <a v-if="service" class="service" :href="serviceUrl">
            <img src="../assets/images/service.png">
          </a>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'common-nav',
    props: {
      goback: {
        type: Boolean,
        default: true,
      },
      gobackUrl: {
        type: String,
        default: "goBack",
      },
      search: {
        type: Boolean,
        default: true,
      },
      searchUrl: {
        type: String,
        default: "pobo:pageId=800013",
      },
      message: {
        type: Boolean,
        default: true,
      },
      messageUrl: {
        type: String,
        default: "pobo:pageId=900005&url=message/index.html",
      },
      service: {
        type: Boolean,
        default: true,
      },
      serviceUrl: {
        type: String,
        default: "pobo:uncheck=0&pageId=900004&title=客服中心&url=community/index.html",
      },
      remain: {//是否需要预留空间，默认false
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
      }
    },
    computed: {
      isAndroid () {
        if (pbE.isPoboApp) {
          var DeviceJsonInfo = JSON.parse(pbE.SYS().getDeviceJsonInfo());
          if (DeviceJsonInfo['255']) {  //平台
            var platNum = DeviceJsonInfo['255'];
            if (platNum == '3') {
              return true;
            }
          }
        }
        return false;
      }
    },
    created: function () {

    },
    methods: {}

  }
</script>

