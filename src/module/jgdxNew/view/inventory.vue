<template>
  <div class="full-height">
    <common-nav :gobackUrl="gobackUrl" class="pb-jgdx">
      <span slot="body" v-text="rankingTitle"></span>
    </common-nav>
    <div class="container">
      <div class="share">
        <div class="header-select" style="display: inline-block;width: calc(100% - 35px);">
          <flex class="row" style="margin: 0;">
            <flex-item class="text-center item" style="margin-right: .5rem;padding: 0;">
              <div class="selection-component">
                <div class="selection-show" @click="toggle0">
                  <span
                    style="display: inline-block;width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                    v-text="futuresExchange.name"></span>
                  <div class="arrow-down"></div>
                </div>
              </div>
            </flex-item>
            <flex-item class="text-center item" style="padding: 0;">
              <div class="selection-component">
                <div class="selection-show" @click="toggle1">
                  <span
                    style="display: inline-block;width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                    v-text="futuresVarity.name"></span>
                  <div class="arrow-down"></div>
                </div>
              </div>
            </flex-item>
          </flex>
        </div>
        <span class="btn-share"></span>
      </div>
      <div ref="chart" style="height:250px"></div>
      <div class="message-presents">
        <div class="message-list" v-for="messageItem in messageShow">
          <span class="message-list-title" v-text="messageItem.title"></span>
          <span v-if="!dataMessageItem" v-for="dataMessageItem in messageItem.data"
                class="message-list-coulmn">无数据</span>
          <span v-if="dataMessageItem" class="message-list-coulmn" v-for="dataMessageItem in messageItem.data"
                v-text="dataMessageItem"></span>
        </div>

        <!--<div class="message-list">-->
        <!--<span class="message-list-title">日期</span>-->
        <!--<span class="message-list-coulmn">20161229</span>-->
        <!--<span class="message-list-coulmn">20161229</span>-->
        <!--<span class="message-list-coulmn">20161229</span>-->
        <!--</div>-->
        <!--<div class="message-list">-->
        <!--<span class="message-list-title">库存</span>-->
        <!--<span class="message-list-coulmn">148598</span>-->
        <!--<span class="message-list-coulmn">148598</span>-->
        <!--<span class="message-list-coulmn">148598</span>-->
        <!--</div>-->
        <!--<div class="message-list" style="border-bottom: 0">-->
        <!--<span class="message-list-title">增减</span>-->
        <!--<span class="message-list-coulmn">12221</span>-->
        <!--<span class="message-list-coulmn">12221</span>-->
        <!--<span class="message-list-coulmn">12221</span>-->
        <!--</div>-->
      </div>
      <div class="hr-border-10"></div>
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
      <!--<ui-infos :infos="news"></ui-infos>-->
    </div>
  </div>
