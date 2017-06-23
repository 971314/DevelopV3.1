<template>
  <div class="details">
   <navbar theme="default">
      <a href="close">
          <icon name="chevron-left" size="lg"></icon>
      </a>
      <span slot="body">详细信息</span>
  </navbar>


    <div class="news">
      <h4 id="title"></h4>
      <p id="info">来源：&nbsp;<span id="provider"></span><span id="time"><!--2017-4-1 8:03:57--></span></p>
      <p id="content"></p>
      <div class="operate">
        <div class="sc">
          <button v-if="ysc=='false' || ysc==false" @click="collect" style="background-image: url('images/wsc.png')">收藏</button>
          <button v-else-if="ysc=='true' || ysc==true" @click="cancelCollect" style="background-image: url('images/ysc.png')">取消收藏</button>
        </div>
        <div class="zan" @click="warning"><button>51</button></div>
        <div class="fx"><a v-bind:href="'pobo:pageId=800012&type=0&title=' + title + '&des=' + title + '&url='+ shareUrl"></a></div></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {pbNewsShareUrl} from '../../../assets/js/constants.js';

  export default {
    data () {
      return {
        collectws: pbRC.RHS('collect', 'url'),
        infoid: '',  //新闻id
        title: '',  //新闻标题
        thumbid: '', //缩略图id
        source: '1', //来源
        infotime: '', //新闻时间
        //url: '', //新闻url
        uid: '', //认证userId
        loginname: '', //手机号
        sid: '', //认证中心token
        orgid: '1998', //机构编号
        ysc: 'false',
        sourcedetail: '',
        shareUrl:''
      }
    },

    mounted: function () {
      this.infoid = this.$route.params.id;
      console.log(pbNewsShareUrl);
      this.shareUrl = window.encodeURIComponent(pbNewsShareUrl + this.infoid);
      this.loginname = pbE.SYS().getAppCertifyInfo("PbKey_H5_Home_Auth_LoginName");
      this.sid = pbE.SYS().getAppCertifyInfo("PbKey_H5_Home_Auth_Token");
      this.uid = pbE.SYS().getAppCertifyInfo("PbKey_H5_Home_Auth_UserId");
      var deviceInfo1 = pbE.SYS().getDeviceJsonInfo();
      if (deviceInfo1) {
        var deviceInfo = JSON.parse(deviceInfo1);
        if (deviceInfo['jgid']) {
            this.orgid = deviceInfo['jgid'];  //机构代码/券商编号
        }
      }
      this.queryStatus();
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
      //     this.title = newsDetail.Title.replace(/%+/g,"百分点");
      //     this.infotime = newsDetail.Pubtime.replace("&nbsp;"," ");
      //     this.sourcedetail = newsDetail.Source;
      //     document.getElementById('title').innerHTML = newsDetail.Title;
      //     document.getElementById('time').innerHTML = newsDetail.Pubtime;
      //     document.getElementById('provider').innerHTML = newsDetail.Source;
      //     document.getElementById('content').innerHTML = newsDetail.Text;
      //   }
      // }.bind(this);
    },

    methods: {
      callback_90013(msg) {
        msg = msg.replace(/\n/g, '<br>');
        msg = msg.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        msg = msg.replace(/\s/g, '&nbsp;');
        msg = JSON.parse(msg);
        var newsDetail = msg.jData.News;
        if (newsDetail.Text.substring(0, 5) == '{url:') {
          window.location.href='pobo:uncheck=1&pageId=900004&url=' + newsDetail.Text + '?title=详细信息';
          return;
        }
        this.title = newsDetail.Title.replace(/%+/g,"百分点");
        this.infotime = newsDetail.Pubtime.replace("&nbsp;"," ");
        this.sourcedetail = newsDetail.Source;
        document.getElementById('title').innerHTML = newsDetail.Title;
        document.getElementById('time').innerHTML = newsDetail.Pubtime;
        document.getElementById('provider').innerHTML = newsDetail.Source;
        document.getElementById('content').innerHTML = newsDetail.Text;
      },
      initPage(){
        if (pbPage.getInitState()) {
          pbPage.addModuleCallback(90013, this.callback_90013);
          pbPage.addReloadFun(this.pageReload);

        } else {
          pbPage.initPage({
            reload: this.pageReload,
            callbacks: [{module: 90013, callback: this.callback_90013}]
          });
          this.pageReload();
        }

      },
      pageReload(){

      },
      collect () {
        var _this = this;
        var data = {
          "func": '653',//功能号
          "uid": _this.uid,//认证中心用户编号
          "loginname": _this.loginname,//手机号
          "sid": _this.sid,//认证中心token
          "orgid": _this.orgid,//机构编号
          "data": [{
              "url": "",//收藏url
              "title": _this.title,//收藏标题
              "infoid": _this.infoid,//收藏资讯ID
              "thumbid": _this.thumbid,//缩略图ID
              "source": _this.source,//来源
              "sourcedetail":_this.sourcedetail,
              "infotime":_this.infotime
          }]
        };
        console.log(data);
        axios.post(_this.collectws, data
          )
          .then(function(res){
            console.log(res);
            if(res.data.retHead == '0'){
              _this.ysc = 'true';
              _this.$toast("已收藏");
            }
            /*_this.ysc = true;
            _this.$toast("已收藏");*/
          })
          .catch(function(err){
              console.log(err);
          })
      },

      cancelCollect() {
        var _this = this;
        var data = {
          "func": '655',//功能号
          "uid": _this.uid,//认证中心用户编号
          "loginname": _this.loginname,//手机号
          "sid": _this.sid,//认证中心token
          "orgid": _this.orgid,//机构编号
          "data": [{
              "infoid": _this.infoid,//收藏资讯ID
          }]
        };
        console.log(data);
        axios.post(_this.collectws, data
          )
          .then(function(res){
            console.log(res);
            if(res.data.retHead == '0'){
              _this.ysc = 'false';
              _this.$toast("收藏已取消");
            }
            /*_this.ysc = false;
            _this.$toast("收藏已取消");*/
          })
          .catch(function(err){
              console.log(err);
          })
      },

      warning() {
        this.$toast("此功能尚未开通");
      },

      queryStatus() {
        var _this = this;
        var data = {
          "func": '654',//功能号
          "uid": _this.uid,//认证中心用户编号
          "loginname": _this.loginname,//手机号
          "sid": _this.sid,//认证中心token
          "orgid": _this.orgid,//机构编号
          "data": [{
              "infoid": _this.infoid,//收藏资讯ID
          }]
        };
        axios.post(_this.collectws, data
          )
          .then(function(res){
            console.log(res);
            if(res.data.retHead == '0'){
              _this.ysc = res.data.data[0].collected;
              console.log(_this.ysc);
            }
          })
          .catch(function(err){
              console.log(err);
          })
      }
    }
  }
</script>