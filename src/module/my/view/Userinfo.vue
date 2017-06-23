<template>
  <div class="user-info">
    <navbar id="userinfoNavbar">
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a><a class="search" href="pobo:uncheck=1&pageId=800013">
          <img src="../../../assets/images/title-search.png">
        </a>
      </div>
      <div slot="body" id="title">
        资料管理
      </div>
      <div slot="footer">
        <message-icon></message-icon>
        <a class="service" href="javascript:void(0)">
          <img src="../../../assets/images/service.png">
        </a>
      </div>
    </navbar>
    <div>
      <router-view :ws="ws" :userAutInfo="userAutInfo" :userInfo="userInfo"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ws: pbRC.RHS('myapply', 'url'),
      userAutInfo: {
        cOrgid: '',
        cUserid: '',
        token: '',
        cLoginname: ''
      },
      userInfo: {
        id: '',
        avatar: '',
        nickname: '',
        sexFlag: '',
        birthday: '',
        jobFlag: '',
        job: '',
        mail: ''
      }
    }
  },
  created () {
    if (pbE.isPoboApp) {
      var _this = this;
      var DeviceJsonInfo = JSON.parse(pbE.SYS().getDeviceJsonInfo());
      _this.userAutInfo.cOrgid = DeviceJsonInfo.jgid;
      _this.userAutInfo.cUserid = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId');
      _this.userAutInfo.token = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token');
      _this.userAutInfo.cLoginname = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
      var localUserInfo = JSON.parse(pbE.SYS().getPrivateData('H5_Local_User_Info'));
      _this.userInfo.id = localUserInfo.cId;
      _this.userInfo.avatar = localUserInfo.cIcon;
      _this.userInfo.nickname = localUserInfo.cPetname;
      _this.userInfo.sexFlag = localUserInfo.cSex;
      _this.userInfo.birthday = localUserInfo.cBirthday;
      _this.userInfo.jobFlag = localUserInfo.cProfession;
      _this.userInfo.job = localUserInfo.cProname;
      _this.userInfo.mail = localUserInfo.cMail;
    }
  }
}
</script>