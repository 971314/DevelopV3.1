import Vue from 'vue'
import VueRouter from 'vue-router';
import Impression from 'vue-impression';

import Axios from 'axios';

import pbUI from '../../components'

import mrkHot from './view/mrkHot.vue';
import zjlx from './view/zjlx.vue';
import zjcd from './view/zjcd.vue';
import hypz from './view/hypz.vue';
import details from './components/details.vue';


Vue.use(Impression);
Vue.use(pbUI);
Vue.use(VueRouter)
/*Vue.use(Axios)*/


const routers = new VueRouter({
  routes: [
    {path: '/', redirect: '/mrkHot'},
    {
      path: '/mrkHot', component: mrkHot,
      children: [
        {path: '', component: zjlx},
        {path: '/mrkHot/zjlx',   component: zjlx},
        {path: '/mrkHot/zjcd',  component: zjcd},
        {path: '/mrkHot/hypz',  component: hypz}
      ]
    },
    {path: '/details', component: details}
  ]
})

window.parseJSON = function (text) {
  var tempStr = text.replace(/\r\n/g, "").replace(/\n/g, "").replace(/\\/g, "/");
  return JSON.parse(tempStr);
}


new Vue({
  router:routers
}).$mount('#app');