</template>
<script>
  import moment from "moment";
  // 引入 ECharts 主模块
  import echarts from 'echarts/lib/echarts';
  // 引入柱状图
  require('echarts/lib/chart/line');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');
  require('echarts/lib/component/grid');
  import uiInfos from "../components/uiInfos.vue";
  //import uiDropMenu from "./../components/uiDropMenu.vue";
  import {
    parts
  } from "../common/config/constants.js";
  export default {
    components: {
      "ui-infos": uiInfos
      //    "ui-drop-menu": uiDropMenu
    },
    data() {
      return {
        messageShow: [
          {
            'title': '日期',
            'data': []
          },
          {
            'title': '库存',
            'data': []
          },
          {
            'title': '增减',
            'data': []
          }
        ],
        showEvent1: false,
        showEvent2: false,
        rankingTitle: '库存仓单',
        gobackUrl: 'goBack',
        part: '',
        parts: parts,
        news: [],
        futuresExchange: {},
        futuresExchanges: [],
        showFuturesExchanges: false,
        futuresVarity: {},
        futuresVaritys: [],
        showFuturesVaritys: false,
        myCharts: null,
        basicOption: {
          color: ['#87c46c', '#5689ed'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            x: 'left',
            top: "-12%",
            padding: [30, 30, 30, 30],
            data: ['库存', '增减'],
            selected: {
              '库存': true,
              '增减': true
            }
          },
          grid: {
            left: '10',
            right: '10',
            bottom: '10',
            top: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'time',
            boundaryGap: ['20%', '20%'],
            splitNumber: 4,
            axisLabel: {
              textStyle: {
                color: '#000000',
                fontSize: 10 // 让字体变大
              },
              rotate: -15,
              formatter: function (value, index) {
                return moment(value).format('YYYYMMDD')
              }
            },
            axisLine: { //y轴坐标线颜色
              lineStyle: {
                color: '#b1b1b1'
              }
            },
            axisTick: { //坐标刻度是否显示
              show: false
            },
            splitLine: { //网格线
              show: true,
              lineStyle: {
                color: ['#E8E8E8'],
                type: 'solid'
              }
            }
          },
          yAxis: [{
            scale: true,
            splitNumber: 5,
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
          }, {
            type: "value",
            scale: true,
            splitNumber: 5,
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
          }],
          series: [{
            name: '库存',
            type: 'line',
            symbol: 'none',
            yAxisIndex: 0,
            areaStyle: {
              normal: {
                color: "#d9edd0"
              }
            },
          }, {
            name: '增减',
            type: 'line',
            symbol: 'none',
            yAxisIndex: 1
          }]
        }
      }
    },
    created() {
      this.part = this.parts.pbxgxw.part;
      this.queryAllFuturesExchange();
    },
    mounted() {
      this.myCharts = echarts.init(this.$refs.chart);
      this.myCharts.setOption(this.basicOption);
    },
    methods: {
      toggle0() {
        this.showEvent1 = !this.showEvent1;
      },
      toggle1() {
        this.showEvent2 = !this.showEvent2;
      },
      queryAllFuturesExchange() {
        this.$post([1, "queryAllFuturesExchange4Inventory"], {
          exchId: null
        }, false, undefined, true).then(res => {
          this.futuresExchanges = res;
          this.selectFuturesExchange(this.futuresExchanges[0]);
        });
      },
      selectFuturesExchange(f) {
        this.showEvent1 = false;
        this.futuresExchange = f;
        this.futuresVarity = {};
        this.$post([1, "queryAllFuturesExchange4Inventory"], {
          exchId: this.futuresExchange.id
        }, false, undefined, true).then(res => {
          this.futuresVaritys = res;
          this.selectFuturesVarity(this.futuresVaritys[0]);
        });
      },
      selectFuturesVarity(f) {
        this.showEvent2 = false;
        if (this.futuresVarity.code != f.code) {
          this.futuresVarity = f;
          this.setOption();
          //    this.getXgxw();
        }
      },
      setOption() {
        this.$get([1, "queryInventoryWeekShTop"], this.futuresVarity.code + "/12").then(res => {
          let series = [{
            data: []
          }, {
            data: []
          }];
          for (let i = 0; i < res.length; i++) {
            series[0].data.push([moment(res[i].tradeDate, "YYYYMMDD").format("YYYY-MM-DD"), res[i].f6]);
            series[1].data.push([moment(res[i].tradeDate, "YYYYMMDD").format("YYYY-MM-DD"), res[i].f8]);
          }
          console.log('参数');
          console.log(series);

          this.messageShow[0]['data'].length = 0;
          this.messageShow[1]['data'].length = 0;
          this.messageShow[2]['data'].length = 0;

          //显示的最新三条数据
          this.messageShow[0]['data'].push(series[0].data[0]['0'].replace(/-/g, ''));
          this.messageShow[0]['data'].push(series[0].data[1]['0'].replace(/-/g, ''));
          this.messageShow[0]['data'].push(series[0].data[2]['0'].replace(/-/g, ''));

          this.messageShow[1]['data'].push(series[0].data[0]['1']);
          this.messageShow[1]['data'].push(series[0].data[1]['1']);
          this.messageShow[1]['data'].push(series[0].data[2]['1']);

          this.messageShow[2]['data'].push(series[1].data[0]['1']);
          this.messageShow[2]['data'].push(series[1].data[1]['1']);
          this.messageShow[2]['data'].push(series[1].data[2]['1']);
          console.log('参数');
          console.log(series);
          this.myCharts.setOption({
            series: series
          });
        });
      },
      queryNewsType(part) {
        this.part = part;
        this.$post("newsBase", {
          pageNo: 1,
          pageSize: this.pageSize,
          tags: null,
          part: part
        }).then(res => {
          this.news = res.results;
        });
      },
      selectXgxw(part) {
        this.part = part;
        this.getXgxw();
      },
      getXgxw() {
        if (this.part == this.parts.pbxgxw.part) {
          this.$post("newsBase", {
            pageNo: 1,
            pageSize: 5,
            tags: [this.futuresVarity.code],
            codes: null,
            part: null
          }).then(res => {
            this.news = res.results;
          });
        }
      }
    }
  }
</script>
