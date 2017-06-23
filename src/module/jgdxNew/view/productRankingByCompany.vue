<template>
    <div class="full-height bg-color22">
      <common-nav :gobackUrl="gobackUrl" class="pb-jgdx">
        <span style="display: inline-block;width: 100%;overflow: hidden;text-overflow: ellipsis;" slot="body" v-text="rankingTitle"></span>
      </common-nav>
        <div class="container" v-infinite-scroll="query" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <div class="hr-border-10"></div>
            <div class="table">
                <div class="tr font-23 text-color17" style="padding-left:10px;padding-right:10px;font-size: 12px;background-color: #f3f3f3;">
                    <div style="width:30px"></div>
                    <div class="th">品种</div>
                    <div class="th text-right" @click="multiSort(typeIdList[typeId]+'cc','volume')">{{typeName}}持仓<span class="multi-icon" :class="{'multi-icon-down': multiArrow[typeIdList[typeId]+'cc'] == 2,'multi-icon-up': multiArrow[typeIdList[typeId]+'cc'] == 1}"></span></div>
                    <div class="th text-right" @click="multiSort(typeIdList[typeId]+'zj','change')">{{typeName}}增减<span class="multi-icon" :class="{'multi-icon-down': multiArrow[typeIdList[typeId]+'zj'] == 2,'multi-icon-up': multiArrow[typeIdList[typeId]+'zj'] == 1}"></span></div>
                    <div class="th text-right" @click="multiSort(typeIdList[typeId]+'jj','priceAvg')">{{typeName}}均价<span class="multi-icon" :class="{'multi-icon-down': multiArrow[typeIdList[typeId]+'jj'] == 2,'multi-icon-up': multiArrow[typeIdList[typeId]+'jj']  == 1}"></span></div>
                </div>
                <template v-for="product in productRankingByCompany">
                    <div class="tr font-26 text-color18" @click="showContractRanking(product)" style="padding-left:10px;padding-right:10px;">
                        <router-link tag="div" :to="{name:'institutionChart',query:{memberId:companyid,tickerCode:product.code,typeId:typeId}}" class="icon-tb"></router-link>
                        <div class="td text-center" v-text="product.name"></div>
                        <div class="td text-right" v-text="product.volume"></div>
                        <div class="td text-right" :class="{'text-color2':product.change > 0,'text-color3':product.change < 0}" v-text="product.change">-30</div>
                        <div class="td text-right" v-text="product.priceAvg?product.priceAvg:'--'"></div>
                    </div>
                    <div v-if="product.show" class="tr font-26 text-color18" style="background:#f9f9f9;padding-left:10px;padding-right:10px" v-for="c in product.contractRanking">
                        <div style="width:30px"></div>
                        <div class="td text-center" v-text="c.name"></div>
                        <div class="td text-right" v-text="c.volume"></div>
                        <div class="td text-right" :class="{'text-color2':c.change > 0,'text-color3':c.change < 0}" v-text="c.change">-30</div>
                        <div class="td text-right" v-text="c.priceAvg?c.priceAvg:'--'"></div>
                    </div>
                </template>
            </div>
            <div class="hr"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                gobackUrl: 'goBack',
                rankingTitle: '',
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
                companyid: this.$route.query.companyid / 1,
                companyname: this.$route.query.companyname,
                pageNo: 0,
                loading: false,
                noMore: false,
                productRankingByCompany: []
            }
        },
        mounted() {
          document.getElementById('navbarContent').style.display = 'none';
          if (this.typeId == 2) {
            this.rankingTitle = '多头持仓-'+ this.companyname;
          }else if (this.typeId == 3) {
            this.rankingTitle = '空头持仓-'+ this.companyname;
          }else if (this.typeId == 4) {
            this.rankingTitle = '净持仓-' + this.companyname;
          }
        },
        methods: {
            sortData(coulmn,direction) {//排序数据(冒泡排序法)
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
            multiSort(str,coulmn) { //排序通用方法
              let temp;
              if (this.multiArrow[str] == 0 || this.multiArrow[str] == 2) {
                temp = 1;
              }else if (this.multiArrow[str] == 1) {
                temp = 2;
              }

              this.resetArrow();
              this.multiArrow[str] = temp;
              let direction;
              if (this.multiArrow[str] == 2) {
                direction = 'down';
              }else if(this.multiArrow[str] == 1) {
                direction = 'up';
              }
              this.sortData(coulmn,direction);
            },
            query() {
                this.loading = true;
                if (this.noMore) {
                    return this.$toast("没有更多了");
                }
                this.pageNo++;
                this.$post([1, "queryProductRankingByCompanyId"], {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    needCount: 0,
                    memberId: this.companyid,
                    typeId: this.typeId
                }).then(res => {
                    this.loading = false;
                    for (let t of res.results) {
                        this.productRankingByCompany.push(t);
                    }
                    if (res.results.length < this.pageSize) {
                        this.noMore = true;
                    }
                });
            },
            showContractRanking(product) {
                product.show = !product.show;
                this.$forceUpdate();
                if (!product.contractRanking) {
                    this.$post([1, "queryContractRankingCompanyId"], {
                        pageNo: 1,
                        pageSize: 2,
                        needCount: 0,
                        futuresCode: product.code,
                        memberId: this.companyid,
                        typeId: this.typeId
                    }).then(res => {
                        product.contractRanking = res.results;
                        this.$forceUpdate();
                    });
                }
            },
        }
}
</script>
