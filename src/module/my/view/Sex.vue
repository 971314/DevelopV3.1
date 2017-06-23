<template>
  <div class="sex">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a>
      </div>
      <div slot="body" id="title">
        性别
      </div>
      <div slot="footer">
        <span @click="save">保存</span>
      </div>
    </navbar>
    <group>
      <cell @click="setSex(1)" :hasArrow="hasArrow">
        男
        <span v-show="sexFlag == 1" slot="footer">√</span>
      </cell>
      <cell @click="setSex(2)" :hasArrow="hasArrow">
        女
        <span v-show="sexFlag == 2" slot="footer">√</span>
      </cell>
    </group>
  </div>
</template>

<script>
export default {
  props: ['ws', 'userAutInfo', 'userInfo'],
  data () {
    return {
      sexFlag: this.userInfo.sexFlag,
      hasArrow: false
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = 'none';
  },
  methods: {
    setSex (flag) {
      this.sexFlag = flag;
    },
    save () {
      var _this = this;
      if (_this.sexFlag && _this.sexFlag != _this.userInfo.sexFlag) {
        _this.userInfo.sexFlag = _this.sexFlag;
        if (pbE.isPoboApp) {
          var localUserInfo = JSON.parse(pbE.SYS().getPrivateData('H5_Local_User_Info'));
          localUserInfo.cSex = _this.sexFlag;
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
            cSex: _this.sexFlag + ''
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