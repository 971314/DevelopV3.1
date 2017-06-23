<template>
  <div class="job">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a>
      </div>
      <div slot="body" id="title">
        职业
      </div>
      <div slot="footer">
        <span @click="save">保存</span>
      </div>
    </navbar>
    <group>
      <cell v-for="job in jobList" @click="setJob(job.cProid, job.cProname)" :hasArrow="hasArrow">
        {{ job.cProname }}
        <span v-show="jobFlag == job.cProid" slot="footer">√</span>
      </cell>
    </group>
  </div>
</template>

<script>
export default {
  props: ['ws', 'userAutInfo', 'userInfo'],
  data () {
    return {
      jobFlag: this.userInfo.jobFlag,
      job: this.userInfo.job,
      jobList: [],
      hasArrow: false
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = 'none';
    var _this = this;
    _this.$axios.post(_this.ws, {
      func: 613,
      cOrgid: _this.userAutInfo.cOrgid,
      cUserid: _this.userAutInfo.cUserid,
      token: _this.userAutInfo.token,
      data: null
    }).then(function (axiosData) {
      var data = axiosData.data;
      _this.jobList = data.data;
    }).catch(function (error) {
      console.error(error);
    });
  },
  methods: {
    setJob (jobFlag, job) {
      this.jobFlag = jobFlag;
      this.job = job;
    },
    save () {
      var _this = this;
      if (_this.jobFlag && _this.jobFlag != _this.userInfo.jobFlag) {
        _this.userInfo.jobFlag = _this.jobFlag;
        _this.userInfo.job = _this.job;
        if (pbE.isPoboApp) {
          var localUserInfo = JSON.parse(pbE.SYS().getPrivateData('H5_Local_User_Info'));
          localUserInfo.cProfession = _this.jobFlag;
          localUserInfo.cProname = _this.job;
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
            cProfession: _this.jobFlag + ''
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