<template>
  <div class="full-height">
    <div class="container">
      <div class="share">最新更新时间：<span>{{date | dateFmt('YYYY-MM-DD hh:mm:ss')}}</span>
        <a :href="'pobo:pageId=800012&type=0&title=机构动向&des=机构动向&url='+share" class="btn-share"></a>
      </div>

      <div class="header-select">
        <flex class="row">
          <flex-item class="text-center item">
            <div class="selection-component">
              <div class="selection-show" @click="toCheckcompany()">
                <input class="header-input" type="text" placeholder="中信建投期货" :value="companyname"/>
                <!--<span>中信建投期货</span>-->
                <!--<div class="arrow-down"></div>-->
                <div class="search-icon"></div>
              </div>
            </div>
          </flex-item>
          <flex-item class="text-center item" style="font-size: 12px;">
            <div class="selection-component">
              <div class="selection-show" @click="toggle">
                <span v-text="sortNum"></span>
                <div class="arrow-down"></div>
              </div>
            </div>
          </flex-item>
        </flex>
      </div>


      <div v-if="!show" class="bg-color15" style="height:10px;"></div>
      <div class="hr-border-10"></div>
      <div class="btn-tabs">
        <div v-for="t in typeIds" class="tabs" :class="{'active':typeId.typeId == t.typeId}" @click="changeTypeId(t)"
             style="border-bottom: 1px solid #e3e3e3;">
          <button>{{t.name}}持仓</button>
        </div>
      </div>
      <!--<div class="hr-border-10"></div>-->
      <div v-show="!show" class="table">
        <div class="tr font-23 text-color17"
             style="padding-left:10px;padding-right:10px;font-size: 12px;background-color: #F7F7FA;">
          <div style="width:30px"></div>
          <div class="th">品种</div>
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
            :class="{'multi-icon-down': multiArrow[typeId.title+'jj'] == 2,'multi-icon-up': multiArrow[typeId.title+'jj']  == 1}"></span>
          </div>
        </div>
        <template v-for="product in productRankingByCompany">
          <div class="tr font-26 text-color18" @click="showContractRanking(product)"
               style="padding-left:10px;padding-right:10px;">
            <router-link tag="div"
                         :to="{name:'institutionChart',query:{memberId:companyid,tickerCode:product.code,typeId:typeId.typeId}}"
                         class="icon-tb"></router-link>
            <div class="td text-center" v-text="product.name"></div>
            <div class="td text-right" v-text="product.volume"></div>
            <div class="td text-right" :class="{'text-color2':product.change > 0,'text-color3':product.change < 0}"
                 v-text="product.change">-30
            </div>
            <div class="td text-right" v-text="product.priceAvg?product.priceAvg:'--'"></div>
          </div>
          <div v-if="product.show" class="tr font-26 text-color18"
               style="background:#f9f9f9;padding-left:10px;padding-right:10px" v-for="c in product.contractRanking">
            <div style="width:30px"></div>
            <div class="td text-center" v-text="c.code"></div>
            <div class="td text-right" v-text="c.volume"></div>
            <div class="td text-right" :class="{'text-color2':c.change > 0,'text-color3':c.change < 0}"
                 v-text="c.change">-30
            </div>
            <div class="td text-right" v-text="c.priceAvg?c.priceAvg.toFixed(2):'--'"></div>
          </div>
        </template>
        <div v-if="productRankingByCompanyMore" @click="toProductRankingByCompanyMore" class="show-more">点击显示全部</div>
      </div>
      <div class="hr-border-10"></div>
    </div>
    <multi-slide v-model="showEvent">
      <p style="padding: 5px 10px;">请选择显示数量: </p>
      <div style="height: 175px; padding: 10px 15px; overflow-y: auto;">
        <div class="company-select">
          <div class="company-select-option" :class="{'active':sortNum == v}" v-for="v in sortNumList" v-text="`前${v}`"
               @click="selectSortList(v)">
          </div>
        </div>
      </div>
    </multi-slide>
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
        showEvent: false,
        clickable: '',
        multiArrow: {
          'dtcc': 0,
          'dtzj': 0,
          'dtjj': 0,
          'ktcc': 0,
          'kczj': 0,
          'ktjj': 0,
          'jcc': 0,
          'jzj': 0,
          'jjj': 0
        },
        show: false,
        share: "",
        date: new Date(),
        companyid: this.$route.query.companyid ? this.$route.query.companyid : 20053629,
        companyname: this.$route.query.companyname ? this.$route.query.companyname : '中信建投公司',
        typeId: typeIds.dt,
        typeIds: typeIds,
        news: [],
        productRanking: [],
        productRankingMore: false,
        productRankingByCompany: [],
        productRankingByCompanyMore: false,
        part: '',
        parts: parts
      }
    },
    created() {
      //  this.$emit('change-keys',1);
      this.share = this.$encodeURI(this.projectPrefix[0] + "index.html#" + this.$route.fullPath);
      this.part = this.parts.pbxgxw.part;
      this.initCompany();

    },
    mounted() {
      document.getElementById('navbarContent').style.display = 'block';
      this.$parent.$data.activeIndex = 1;

    },
    methods: {
      selectSortList(v) {
        this.showEvent = false;
        this.sortNum = v;
        this.pageSize = this.sortNum;
        this.initCompany();
      },
      sortData(coulmn, direction) {
        this.productRankingByCompany && this.productRankingByCompany.sort((item1, item2) => {
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
        //this.multiArrow[str] = !this.multiArrow[str];
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
      toCheckcompany() {
        this.$router.push('/checkCompany');
      },
      toggle() {
        this.showEvent = !this.showEvent;
      },
      initCompany() { //选择机构
        this.show = false;
        this.productRankingByCompanyMore = false;
        this.$post([1, "queryProductRankingByCompanyId"], {
          pageNo: 1,
          pageSize: this.pageSize,
          needCount: 0,
          memberId: this.companyid / 1,
          typeId: this.typeId.typeId
        }).then(res => {
          this.date = new Date();
          this.productRankingByCompany = res.results;
          console.log(res.results.length, this.pageSize);
          if (res.results.length == this.pageSize) {
            this.productRankingByCompanyMore = true;
          }
        });
      },
      changeTypeId(typeId) {  //选择机构
        if (this.typeId.typeId != typeId.typeId) {
          this.typeId = typeId;
          if (this.companyid) {
            this.initCompany();
          } else {
            if (this.futuresVarity && this.futuresVarity.code) {
              if (this.varityCode) {
                this.queryContractRankingByFuturesCode();
              } else {
                this.queryProductRankingByTypeId();
              }
            }
          }
        }
      },
      queryProductRankingByTypeId() { //选择机构
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
          if (this.productRanking.length == this.pageSize + 1) {
            this.productRankingMore = true;
          }
        });
      },
      queryContractRankingByFuturesCode() { //选择机构
        this.productRankingMore = false;
        this.$post([1, "queryContractRankingByFuturesCode"], {
          pageNo: 1,
          pageSize: this.pageSize,
          needCount: 0,
          tickerCode: this.varityCode,
          typeId: this.typeId.typeId
        }).then(res => {
          this.date = new Date();
          this.productRanking = res.results;
          if (this.productRanking.length == this.pageSize + 1) {
            this.productRankingMore = true;
          }
        });
      },
      showContractRanking(product) { //选择机构
        console.log('product');
        console.log(product);
        product.show = !product.show;
        this.$forceUpdate();
        if (!product.contractRanking) {
          this.$post([1, "queryContractRankingCompanyId"], {
            pageNo: 1,
            pageSize: 2,
            needCount: 0,
            futuresCode: product.code,
            memberId: this.companyid / 1,
            typeId: this.typeId.typeId
          }).then(res => {
            product.contractRanking = res.results;
            this.$forceUpdate();
          });
        }
      },

      toProductRankingMore() {
        this.$router.push({
          name: "productRanking",
          query: {
            typeId: this.typeId.typeId,
            typeName: this.typeId.name,
            tickerCode: this.varityCode ? this.varityCode : this.futuresVarity.code,
            varityCode: this.varityCode
          }
        });
      },
      toProductRankingByCompanyMore() {
        this.$router.push({
          name: "productRankingByCompany",
          query: {
            typeId: this.typeId.typeId,
            typeName: this.typeId.name,
            companyid: this.companyid,
            companyname: this.companyname
          }
        });
      }
    }
  }
</script>
