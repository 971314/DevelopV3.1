webpackJsonp([16],{386:function(t,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={data:function(){return{v:"",sl:0,jsj:0,ss:0}},methods:{},computed:{res:function(){return _.round((this.sl?this.sl:0)*(this.jsj?this.jsj:0)*(this.ss?this.ss:0)*.15,2)}}}},449:function(t,s,e){s=t.exports=e(4)(),s.push([t.id,"",""])},525:function(t,s,e){e(565);var n=e(3)(e(386),e(534),null,null);t.exports=n.exports},534:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"full-height bg-color22"},[e("common-nav",[e("div",{slot:"body"},[t._v("\n            保证金计算\n        ")])]),t._v(" "),e("div",{staticClass:"container"},[e("div",{staticClass:"computed-result"},[e("div",{staticClass:"result",domProps:{textContent:t._s(t.res)}},[t._v("0000.00")]),t._v(" "),e("div",{staticClass:"text"},[t._v("保证金占用")])]),t._v(" "),e("div",[e("mt-cell",{attrs:{title:"每手数量"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.sl,expression:"sl"}],staticClass:"cell-input",attrs:{type:"number"},domProps:{value:t._s(t.sl)},on:{input:function(s){s.target.composing||(t.sl=t._n(s.target.value))},blur:function(s){t.$forceUpdate()}}})]),t._v(" "),e("mt-cell",{attrs:{title:"昨天结算价"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.jsj,expression:"jsj"}],staticClass:"cell-input",attrs:{type:"number"},domProps:{value:t._s(t.jsj)},on:{input:function(s){s.target.composing||(t.jsj=t._n(s.target.value))},blur:function(s){t.$forceUpdate()}}})]),t._v(" "),e("mt-cell",{attrs:{title:"交易手数"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.ss,expression:"ss"}],staticClass:"cell-input",attrs:{type:"number"},domProps:{value:t._s(t.ss)},on:{input:function(s){s.target.composing||(t.ss=t._n(s.target.value))},blur:function(s){t.$forceUpdate()}}})])],1),t._v(" "),e("div",{staticStyle:{padding:"50px 10px 10px 10px"}},[e("mt-button",{attrs:{type:"danger",size:"large"}},[t._v("计算")])],1),t._v(" "),e("div",{staticClass:"font-11 text-color18",staticStyle:{padding:"10px"}},[t._v("\n            保证金占用=保证金比例*昨天结算价*没手数量*手数以上所有合约保证金按照15%的比例计算，实际保证金占用按照真实账户收取为准\n        ")])])],1)},staticRenderFns:[]}},565:function(t,s,e){var n=e(449);"string"==typeof n&&(n=[[t.id,n,""]]),n.locals&&(t.exports=n.locals);e(5)("64e129f9",n,!0)}});