<template>
  <div class="nickname">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a>
      </div>
      <div slot="body" id="title">
        昵称
      </div>
      <div slot="footer">
        <span @click="save">保存</span>
      </div>
    </navbar>
    <div class="input">
      <input type="text" v-model="nickname" placeholder="请输入昵称" maxlength="10">
      <img v-show="nickname" @click="clear" src="../images/delete.png">
    </div>
  </div>
</template>

<script>
export default {
  props: ['ws', 'userAutInfo', 'userInfo'],
  data () {
    return {
      nickname: this.userInfo.nickname
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = 'none';
  },
  methods: {
    clear () {
      this.nickname = '';
    },
    save () {
      var _this = this;
      if (_this.nickname && _this.nickname != _this.userInfo.nickname) {
        _this.userInfo.nickname = _this.nickname;
        if (pbE.isPoboApp) {
          var localUserInfo = JSON.parse(pbE.SYS().getPrivateData('H5_Local_User_Info'));
          localUserInfo.cPetname = _this.nickname;
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
            cPetname: _this.nickname
          }
        }).then(function (axiosData) {
          var data = axiosData.data;
        }).catch(function (error) {
          console.error(error);
        });
      }
      _this.$router.replace('/userinfo');
    }
  }
}
</script>