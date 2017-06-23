<template>
  <div class="index">
    <div v-for="com in rootCop">
      <component :is="com.name"></component>
    </div>
  </div>
</template>

<script>

import CommitFuc from './components/coCommitFuc.vue';
import MainFunc from './components/coMainFunc.vue';
import NoticeAdv from './components/coNoticeAdv.vue';
import NewsListSpe from './components/coNewsListSpe.vue';
import Advert from './components/coAdvert.vue';
import NavBarSpe from './components/coNavBarSpe.vue';
export default {
  name: 'Index',
  data () {
    return {
      rootCop: [],//组件数组
    }
  },
  components: {
    CommitFuc,
    MainFunc,
    NoticeAdv,
    NewsListSpe,
    Advert,
    NavBarSpe
  },
  methods: {
    getMainSet() {//获取配置文件的组件信息
      if (pbE.isPoboApp) {
        var infoAll = JSON.parse(pbE.SYS().readConfig("main/conf/mainSet.json")),
            infoAllList = infoAll['infoAll'];
        for (var i = 0; i < infoAllList.length; i++) {
          var tempObj = {};
          tempObj['name'] =  infoAllList[i].coType;
          this.rootCop.push(tempObj);
        }
      }else {
        this.$axios.get('../conf/mainSet.json').then((data) => {
          var infoAll = data.data,
              infoAllList = infoAll['infoAll'];
          for (var i = 0; i < infoAllList.length; i++) {
            var tempObj = {};
            tempObj['name'] =  infoAllList[i].coType;
            this.rootCop.push(tempObj);
          }
        }).catch((err) => {
          console.log('读取失败!',err);
        });
      }
    },
    getLocalUserInfo () {//首次登陆存储用户数据
      if (pbE.isPoboApp && pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token')) {
        var DeviceJsonInfo = JSON.parse(pbE.SYS().getDeviceJsonInfo()),
            postData = {
              func: 611,
              cOrgid: DeviceJsonInfo.jgid,
              cUserid: pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId'),
              token: pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token'),
              data: {
                cLoginname: pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName')
              }
            };
        this.$axios.post(pbRC.RHS('myapply', 'url'), postData).then((axiosData) => {
          var localUserInfo = axiosData.data.data;
          pbE.SYS().storePrivateData('H5_Local_User_Info', JSON.stringify(localUserInfo));
        }).catch((error) => {
          console.error(error);
        });
      }
    }
  },
  created () {
    this.getMainSet && this.getMainSet(); //获取组件配置信息
    this.getLocalUserInfo && this.getLocalUserInfo(); //获取用户数据
    // this.$axios.get('../conf/cfMainConf.json')
    // .then((data) => {
    //   data = data.data;
    //   console.log(data);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }
}
</script>