<template>
  <div class="mail">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a>
      </div>
      <div slot="body" id="title">
        邮箱
      </div>
      <div slot="footer">
        <span @click="save">保存</span>
      </div>
    </navbar>
    <div class="input">
      <input type="text" v-model="mail" placeholder="请输入邮箱">
      <img v-show="mail" @click="clear" src="../images/delete.png">
    </div>
  </div>
</template>

<script>
export default {
  props: ['ws', 'userAutInfo', 'userInfo'],
  data () {
    return {
      mail: this.userInfo.cipherMail
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = 'none';
  },
  methods: {
    clear () {
      this.mail = '';
    },
    save () {
      var _this = this;
      if (_this.mail.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
        if (_this.mail != _this.userInfo.mail) {
          _this.userInfo.mail = _this.mail;
          if (pbE.isPoboApp) {
            var localUserInfo = JSON.parse(pbE.SYS().getPrivateData('H5_Local_User_Info'));
            localUserInfo.cMail = _this.mail;
            pbE.SYS().storePrivateData('H5_Local_User_Info', JSON.stringify(localUserInfo));
          }
          _this.$axios.post(_this.ws, {
            func: 612,
            cOrgid: _this.userAutInfo.cOrgid,
            cUserid: _this.userAutInfo.cUserid,
            token: _this.userAutInfo.token,
            data: {
              cId: _this.userInfo.id,
              cLoginname: _this.userAutInfo.cLoginname,
              cMail: _this.mail
            }
          }).then(function (axiosData) {
            var data = axiosData.data;
          }).catch(function (error) {
            console.error(error);
          });
        }
        _this.$router.replace('/userinfo');
      } else {
        alert('请输入正确的邮箱地址');
      }
    }
  }
}
</script>