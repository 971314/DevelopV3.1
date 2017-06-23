<template>
  <div class="full-height">
    <div class="container">
      <div class="share">最新更新时间：<span>{{date | dateFmt('YYYY-MM-DD hh:mm:ss')}}</span>
        <a :href="'pobo:pageId=800012&type=0&title=机构动向&des=机构动向&url='+share" class="btn-share"></a>
      </div>
      <div class="header-select">
        <flex class="row">
          <flex-item class="text-center item" style="font-size: 12px;">
            <div class="selection-component">
              <div class="selection-show" @click="toggle0">
                <span v-text="futuresExchange.name"></span>
                <div class="arrow-down"></div>
              </div>
            </div>
          </flex-item>
          <flex-item class="text-center item" style="font-size: 12px;">
            <div class="selection-component">
              <div class="selection-show" @click="toggle1">
                <span v-text="futuresVarity.name"></span>
                <div class="arrow-down"></div>
              </div>
            </div>
          </flex-item>
        </flex>
        <flex class="row">
          <flex-item class="text-center item">
            <div class="selection-component">
              <div class="selection-show" @click="toggle2">
                <span v-text="varityCode"></span>
                <div class="arrow-down"></div>
              </div>
            </div>
          </flex-item>
          <flex-item class="text-center item">
            <div class="selection-component">
              <div class="selection-show" @click="toggle3">
                <span v-text="`前${sortNum}`"></span>
                <div class="arrow-down"></div>
              </div>
            </div>
          </flex-item>
        </flex>
      </div>
      <div class="hr-border-10"></div>

      <!--持仓种类选项卡开始-->
      <div class="btn-tabs">
        <div v-for="t in typeIds" class="tabs" :class="{'active':typeId.typeId == t.typeId}" @click="changeTypeId(t)"
             style="border-bottom: 1px solid #e3e3e3;">
          <button>{{t.name}}持仓</button>
        </div>
      </div>
      <!--持仓种类选项卡结束-->
      <!--<div class="hr-border-10"></div>-->

      <!--列表数据开始-->
      <div v-show="show" class="table">
        <div class="tr font-23 text-color17"
             style="padding-left:10px;padding-right:10px;font-size: 12px;background-color: #F7F7FA;">
          <div class="th th1">序号</div>
          <div class="th">公司简介</div>
          <div class="th text-right" @click="multiSort(typeId.title+'cc','volume')">{{typeId.name}}持仓<span
            class="multi-icon"
            :class="{'multi-icon-down': multiArrow[typeId.title+'cc'] == 2,'multi-icon-up': multiArrow[typeId.title+'cc'] == 1}"></span>
          </div>
          <div class="th text-right" @click="multiSort(typeId.title+'zj','change')">{{typeId.name}}增减<span
            class="multi-icon"
            :class="{'multi-icon-down': multiArrow[typeId.title+'zj'] == 2,'multi-icon-up': multiArrow[typeId.title+'zj'] == 1}"></span>
          </div>
          <div class="th text-right" @click="multiSort(typeId.title+'jj','priceAvg')">{{typeId.name}}均价<span
            class="multi-icon"
            :class="{'multi-icon-down': multiArrow[typeId.title+'jj'] == 2,'multi-icon-up': multiArrow[typeId.title+'jj'] == 1}"></span>
          </div>
        </div>
        <div v-if="productRanking.length != 0" class="tr font-26 text-color18"
             style="padding-left:10px;padding-right:10px;">
          <div class="td td1 text-center"></div>
          <div class="td text-center">{{zxjtInfoMsg.name ? zxjtInfoMsg.name : '--'}}</div>
          <div class="td text-right">{{zxjtInfoMsg.volume ? zxjtInfoMsg.volume : '--'}}</div>
          <div class="td text-right"
               :class="{'text-color2':zxjtInfoMsg.change > 0,'text-color3':zxjtInfoMsg.change < 0}"
               v-text="zxjtInfoMsg.change ? zxjtInfoMsg.change: '--'"></div>
          <div class="td text-right" v-text="zxjtInfoMsg.priceAvg?zxjtInfoMsg.priceAvg:'--'"></div>
        </div>
        <div class="tr font-26 text-color18" v-for="(product,index) in productRanking" v-if="index > 0"
             style="padding-left:10px;padding-right:10px;">
          <div class="td td1 text-center" :class="index<4?'order'+(index-1):'order'" v-text="index<4?'':index"></div>
          <div class="td text-center" v-text="product.name ? product.name: '--'"></div>
          <div class="td text-right" v-text="product.volume ? product.volume: '--'">1808</div>
          <div class="td text-right" :class="{'text-color2':product.change > 0,'text-color3':product.change < 0}"
               v-text="product.change ? product.change: '--'"></div>
          <div class="td text-right" v-text="product.priceAvg?product.priceAvg:'--'"></div>
        </div>
        <div v-if="productRankingMore" @click="toProductRankingMore" class="show-more">点击显示全部</div>
      </div>
      <multi-slide v-model="showEvent1">
        <p style="padding: 5px 10px;">请选择期货公司: </p>
        <div style="height: 175px; padding: 10px 15px; overflow-y: auto;">
          <div class="company-select">
            <div class="company-select-option" :class="{'active':f.id == futuresExchange.id}"
                 v-for="f in futuresExchanges" v-text="f.name" @click="selectFuturesExchange(f)">
            </div>
          </div>
        </div>
      </multi-slide>

      <multi-slide v-model="showEvent2">
        <p style="padding: 5px 10px;">请选择品种: </p>
        <div style="height: 175px; padding: 10px 15px; overflow-y: auto;">
          <div class="company-select">
            <div class="company-select-option" :class="{'active':f.code == futuresVarity.code}"
                 v-for="f in futuresVaritys" v-text="f.name" @click="selectFuturesVarity(f)">
            </div>
          </div>
        </div>
      </multi-slide>

      <multi-slide v-model="showEvent3">
        <p style="padding: 5px 10px;">请选择合约: </p>
        <div style="height: 175px; padding: 10px 15px; overflow-y: auto;">
          <div class="company-select">
            <div class="company-select-option" :class="{'active':varityCode == v}" v-for="v in varityCodes" v-text="v"
                 @click="selectVarityCode(v)">
            </div>
          </div>
        </div>
      </multi-slide>

      <multi-slide v-model="showEvent4">
        <p style="padding: 5px 10px;">请选择列表数量: </p>
        <div style="height: 175px; padding: 10px 15px; overflow-y: auto;">
          <div class="company-select">
            <div class="company-select-option" :class="{'active':sortNum == v}" v-for="v in sortNumList"
                 v-text="`前${v}`" @click="selectSortList(v)">
            </div>
          </div>
        </div>
      </multi-slide>
    </div>
  </div>
