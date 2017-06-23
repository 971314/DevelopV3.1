<template>
  <div class="all">
    <group>
      <cell to="/userinfo/avatar" :hasArrow="hasArrow">
        头像
        <img v-if="userInfo.avatar" class="avatar" slot="footer" :src="userInfo.avatar">
        <img v-else class="avatar" slot="footer" src="../images/avatar.png">
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
      <cell to="/userinfo/nickname" :hasArrow="hasArrow">
        昵称
        <span slot="footer">{{ userInfo.nickname }}</span>
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
      <cell to="/userinfo/sex" :hasArrow="hasArrow">
        性别
        <span slot="footer">{{ sex }}</span>
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
      <cell to="/userinfo/age" :hasArrow="hasArrow">
        年龄
        <span slot="footer">{{ age }}</span>
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
      <cell to="/userinfo/job" class="job" :hasArrow="hasArrow">
        职业
        <span slot="footer">{{ userInfo.job }}</span>
        <span slot="footer"><img class="more" src="../../../assets/images/arrow-right.png"></span>
      </cell>
      <cell to="/userinfo/mail" :hasArrow="hasArrow">
        邮箱
        <span slot="footer">{{ cipherMail }}</span>
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
      <cell @click="verifyPwd" :hasArrow="hasArrow">
        登录密码
        <span slot="footer">修改</span>
        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
      </cell>
    </group>
    <div class="completion">
      <div class="circle">
        <svg viewBox="0 0 100 100">
          <path d="M 50,50 m 0,-47
              a 47,47 0 1 1 0,94
              a 47,47 0 1 1 0,-94" stroke="#dfdfdf" stroke-width="5" fill-opacity="0">
          </path>
          <path d="M 50,50 m 0,-47
              a 47,47 0 1 1 0,94
              a 47,47 0 1 1 0,-94" stroke-linecap="round" stroke="#eb1212" stroke-width="6" fill-opacity="0" style="stroke-dasharray: 295.31px, 295.31px; transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease;" :style="{ 'stroke-dashoffset': dashoffset + 'px' }">
          </path>
        </svg>
        <div v-if="completion < 100" class="circle-inner">
          <span>{{ completion }}</span><span>%</span>
        </div>
        <div v-else class="circle-inner">
          <span class="bolder">√</span>
        </div>
      </div>
      <p>资料完成度</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: ['userInfo'],
  data () {
    return {
      hasArrow: false
    }
  },
  computed: {
    sex: function () {
      if (this.userInfo.sexFlag) {
        var sex = this.getSex(this.userInfo.sexFlag);
        return sex;
      }
      return '';
    },
    age: function () {
      if (this.userInfo.birthday) {
        var age = this.getAge(this.userInfo.birthday);
        this.userInfo.age = age;
        return age;
      }
      return '';
    },
    cipherMail: function () {
      if (this.userInfo.mail) {
        var cipherMail = this.getCipherMail(this.userInfo.mail);
        this.userInfo.cipherMail = cipherMail;
        return cipherMail;
      }
      return '';
    },
    completion: function () {
      var completeNum = 0;
      if (this.userInfo.avatar) completeNum++;
      if (this.userInfo.nickname) completeNum++;
      if (this.userInfo.sexFlag) completeNum++;
      if (this.userInfo.birthday) completeNum++;
      if (this.userInfo.job) completeNum++;
      if (this.userInfo.mail) completeNum++;
      return Math.round(completeNum / 6 * 100);
    },
    dashoffset: function () {
      return (100 - this.completion) * 2.9531;
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = '';
  },
  methods: {
    getSex (flag) {
      if (flag == '1') {
        return '男';
      } else if (flag == '2') {
        return '女';
      }
      return '未知';
    },
    getAge (birthday) {
      var from = moment(birthday);
      var to = moment();
      var age = to.diff(from, 'years');
      return age;
    },
    getCipherMail (mail) {
      var index = mail.indexOf('@');
      var mailname = mail.substr(0, index);
      var maildomain = mail.substr(index);

      if (mailname.length > 3) {
        mailname = mailname.substr(0, 3) + '***';
      } else {
        mailname = mailname + '***';
      }
      return mailname + maildomain;
    },
    verifyPwd () {
      var _this = this;
      _this.$alert({
        btns: [{
          text: '取消'
        }, {
          text: '确定',
          click() {
            var password = document.getElementById('password').value;
            if (pbE.isPoboApp && pbE.SYS().verifyCertifyPwd(password)) {
              _this.userInfo.password = password;
              _this.$router.push('/userinfo/pwd');
            } else {
              alert('密码错误');
            }
          },
        }],
        title: '验证原密码',
        message: '<p>为保障您的数据安全，修改密码前请填写原密码。</p><input id="password" type="password" placeholder="请输入原密码" />',
      });
    }
  }
}
</script>