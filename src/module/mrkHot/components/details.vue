<template>
  <div>
    <div style="width: 100%;">
      <div class="navbar">
        <a href="goBack" class="goBack">
          <img src="images/goback.png" alt="返回">
        </a>
        <span class="text">详细信息</span>
      </div>
    </div>
    
    <div class="news">
      <h4 class="title"></h4>
      <p class="info">来源：&nbsp;<span class="provider"></span><span class="time"><!--2017-4-1 8:03:57--></span></p>
      <p class="content"></p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
  
    mounted: function () {
      var data = {doc: 'json', newsId: this.$route.params.id, type: 'mu'};
      pbE.INFO().infoQueryDetailWithJson(JSON.stringify(data));
      
      this.initPage();
      // window.callback = function (message) {
      //   message = message.replace(/\n/g, '<br>');
      //   message = message.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
      //   message = message.replace(/\s/g, '&nbsp;');
      //   var msg = JSON.parse(message);
      //   if(msg.moduleId == 90004){
      //     var newsDetail = msg.jData.News;
      //     if (newsDetail.Text.substring(0, 5) == '{url:') {
      //       window.location.href='pobo:uncheck=1&pageId=900004&url=' + newsDetail.Text + '?title=详细信息';
      //       return;
      //     }
      //     document.getElementsByClassName('.title').innerHTML(newsDetail.Title);
      //     document.getElementsByClassName('.time').innerHTML(newsDetail.Pubtime);
      //     document.getElementsByClassName('.provider').innerHTML(newsDetail.Source);
      //     document.getElementsByClassName('.content').innerHTML(newsDetail.Text);
      //   }
      // }
    },
    methods: {
      callback_90011(msg) {
        msg = msg.replace(/\n/g, '<br>');
        msg = msg.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        msg = msg.replace(/\s/g, '&nbsp;');
        msg = JSON.parse(msg);
        var newsDetail = msg.jData.News;
        if (newsDetail.Text.substring(0, 5) == '{url:') {
          window.location.href='pobo:uncheck=1&pageId=900004&url=' + newsDetail.Text + '?title=详细信息';
          return;
        }
        document.getElementsByClassName('.title').innerHTML(newsDetail.Title);
        document.getElementsByClassName('.time').innerHTML(newsDetail.Pubtime);
        document.getElementsByClassName('.provider').innerHTML(newsDetail.Source);
        document.getElementsByClassName('.content').innerHTML(newsDetail.Text);

      },
      initPage(){
        if (pbPage.getInitState()) {
          pbPage.addModuleCallback(90011, this.callback_90011);
          pbPage.addReloadFun(this.pageReload);

        } else {
          pbPage.initPage({
            reload: this.pageReload,
            callbacks: [{module: 90011, callback: this.callback_90011}]
          });
          this.pageReload();
        }
      },
      pageReload(){

      }
    }
  }
</script>