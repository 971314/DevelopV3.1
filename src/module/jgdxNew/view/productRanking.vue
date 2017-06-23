<template>

  <div class="full-height bg-color22">
    <common-nav :gobackUrl="gobackUrl" class="pb-jgdx">
      <span slot="body" v-text="rankingTitle"></span>
    </common-nav>
    <div class="container" v-infinite-scroll="query" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="hr-border-10"></div>
      <div class="table">
        <div class="tr font-23 text-color17"
             style="padding-left:10px;padding-right:10px;font-size: 12px;background-color: #f3f3f3;">
          <div class="th th1">序号</div>
          <div class="th">公司简介</div>
          <div class="th text-right" @click="multiSort(typeIdList[typeId]+'cc','volume')">{{typeName}}持仓<span
            class="multi-icon"
            :class="{'multi-icon-down': multiArrow[typeIdList[typeId]+'cc'] == 2,'multi-icon-up': multiArrow[typeIdList[typeId]+'cc'] == 1}"></span>
          </div>
          <div class="th text-right" @click="multiSort(typeIdList[typeId]+'zj','change')">{{typeName}}增减<span
            class="multi-icon"
            :class="{'multi-icon-down': multiArrow[typeIdList[typeId]+'zj'] == 2,'multi-icon-up': multiArrow[typeIdList[typeId]+'zj'] == 1}"></span>
          </div>
          <div class="th text-right" @click="multiSort(typeIdList[typeId]+'jj','priceAvg')">{{typeName}}均价<span
            class="multi-icon"
            :class="{'multi-icon-down': multiArrow[typeIdList[typeId]+'jj'] == 2,'multi-icon-up': multiArrow[typeIdList[typeId]+'jj']  == 1}"></span>
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
          <div class="td text-center" v-text="product.name"></div>
          <div class="td text-right" v-text="product.volume">1808</div>
          <div class="td text-right" :class="{'text-color2':product.change > 0,'text-color3':product.change < 0}"
               v-text="product.change"></div>
          <div class="td text-right" v-text="product.priceAvg?product.priceAvg:'--'"></div>
        </div>
      </div>
      <div class="hr"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        flag: true,
        zxjtInfoMsg: {},
        gobackUrl: 'goBack',
        rankingTitle: '多头持仓',
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
        typeIdList: {
          '2': 'dt',
          '3': 'kt',
          '4': 'j'
        },
        typeId: this.$route.query.typeId / 1,
        typeName: this.$route.query.typeName,
        tickerCode: this.$route.query.tickerCode,
        varityCode: this.$route.query.varityCode,
        pageNo: 0,
        loading: false,
        noMore: false,
        productRanking: []
      }
    },
    mounted() {
      document.getElementById('navbarContent').style.display = 'none';
      if (this.typeId == 2) {
        this.rankingTitle = '多头持仓';
      } else if (this.typeId == 3) {
        this.rankingTitle = '空头持仓';
      } else if (this.typeId == 4) {
        this.rankingTitle = '净持仓';
      }
    },
    methods: {
      sortData(coulmn, direction) {
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
        console.log(this.multiArrow[str]);
        if (this.multiArrow[str] == 2) {
          direction = 'down';
        } else if (this.multiArrow[str] == 1) {
          direction = 'up';
        }
        this.sortData(coulmn, direction);
        this.$forceUpdate();
      },
      query() {
        this.loading = true;
        if (this.noMore) {
          return this.$toast("没有更多了");
        }
        this.pageNo++;

        this.$post([1, this.varityCode && this.varityCode != '汇总' ? "queryContractRankingByFuturesCode" : "queryProductRankingByTypeId"], {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          needCount: 0,
          tickerCode: this.tickerCode,
          typeId: this.typeId
        }).then(res => {
          this.loading = false;

          if (!this.zxjtInfoMsg.name) {
            this.zxjtInfoMsg = Object.assign({}, this.productRanking[0])
          }

          for (let item of res.results) {
            // 剔除重复的‘中信建投’
            if (this.zxjtInfoMsg.name && this.zxjtInfoMsg.memberId === item.memberId) {
              continue
            }

            this.productRanking.push(item)
          }

          if (this.pageNo === 1) {
            if (res.results.length < this.pageSize + 1) {
              this.noMore = true;
            }
          } else {
            if (res.results.length < this.pageSize) {
              this.noMore = true;
            }
          }
        });
      }
    }
  }
</script>
