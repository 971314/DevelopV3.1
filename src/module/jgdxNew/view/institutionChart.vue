<template>
  <div class="full-height">
    <common-nav :gobackUrl="gobackUrl" class="pb-jgdx">
      <span slot="body" v-text="rankingTitle"></span>
    </common-nav>
    <div class="container">
      <div class="share">
        <div class="header-select" style="display: inline-block; width: 130px;">
          <flex class="row" style="margin: 0;">
            <flex-item class="text-center item" style="padding: 0;">
              <div class="selection-component">
                <div class="selection-show" @click="toggle0">
                  <span v-text="tradeDate.name"></span>
                  <div class="arrow-down"></div>
                </div>
              </div>
            </flex-item>
          </flex>
        </div>
        <a :href="'pobo:pageId=800012&type=0&title=机构动向&des=机构动向&url='+share" class="btn-share"></a>
      </div>
      <div v-for="chart in charts" :ref="chart" style="height:300px; margin-top: 20px"></div>
      <multi-slide v-model="showEvent1">
        <p style="padding: 5px 10px;">请选择时间: </p>
        <div style="height: 175px; padding: 10px 15px; overflow-y: auto;">
          <div class="company-select">
            <div class="company-select-option" :class="{'active':tradeDate.value == t.value}" v-for="t in tradeDates"
                 v-text="t.name" @click="selectDate(t)">
            </div>
          </div>
        </div>
      </multi-slide>
    </div>
  </div>
</template>
<script>
  import moment from "moment";
  // import echarts from "echarts";
  // 引入 ECharts 主模块
  import echarts from 'echarts/lib/echarts';
  // 引入柱状图
  require('echarts/lib/chart/line');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/grid');
  export default {
    data() {
      return {
        showEvent1: false,
        gobackUrl: 'goBack',
        rankingTitle: '机构动向',
        share: "",
        showOptions: false,
        memberId: this.$route.query.memberId,
        tickerCode: this.$route.query.tickerCode,
        typeId: this.$route.query.typeId,
        tradeDate: {},
        tradeDates: [{
          name: "最近一周",
          value: 7
        }, {
          name: "最近一个月",
          value: 30
        }, {
          name: "最近三个月",
          value: 90
        }],
        charts: ["c1", "c2", "c3"],
        myCharts: []
      }
    },
    created() {
      this.share = this.$encodeURI(this.projectPrefix[0] + "index.html#" + this.$route.fullPath);
      this.basicOption = {
        title: {
          left: "center",
          text: "中信建投 铜合约持仓量走势图",
          top: -5
        },
        color: ['#9bd183', '#fe1b1b', '#2868e8'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          x: 'left',
          padding: [30, 30, 30, 30],
          data: ['多持', '空持', '净头寸'],
          selected: {
            '多持': true,
            '空持': true,
            '净头寸': true
          }
        },
        grid: {
          left: '10',
          right: '20',
          bottom: '10',
          top: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: '#000000',
              fontSize: 10 // 让字体变大
            },
            rotate: 15,
            formatter: function (value, index) {
              return moment(value).format('YYYYMMDD')
            }
          },
          splitLine: { //网格线
            show: true,
            lineStyle: {
              color: ['#E8E8E8'],
              type: 'solid'
            }
          },
          axisLine: { //y轴坐标线颜色
            lineStyle: {
              color: '#b1b1b1'
            }
          },
          axisTick: { //坐标刻度是否显示
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisLabel: { //调整x轴的lable
            textStyle: {
              color: '#000000',
              fontSize: 8 // 让字体变大
            }
          },
          axisTick: {
            show: false
          },
          axisLine: { //y轴坐标线颜色
            lineStyle: {
              color: '#b1b1b1'
            }
          },
          splitLine: { //网格线
            show: true,
            lineStyle: {
              color: ['#E8E8E8'],
              type: 'solid'
            }
          }
        },
        series: [{
          name: '多持',
          type: 'line',
          symbol: 'none'
        }, {
          name: '空持',
          type: 'line',
          symbol: 'none'
        }, {
          name: '净头寸',
          type: 'line',
          symbol: 'none'
        }]
      };
    },
    mounted() {
      for (let i = 0; i < this.charts.length; i++) {
        this.myCharts[i] = echarts.init(this.$refs[this.charts[i]][0]);
        //    this.myCharts[i].showLoading();
        this.myCharts[i].setOption(this.basicOption);

      }
      this.selectDate(this.tradeDates[1]);
    },
    methods: {
      toggle0() {
        this.showEvent1 = !this.showEvent1;
      },
      selectDate(tradeDate) {
        this.showEvent1 = false;
        if (this.tradeDate.value == tradeDate.value) {
          return;
        }
        this.tradeDate = tradeDate;
        this.setOption();
      },
      setOption() {
        this.$post([1, "lineChart"], {
          memberId: this.memberId / 1,
          tickerCode: this.tickerCode,
          typeId: this.typeId / 1,
          tradeDate: this.tradeDate.value
        }).then(res => {
          for (let i = 0; i < res.length; i++) {
            let series = [];
            for (let j = 0; j < res[i].length; j++) {
              let data = [];
              for (let k = 0; k < res[i][j].length; k++) {
                data.push([moment(res[i][j][k].tradeDate, "YYYYMMDD").format("YYYY-MM-DD"), res[i][j][k].volume]);
              }
              series[j] = {
                data: data
              }
            }
            this.myCharts[i].setOption({
              series: series
            });
            //    this.myCharts[i].hideLoading();
          }
        });
      }
    }
  }
</script>
