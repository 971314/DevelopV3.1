<template>
  <div>
    <div id="zjlx-title">
      <span class="col-my-2">序号</span>
      <span class="col-my-1 text-center">品种</span>
      <span class="col-my-1 text-center">金额(亿)</span>
      <span class="col-my-4 text-center">资金流向</span>
    </div>
    <div class="content">
      <div v-for="(item, index) in showList">
        <div @click="note(index)" class="zjlx-row">
        <span class="col-my-2">
         <img v-if="index==0" src="../images/gold.png" width="15" height="20">
         <img v-else-if="index==1" src="../images/silver.png" width="15" height="20">
         <img v-else-if="index==2" src="../images/cu.png" width="15" height="20">
          <btn v-else class="circle" theme="default">{{index + 1}}</btn>
        </span>
          <span class="col-my-1 text-left">{{item.name}}({{item.code}})</span>
          <span class="col-my-1 text-center">{{(item.money/100000000).toFixed(2)}}</span>
          <!--<span class="col-my-1"><progress id="prog1" max=100 value=10 style="color:#0064B4;"></progress>
          </span>-->
          <span class="col-my-4">
          <div style="width:49%; float:left">
            <progressbar :id="'pro1' + index" v-if="item.flag==-1" size="sm" :value="item.pctF"
                         style="width:100%;display:inline-block;"></progressbar>
          </div>


         <div style="width:49%; float:right">
                  <progressbar :id="'pro2' + index" v-if="item.flag==1" size="sm" :value="item.pctZ"
                               style="width:100%;display:inline-block;">
                      <!--10%-->
                  </progressbar>
           </div>
        </span>
        </div>
        <div v-if="item.zl[0]" class="hide" :id="'hideB' + index">
          <div class="fold">
            <span>{{item.zl[0].name}}</span>
            <span>{{item.zl[0].price}}</span>
            <span>{{item.zl[0].zd}}</span>
          </div>
          <div v-if="item.zl[1]" class="fold">
            <span>{{item.zl[1].name}}</span>
            <span>{{item.zl[1].price}}</span>
            <span>{{item.zl[1].zd}}</span>
          </div>
        </div>
        <div v-else-if="!item.zl[0]" class="hide" :id="'hideB' + index">
          <p>品种不活跃，无主力和次主力合约</p>
        </div>
      </div>
    </div>

    <p v-if="allList.length>5" @click="showAll()" class="text-center" style="margin-top:10px;"><img v-if="showFlag<0"
                                                                                                    src="images/click.png"
                                                                                                    width="15"><img
      v-else src="images/fold.png" width="15">&nbsp;&nbsp;<span id="text">点击显示全部</span></p>
    <p style="font-size: 11px;padding-left: 10px; color: #4c4c55;">注：红色表示资金（净）流入，绿色表示（净）流出</p>
    <p style="font-size: 10px;padding-left: 10px; color: #808086;">更新时间：{{date}} {{time}}</p>

    <!--<news-list :newsPar="newsPar" :tabs="newsTabs" :tags="tags"></news-list>-->
  </div>

</template>

