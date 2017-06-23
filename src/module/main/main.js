import Vue from 'vue';
import Impression from 'vue-impression';
import Index from './Index.vue';
import pbUI from '../../components';
import Axios from 'axios';

Vue.prototype.$axios = Axios;
Vue.use(Impression);
Vue.use(pbUI);

const index = new Vue({
  el: '#app',
  render: h => h(Index)
});