</template>
<script>
  import uiInfos from "../components/uiInfos.vue";
  import {
    parts,
    typeIds
  } from "../common/config/constants.js";
  export default {
    components: {
      "ui-infos": uiInfos
    },
    data() {
      return {
        zxjtInfoMsg: {},
        sortNum: '15',
        sortNumList: [
          5,
          10,
          15,
          20,
          25,
          30,
          35,
          40
        ],
        showEvent1: false,
        showEvent2: false,
        showEvent3: false,
        showEvent4: false,

        multiArrow: {// 1往上  0消失  2往下
          'dtcc': 0,
          'dtzj': 0,
          'dtjj': 0,
          'ktcc': 0,
          'ktzj': 0,
          'ktjj': 0,
          'jcc': 0,
          'jzj': 0,
          'jjj': 0
        },
        share: "",
        date: new Date(),
        typeId: typeIds.dt,
        typeIds: typeIds,
//            news: [],
        futuresExchange: {},
        futuresExchanges: [],
        showFuturesExchanges: false,
        futuresVarity: {},
        futuresVaritys: [],
        showFuturesVaritys: false,
        varityCode: "",
        varityCodes: [],
        showVarityCodes: false,
        productRanking: [],
        productRankingMore: false,
        part: '',
        parts: parts
      }
    },
    created() {
      //   this.$emit('change-keys',0);
      this.share = this.$encodeURI(this.projectPrefix[0] + "index.html#" + this.$route.fullPath);
      this.part = this.parts.pbxgxw.part;
      this.initType();
    },
    mounted() {
      document.getElementById('navbarContent').style.display = 'block';
      this.$parent.$data.activeIndex = 0;
    },
    methods: {
      selectSortList(v) {
        this.showEvent4 = false;
        this.sortNum = v;
        this.pageSize = this.sortNum;
        this.initType();
      },
      sortData(coulmn, direction) {//排序数据(冒泡排序法)
        this.productRanking && this.productRanking.sort((item1, item2) => {
          let val1 = item1[coulmn]
          let val2 = item2[coulmn]

          // 如果有null值 或者不为数值，则置底
          if (isNaN(val1) || val1 == null) {
            return -1
          }

          if (isNaN(val2) || val2 == null) {
            return -1
          }

          if (direction === 'up') {
            return val1 - val2
          } else if (direction === 'down') {
            return val2 - val1
          }
        })
      },
      resetArrow() {//重置箭头
        for (let k in this.multiArrow) {
          this.multiArrow[k] = 0;
        }
      },
      multiSort(str, coulmn) { //排序通用方法
        let temp;
        if (this.multiArrow[str] == 0 || this.multiArrow[str] == 2) {
          temp = 1;
        } else if (this.multiArrow[str] == 1) {
          temp = 2;
        }

        this.resetArrow();
        this.multiArrow[str] = temp;
        let direction;
        if (this.multiArrow[str] == 2) {
          direction = 'down';
        } else if (this.multiArrow[str] == 1) {
          direction = 'up';
        }
        this.sortData(coulmn, direction);
      },
      toggle0() {
        this.showEvent1 = !this.showEvent1;
      },
      toggle1() {
        this.showEvent2 = !this.showEvent2;
      },
      toggle2() {
        this.showEvent3 = !this.showEvent3;
      },
      toggle3() {
        this.showEvent4 = !this.showEvent4;
      },
      initType() { //选择品种
        this.show = true;
        this.queryAllFuturesExchange();
      },
      changeTypeId(typeId) { //选择品种
        if (this.typeId.typeId != typeId.typeId) {
          this.typeId = typeId;
          if (this.futuresVarity && this.futuresVarity.code) {
            if (this.varityCode && this.varityCode != '汇总') {
              this.queryContractRankingByFuturesCode();
            } else {
              this.queryProductRankingByTypeId();
            }
          }
        }
      },
      queryAllFuturesExchange() {  //选择品种
        this.$post([1, "queryAllFuturesExchange4Product"], {
          exchId: null
        }, false, undefined, true).then(res => {
          this.futuresExchanges = res;
          this.selectFuturesExchange(this.futuresExchanges[0]);
        });
      },
      queryProductRankingByTypeId() { //选择品种
        this.productRankingMore = false;
        this.$post([1, "queryProductRankingByTypeId"], {
          pageNo: 1,
          pageSize: this.pageSize,
          needCount: 0,
          tickerCode: this.futuresVarity.code,
          typeId: this.typeId.typeId
        }).then(res => {
          this.date = new Date();

          this.productRanking = res.results;

          this.zxjtInfoMsg = Object.assign({}, this.productRanking[0]);

          if (this.productRanking.length === this.pageSize + 1) {
            this.productRankingMore = true;
          }
        });
      },
      queryContractRankingByFuturesCode() { //选择品种
        this.productRankingMore = false;
        this.$post([1, "queryContractRankingByFuturesCode"], {
          pageNo: 1,
          pageSize: this.pageSize,
          needCount: 0,
          futuresCode: this.varityCode,
          typeId: this.typeId.typeId
        }).then(res => {
          this.date = new Date();
          this.productRanking = res.results;
          if (this.productRanking.length == this.pageSize + 1) {
            this.productRankingMore = true;
          }
        });
      },
      selectFuturesExchange(f) {  //选择品种
        this.showEvent1 = false;
        let tempObj = {};
        for (let key in f) {
          tempObj[key] = f[key];
        }
        this.futuresExchange = tempObj;
        this.futuresVarity = {};
        this.varityCode = "汇总";

        this.$post([1, "queryAllFuturesExchange4Product"], {
          exchId: this.futuresExchange.id
        }, false, undefined, true).then(res => {
          this.futuresVaritys = res;
          this.selectFuturesVarity(this.futuresVaritys[0]);
        });
      },
      selectFuturesVarity(f) {  //选择品种
        this.showEvent2 = false;
        if (this.futuresVarity.code != f.code) {
          let tempObj = {};
          for (let key in f) {
            tempObj[key] = f[key]
          }
          this.futuresVarity = tempObj;
          this.varityCode = "汇总";
          this.varityCodes = [];
          this.varityCodes.push(this.varityCode);
          let date = new Date();
          for (let i = 0; i < 12; i++) {
            let year = date.getYear() - 100;
            let month = date.getMonth() + 1;
            if (month + i > 12) {
              month = month + i - 12;
              year = year + 1;
            } else {
              month = month + i;
            }
            if (month < 10) {
              month = "0" + month;
            }
            this.varityCodes.push(f.code + year + month);
          }
          this.queryProductRankingByTypeId();
        }
      },
      selectVarityCode(v) { //选择品种
        this.showEvent3 = false;
        this.varityCode = v;
        if (this.varityCode == '汇总') {
          if (this.futuresVarity.code) {
            this.queryProductRankingByTypeId();
          }
        } else {
          this.queryContractRankingByFuturesCode();
        }
      },
      toProductRankingMore() { //选择品种
        this.$router.push({
          name: "productRanking",
          query: {
            typeId: this.typeId.typeId,
            typeName: this.typeId.name,
            tickerCode: this.varityCode && this.varityCode != '汇总' ? this.varityCode : this.futuresVarity.code,
            varityCode: this.varityCode
          }
        });
      }
    }
  }
</script>
