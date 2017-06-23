/**
 * Created by kuo zi on 2016/10/12.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Institution from '../view/institution.vue'
import Variety from '../view/variety.vue'
import CheckCompany from '../view/checkCompany.vue'
import ProductRanking from '../view/productRanking.vue'
import ProductRankingByCompany from '../view/productRankingByCompany.vue'
import InstitutionChart from '../view/institutionChart.vue'
import Inventory from '../view/inventory.vue'

Vue.use(Router)
let router = new Router({
  // history模式需要后台支持
  // mode: "history",
  scrollBehavior: () => ({y: 0}),
  routes: [{
    path: '/',
    meta: {noAuth: true},
    component: Variety
  }, {
    name: 'institution', //选择公司页面
    path: '/institution',
    meta: {noAuth: true},
    component: Institution
  }, {
    name: 'variety', //选择公司页面
    path: '/variety',
    meta: {noAuth: true},
    component: Variety
  }, {
    name: 'checkCompany', //选择期货公司公司
    path: '/checkCompany',
    component: CheckCompany
  }, {
    name: 'productRanking', //选择品种页面列表排序
    path: '/productRanking',
    component: ProductRanking
  }, {
    name: 'productRankingByCompany', //按照公司ID来排序列表
    path: '/productRankingByCompany',
    component: ProductRankingByCompany
  }, {
    name: 'institutionChart', //机构动向图表
    path: '/institutionChart',
    component: InstitutionChart
  }, {
    name: 'inventory', //库存仓单
    path: '/inventory',
    component: Inventory
  }]
})
//路由跳转钱操作
router.beforeEach((to, form, next) => {
  // 登录过滤
  if (to.meta.login && !window.login) {
    next({name: 'login', query: {path: to.fullPath}})
  } else {
    if (to.fullPath.match('http')) {
      console.log(to.fullPath.replace('/', ''))
      window.location.href = to.fullPath.replace('/', '')
    }
    if (to.fullPath.match('www')) {
      window.location.href = to.fullPath.replace('/', 'http://')
    }
    next()
  }
})

export default router
