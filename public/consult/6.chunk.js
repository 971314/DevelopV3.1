webpackJsonp([6],{14:function(o,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=void 0;e="https://test.yunyesoft.com/consult/";t.projectPath=e,t.PrefixImg="https://test.yunyesoft.com/fsimg/",t.WxMenuConf="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx638babfb858e32f8&redirect_uri=http%3a%2f%2fservice.yunyesoft.com%2fjifen%2findex.html%3fpath%3d${path}%26params%3d${params}%26merchantNum%3d${merchantNum}&response_type=code&scope=snsapi_base&state=mineauth#wechat_redirect",t.codes={hyhd:{name:"会议活动",code:"005001"},schd:{name:"市场活动",code:"005002"}},t.parts={pbcjxw:{name:"首页-财经新闻",part:"PBCJXW"},pbsyrdjd:{name:"首页-热点解读",part:"PBSYRDJD"},pbscgg:{name:"首页-市场公告",part:"PBSCGG"},pbxgxw:{name:"新闻组件-相关新闻",part:"PBXGXW"},pbpzyb:{name:"新闻组件-品种研报",part:"PBPZYB"},pbgjscgg:{name:"新闻组件-市场公告",part:"PBGJSCGG"},pbqhjc:{name:"期货学院-期货基础",part:"PBQHJC"},pbqqjc:{name:"期货学院-期货期权基础",part:"PBQQJC"},pbjbmfx:{name:"期货学院-投资分析-基本面分析",part:"PBJBMFX"},pbjsmfx:{name:"期货学院-投资分析-技术面分析",part:"PBJSMFX"},pbjdtzll:{name:"期货学院-投资理论-经典投资理论",part:"PBJDTZLL"},pbcggw2:{name:"期货学院-投资理论-草根感悟",part:"PBCGGW2"},pbpxxxgg:{name:"培训信息-培训信息广告区",part:"PBPXXXGG"},pbhyhd:{name:"培训信息-会议活动",part:"PBHYHD"},pbschd:{name:"培训信息-市场活动",part:"PBSCHD"},pbhyhg:{name:"培训信息-会议回顾",part:"PBHYHG"},pbmrzp:{name:"建投优选-每日早评",part:"PBMRZP"},pbyfbg:{name:"建投优选-研发报告",part:"PBYFBG"},pbcjyw:{name:"建投优选-财经新闻",part:"PBCJYW"},pbzxrdjd:{name:"建投优选-热点解读",part:"PBZXRDJD"},pbrczp:{name:"走进中信建投-人才招聘",part:"PBRCZP"},pbgjjyrl:{name:"交易日历",part:"PBGJJYRL"}},t.slImg="newsBase/shortImg"},29:function(o,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=r(14);t.default={props:{infos:{type:Array,default:[]}},data:function(){return{slImg:e.slImg}}}},31:function(o,t,r){t=o.exports=r(4)(),t.push([o.id,".text-info{color:#eb1212}.bg-info{background:#eb1212}.text-color1{color:#36c}.text-color2{color:#fe0000}.text-color3{color:#14a238}.text-color4{color:#1dbf60}.text-color5{color:#f75f5f}.text-color15{color:#fff}.text-color16{color:#b6bbc2}.text-color17{color:#808086}.text-color18{color:#1a1a1a}.text-color22{color:#f7f7fa}.text-color23{color:#e4e7f0}.text-color26{color:#e6e6ec}.text-color28{color:#dfdfdf}.text-color29{color:#5c90f9}.text-color45{color:#f0f1f2}.text-color46{color:#4c4c55}.text-color47{color:#c0c6cd}.text-color48{color:#f7f8f9}.text-color49{color:#ecf8fd}.text-color50{color:#2868e8}.text-color51{color:#add79a}.text-color52{color:#fb8463}.bg-color1{background:#36c}.bg-color2{background:#fe0000}.bg-color3{background:#14a238}.bg-color4{background:#1dbf60}.bg-color5{background:#f75f5f}.bg-color15{background:#fff}.bg-color16{background:#b6bbc2}.bg-color17{background:#808086}.bg-color18{background:#1a1a1a}.bg-color22{background:#f7f7fa}.bg-color23{background:#e4e7f0}.bg-color26{background:#e6e6ec}.bg-color28{background:#dfdfdf}.bg-color29{background:#5c90f9}.bg-color45{background:#f0f1f2}.bg-color46{background:#4c4c55}.bg-color47{background:#c0c6cd}.bg-color48{background:#f7f8f9}.bg-color49{background:#ecf8fd}.bg-color50{background:#2868e8}.bg-color51{background:#add79a}.bg-color52{background:#fb8463}.font-10{font-size:15px}.font-11{font-size:12px}.font-13{font-size:11px}.font-14{font-size:10px}.font-19{font-size:9px}.font-20{font-size:8px}.font-23{font-size:13px}.font-24{font-size:17px}.font-25{font-size:18px}.font-26{font-size:14px}.font-28{font-size:21px}.font-29{font-size:19px}.font-30{font-size:40px}.font-32{font-size:18px}.font-33{font-size:16px}.font-34{font-size:19px}.font-35{font-size:20px}.font-36{font-size:25px}.font-37{font-size:22px}.list{display:-webkit-box;display:flex;padding:10px;height:83px;border-bottom:1px solid #e4e7f0}.list .list-info{-webkit-box-flex:1;flex:1}.list .list-info .info-title{height:42px;line-height:1.5;margin-top:2px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:14px;color:#1a1a1a}.list .list-info .info-more{margin-top:2px;font-size:10px;color:#808086}.list .list-img{width:102px}.list .list-img img{display:block;width:92px;height:63px;margin-left:10px}",""])},33:function(o,t,r){r(35);var e=r(3)(r(29),r(34),null,null);o.exports=e.exports},34:function(o,t){o.exports={render:function(){var o=this,t=o.$createElement,r=o._self._c||t;return r("div",o._l(o.infos,function(t){return r("router-link",{staticClass:"list",attrs:{to:{name:"detail",query:{cId:t.id}},tag:"div"}},[r("div",{staticClass:"list-info"},[r("div",{staticClass:"info-title",domProps:{textContent:o._s(t.infotitle)}}),o._v(" "),r("div",{staticClass:"info-more"},[r("span",{domProps:{textContent:o._s(t.source)}}),o._v(" "+o._s(o._f("dateFmt")(t.pushdate,"MM-dd hh:mm")))])]),o._v(" "),r("div",{staticClass:"list-img"},[r("img",{attrs:{src:o.projectPrefix[0]+o.slImg+"/"+t.thumbid}})])])}))},staticRenderFns:[]}},35:function(o,t,r){var e=r(31);"string"==typeof e&&(e=[[o.id,e,""]]),e.locals&&(o.exports=e.locals);r(5)("d27ad1f2",e,!0)},380:function(o,t,r){"use strict";function e(o){return o&&o.__esModule?o:{default:o}}Object.defineProperty(t,"__esModule",{value:!0});var c=r(55),n=e(c),a=r(33),i=e(a),s=r(14);t.default={components:{"ui-infos":i.default},data:function(){return{parts:s.parts,show:s.parts.pbcjyw.part,pageNo:0,infos:[],loading:!1,noMore:!1}},methods:{change:function(o){this.noMore=!1,this.loading=!1,this.show=o,this.infos=[],this.pageNo=0,this.query()},query:function(){var o=this;return this.loading=!0,this.noMore?this.$toast("没有更多了"):(this.pageNo++,void this.$post("newsBase",{pageNo:this.pageNo,pageSize:this.pageSize,tags:null,part:this.show}).then(function(t){var r=!0,e=!1,c=void 0;try{for(var a,i=(0,n.default)(t.results);!(r=(a=i.next()).done);r=!0){var s=a.value;o.infos.push(s)}}catch(o){e=!0,c=o}finally{try{!r&&i.return&&i.return()}finally{if(e)throw c}}t.results.length<o.pageSize&&(o.noMore=!0),o.loading=!1}))}}}},465:function(o,t,r){t=o.exports=r(4)(),t.push([o.id,".text-info{color:#eb1212}.bg-info{background:#eb1212}.text-color1{color:#36c}.text-color2{color:#fe0000}.text-color3{color:#14a238}.text-color4{color:#1dbf60}.text-color5{color:#f75f5f}.text-color15{color:#fff}.text-color16{color:#b6bbc2}.text-color17{color:#808086}.text-color18{color:#1a1a1a}.text-color22{color:#f7f7fa}.text-color23{color:#e4e7f0}.text-color26{color:#e6e6ec}.text-color28{color:#dfdfdf}.text-color29{color:#5c90f9}.text-color45{color:#f0f1f2}.text-color46{color:#4c4c55}.text-color47{color:#c0c6cd}.text-color48{color:#f7f8f9}.text-color49{color:#ecf8fd}.text-color50{color:#2868e8}.text-color51{color:#add79a}.text-color52{color:#fb8463}.bg-color1{background:#36c}.bg-color2{background:#fe0000}.bg-color3{background:#14a238}.bg-color4{background:#1dbf60}.bg-color5{background:#f75f5f}.bg-color15{background:#fff}.bg-color16{background:#b6bbc2}.bg-color17{background:#808086}.bg-color18{background:#1a1a1a}.bg-color22{background:#f7f7fa}.bg-color23{background:#e4e7f0}.bg-color26{background:#e6e6ec}.bg-color28{background:#dfdfdf}.bg-color29{background:#5c90f9}.bg-color45{background:#f0f1f2}.bg-color46{background:#4c4c55}.bg-color47{background:#c0c6cd}.bg-color48{background:#f7f8f9}.bg-color49{background:#ecf8fd}.bg-color50{background:#2868e8}.bg-color51{background:#add79a}.bg-color52{background:#fb8463}.font-10{font-size:15px}.font-11{font-size:12px}.font-13{font-size:11px}.font-14{font-size:10px}.font-19{font-size:9px}.font-20{font-size:8px}.font-23{font-size:13px}.font-24{font-size:17px}.font-25{font-size:18px}.font-26{font-size:14px}.font-28{font-size:21px}.font-29{font-size:19px}.font-30{font-size:40px}.font-32{font-size:18px}.font-33{font-size:16px}.font-34{font-size:19px}.font-35{font-size:20px}.font-36{font-size:25px}.font-37{font-size:22px}.indNews ul{list-style:none}.indNews .ventor{display:inline-block;cursor:pointer;font-size:16px;width:50%;line-height:30px;font-size:15px;border:1px solid #fff;border-radius:2px}.indNews .active,.indNews .ventor:hover{color:#eb2121;background:#fff}.indNews ul li:first-child{border-top-right-radius:0;border-bottom-right-radius:0}.indNews ul li:last-child{border-top-left-radius:0;border-bottom-left-radius:0}",""])},519:function(o,t,r){r(581);var e=r(3)(r(380),r(551),null,null);o.exports=e.exports},551:function(o,t){o.exports={render:function(){var o=this,t=o.$createElement,r=o._self._c||t;return r("div",{staticClass:"full-height"},[r("common-nav",[r("common-nav",{staticClass:"indNews",attrs:{goback:!1}},[r("ul",{staticStyle:{"line-height":"44px"},slot:"body"},[r("li",{staticClass:"ventor active",attrs:{onclick:"window.location.href='indNews/index.html'"}},[r("span",[o._v("建投优选")])]),r("li",{staticClass:"ventor"},[r("span",[o._v("行业资讯")])])])])],1),o._v(" "),r("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:o.query,expression:"query"}],staticClass:"container",attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"10"}},[r("div",{staticClass:"btn-tabs tab-no-divide"},[r("div",{staticClass:"tabs",class:{active:o.show==o.parts.pbcjyw.part},on:{click:function(t){o.change(o.parts.pbcjyw.part)}}},[r("button",[o._v("财经要闻")])]),o._v(" "),r("div",{staticClass:"tabs",class:{active:o.show==o.parts.pbyfbg.part},on:{click:function(t){o.change(o.parts.pbyfbg.part)}}},[r("button",[o._v("研发报告")])]),o._v(" "),r("div",{staticClass:"tabs",class:{active:o.show==o.parts.pbzxrdjd.part},on:{click:function(t){o.change(o.parts.pbzxrdjd.part)}}},[r("button",[o._v("热点解读")])]),o._v(" "),r("div",{staticClass:"tabs",class:{active:o.show==o.parts.pbmrzp.part},on:{click:function(t){o.change(o.parts.pbmrzp.part)}}},[r("button",[o._v("每日早评")])])]),o._v(" "),r("div",{staticClass:"hr-border-10"}),o._v(" "),r("ui-infos",{attrs:{infos:o.infos}})],1)],1)},staticRenderFns:[]}},581:function(o,t,r){var e=r(465);"string"==typeof e&&(e=[[o.id,e,""]]),e.locals&&(o.exports=e.locals);r(5)("323296aa",e,!0)}});