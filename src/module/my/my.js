import Vue from 'vue';
import VueRouter from 'vue-router';
import Impression from 'vue-impression';
import Axios from 'axios';
import Index from './Index.vue';
import My from './view/My.vue';
import Userinfo from './view/Userinfo.vue';
import All from './view/All.vue';
import Avatar from './view/Avatar.vue';
import Nickname from './view/Nickname.vue';
import Sex from './view/Sex.vue';
import Age from './view/Age.vue';
import Job from './view/Job.vue';
import Mail from './view/Mail.vue';
import Password from './view/Password.vue';
import Risk from './view/Risk.vue';
import Qii from './view/Qii.vue';
import Qnr from './view/Qnr.vue';
import Rslt from './view/Rslt.vue';
import CoList from './view/CoList.vue';
import Invitation from './view/invitation.vue';
import pbUI from '../../components';
import SetInfo from './view/SetInfo.vue';

Vue.use(pbUI);
Vue.use(Impression);
Vue.use(VueRouter);
Vue.prototype.$axios = Axios;

const router = new VueRouter({
  routes:[
    { path: '/', component: My },
    { path: '/list', component: CoList }, //list
    { path: '/invitation', component: Invitation }, //invitation
    {
      path: '/risk', //risk
      component: Risk,
      children: [
        { path:'',component: Qii },
        { path:'qnr',component: Qnr }, //qnr
        { path:'rslt/:rslt',component: Rslt } //rslt/:rslt
      ]
    },
    {
      path: '/userinfo', //userinfo
      component: Userinfo,
      children: [
        { path:'',component: All },
        { path:'avatar',component: Avatar }, //avatar
        { path:'nickname',component: Nickname }, //nickname
        { path:'sex',component: Sex }, //sex
        { path:'age',component: Age }, //age
        { path:'job',component: Job }, //job
        { path:'mail',component: Mail }, //mail
        { path:'pwd',component: Password } //pwd
      ]
    },
    {
      path:'/set', //set
      component: SetInfo
    }
  ]
});

const index = new Vue({
  el: '#app',
  router,
  render: h => h(Index)
});