<script>
  import NewsList from '../../../components/coNewsList.vue';

  export default {
    data: function () {
      return {
        showList: [],  //渲染的列表
        topList: [],
        allList: [],  //其他所有品种,
        showFlag: '-1', //是否显示全部
        newsPar: [],  //请求新闻的参数，首页使用时置为空
        date: "",
        time: "",
        newsTabs: [{
          name: '相关新闻',
          par: 'PBXGXW'
        }, {
          name: '品种研报',
          par: 'PBPZYB'
        }, {
          name: '市场公告',
          par: 'PBGJSCGG'
        }],
        tags: true,
        userName: "",
        token: "",
        userId: "",
        jgid: "1000",
        sessionTimeOut: "2",
        typePar: {},  //万用组件session
        timer: null
      }
    },

    components: {
      'news-list': NewsList
    },
    destroyed()
    {
      console.log("zjlx beforeRouteLeave");
      clearInterval(this.timer);
    },
    mounted() {
      this.$loading.toggle();
      var _this = this;
      // window.callback = function (message) {
      //   var msg = JSON.parse(message);
      //   if (msg.moduleId = 90008 && msg.functionNO == 101 && msg.jData['type'] == 'ZJLX') {
      //     var max = msg.jData['max'], min = msg.jData['min'], data = msg.jData.data;
      //     var str = "";
      //     //var str = [];
      //     for (var i = 0, j = data.length; i < j; i++) {
      //       var flag = data[i]['flag'],
      //           amount = data[i].amount,
      //           pct;
      //       if (flag > 0) {
      //         if (max == 0) {
      //           data[i]['pctZ'] = 0;
      //           data[i]['pctF'] = 1;
      //         } else {
      //           pct = amount/max;
      //           data[i]['pctZ'] = pct;
      //           data[i]['pctF'] = 1;
      //         }
      //       } else if (flag <= 0) {
      //         if (min == 0) {
      //           data[i]['pctZ'] = 0;
      //           data[i]['pctF'] = 1;
      //         } else {
      //           pct = 1 - amount/min;
      //           data[i]['pctZ'] = 0;
      //           data[i]['pctF'] = pct;
      //         }
      //       }
      //       //str.push(topList[i].name)
      //       if (i < 4) {
      //         str += (data[i].name + ',');
      //       } else if (i == 4) {
      //         str += data[i].name;
      //       }
      //     }
      //     this.topList = data.slice(0, 5);
      //     this.allList = data;
      //     if (this.showList.length == 0) {
      //       this.showList = this.topList;
      //     }
      //     this.newsPar = str;  //品种数据返回之后更新newsPar参数
      //   }
      //   //this.$emit('get-newsPar', this.newsPar)
      // }.bind(this);
      //this.newsPar = "铜, 铝";
      //console.log(this.allList);
      this.initPage();
      this.userName = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo("PbKey_H5_Home_Auth_LoginName") : "";
      this.token = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo("PbKey_H5_Home_Auth_Token") : "";
      this.userId = pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo("PbKey_H5_Home_Auth_UserId") : "";
      var deviceInfo1 = pbE.isPoboApp ? pbE.SYS().getDeviceJsonInfo() : "";
      if (deviceInfo1) {
        var deviceInfo = JSON.parse(deviceInfo1);
        if (deviceInfo['jgid']) {
          this.jgid = deviceInfo['jgid'];  //机构代码/券商编号
        }
      }
      this.typePar = {
        "UserName": _this.userName,
        "Password": "",
        "Token": _this.token,
        "CompanyID": _this.jgid,
        "SessionTimeOut": _this.sessionTimeOut
      };

      if (pbE.isPoboApp) {
        pbE.GP().gpSetSessionInfo(JSON.stringify(this.typePar));
      }
      this.getData();  //第一次发数据请求

      var date = new Date();
      this.date = this.dateFormat(date, 'yyyy-MM-dd');
      this.time = date.toLocaleTimeString();
      this.timer = setInterval(function () {
        _this.time = new Date().toLocaleTimeString();
        _this.getData();
      }, 10000);
    },

    methods: {
      callback_90008(msg) {
        console.log('ZJLX');
        if (msg.functionNO == 101 && msg.jData['type'] == 'ZJLX') {
          var max = msg.jData['max'], min = msg.jData['min'], data = msg.jData.data;
          var str = "";
          //var str = [];

          var dataGroup = _.partition(data, function (item) {
            return item.flag > 0
          });
          var maxZ = dataGroup[0][0];
          var maxF = dataGroup[1][0];
          /*   dataGroup[0] = _.sortBy(groupList[0], (item)=> {return -item.pctZ});
           dataGroup[1] = _.sortBy(groupList[1], (item)=> {return item.pctF});*/

          for (var i = 0, j = dataGroup[0].length; i < j; i++) {
            var item = dataGroup[0][i],
              pct;
            if (max == 0) {
              item['pctZ'] = 0;//增仓
              item['pctF'] = 1;//减仓
            } else {
              pct = item['money'] / maxZ['money'];
              item['pctZ'] = pct;
              item['pctF'] = 1;
            }
            if (i <= 2) {
              str += (data[i].name + ',');
            }
          }
          for (var i = 0, j = dataGroup[1].length; i < j; i++) {
            var item = dataGroup[1][i],
              pct;
              if (min == 0) {
                item['pctZ'] = 0;
                item['pctF'] = 1;
              } else {
                pct = 1 - item['money'] / maxF['money'];
                item['pctZ'] = 0;
                item['pctF'] = pct;
              }

            //str.push(topList[i].name)
            if (i < 2) {
              str += (data[i].name + ',');
            } else if (i == 2) {
              str += data[i].name;
            }
          }
          //this.topList = data.slice(0, 5);
          //this.allList = data;
          /* if (this.showList.length == 0) {
           this.$nextTick(() => {
           this.showList = this.topList;
           })
           }*/
          this.newsPar = str;  //品种数据返回之后更新newsPar参数
          //console.log(this.allList);
         /* var groupList = _.partition(this.allList, function (item) {
            return item.flag > 0
          });*/
          dataGroup[0] = _.sortBy(dataGroup[0], (item) => {
            return -item.pctZ
          });
          dataGroup[1] = _.sortBy(dataGroup[1], (item) => {
            return item.pctF
          });
          this.showList = [];
          this.topList = [];
          this.allList = [];
          this.topList = this.topList.concat(dataGroup[0].slice(0, 5));
          this.topList = this.topList.concat(dataGroup[1].slice(0, 5).reverse());
          //this.showList =this.topList
          this.allList = this.allList.concat(dataGroup[0]);
          this.allList = this.allList.concat(dataGroup[1].reverse());
          //this.showAll();
          if (this.showFlag < 0)
            this.showList = this.topList;
          else
            this.showList = this.allList;
          //console.log(this.showList);
          //console.log(groupList);
          //_.sortBy(this.showList, 'pctF');
          //console.log(this.showList);
        }
        this.$loading.hide();
      },
      initPage(){
        if (pbPage.getInitState()) {
          pbPage.addModuleFunCallback(90008, 101, this.callback_90008);
          pbPage.addReloadFunByKey("zjlx", this.pageReload);

        } else {
          pbPage.initPage({
            reload: this.pageReload,
            callbacks: [{module: 90008, fun: 101, callback: this.callback_90008}]
          });
          this.pageReload();
        }

      },
      pageReload(){

      },
      note (index) {
        var hideB = document.getElementById('hideB' + index);
        var img = document.getElementById('arrow' + index);
        if (hideB && img) {
          if (hide.className.indexOf('hide') > -1) {
            hideB.className = '';
          } else {
            hideB.className = 'hide';
          }
          if (img.attributes['src'].value == '../images/arrow-up.png') {
            img.attributes['src'].value = '../images/arrow-down.png';
          } else if (img.attributes['src'].value == '../images/arrow-down.png') {
            img.attributes['src'].value = '../images/arrow-up.png';
          }
        }

        var hideB = document.getElementById('hideB' + index);
        if (hideB) {
          if (hideB.className.indexOf('hide') > -1) {
            hideB.className = '';
          } else {
            hideB.className = 'hide';
          }
        }
      },

      getData: function () {
        if (pbE.isPoboApp) {
          pbE.GP().gpSendAsyncRequest(101, JSON.stringify({"type": "ZJLX", "count": ""}));
        }
        //callback(JSON.stringify(data));
      },

      showAll: function () {
        var text = document.getElementById('text');
        var hand = document.getElementById('hand');
        if (this.showFlag < 0) {
          this.showList = this.allList;
          this.showFlag = '1';
          text.innerHTML = "点击收起";
        } else if (this.showFlag > 0) {
          this.showList = this.topList;
          this.showFlag = '-1';
          text.innerHTML = "点击显示全部";
        }
        /*var el = document.getElementById('subList');
         var hand = document.getElementById('hand');
         var text = document.getElementById('text');
         if (el && hand) {
         if (el.className.indexOf('hide') > -1) {
         el.className = '';
         //hand.attributes['src'].value = '../images/fold.png';
         text.innerHTML = "点击收起";
         } else {
         el.className = 'hide';
         //hand.attributes['src'].value = '../images/click.png';
         text.innerHTML = "点击显示全部";
         }
         }*/
      },

      dateFormat: function (date, format) {
        Date.prototype.format = function (format) {
          var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "D+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
          };
          if (/(y+|Y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
              format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
          }
          return format;
        };
        return date.format(format);
      }
    }
  }
</script>
