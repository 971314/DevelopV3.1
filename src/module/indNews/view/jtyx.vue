<template>
   <div class="jtyx">
    <tabbar class="scroll no-margin" :activeKey="tabs[0].part" @change="changeHandle">
      <tabbar-item v-for="tab in tabs" :eventKey="tab.part">{{ tab.name }}</tabbar-item>
    </tabbar>

    <div class="loadmore-wrapper">
      <loadmore
          :bottomMethod="query"
          :bottomAllLoaded="noMore"
          @bottomStatusChanged="statusChangeHandle"
          ref="loadmore">
          <div id="info-list">
            <a v-for="info in infos" class="list clearfix" v-bind:href="'pobo:goback=0&uncheck=1&pageId=900005&url=consult/index.html#/detail?cId='+info.id">
              <div class="list-info">
                <div class="info-title" v-text="info.infotitle"></div>
                <div class="info-more"><span v-text="info.source"></span> {{ dateFmt(info.updatetime) }}</div>
              </div>
              <div class="list-img">
                <img :src="shortimgurl + info.thumbid +'.png'" onerror="this.onerror=null; this.src='../images/default.png'">
              </div>
            </a>
        </div>
      </loadmore>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  data() {
    return {
      tabs:[
        { name: "财经要闻", part: "PBCJYW" },
        { name: "研发报告", part: "PBYFBG" },
        { name: "热点解读", part: "PBZXRDJD" },
        { name: "每日早评", part: "PBMRZP" }
      ],
      shortimgurl: pbRC.RHS('newsbase', 'shortimgurl'),
      show: 'PBCJYW',
      pageNo: 0,
      pageSize: 20,
      infos: [],
      loading: false,
      noMore: false,
      bottomStatus: '',
    }
  },
  mounted () {
    this.query();
  },
  methods: {
    changeHandle(e) {
      this.noMore = false;
      this.loading = false;
      this.show = e;

      this.infos = [];
      this.pageNo = 0;
      this.query();
    },
    query() {
      var _this = this;
      _this.loading = true;
      if (_this.noMore) {
        return _this.$toast("没有更多了");
      }
      _this.pageNo++;
      Axios.post(pbRC.RHS('newsbase', 'searchpageurl'), {
        pageNo: _this.pageNo,
        pageSize: _this.pageSize,
        tags: null,
        part: _this.show
      }).then(function (axiosData) {
        var res = axiosData.data.data;
        for (let r of res.results) {
          _this.infos.push(r);
        }
        if (res.results.length < _this.pageSize) {
          _this.noMore = true;
        }
        _this.loading = false;
      }).catch(function (error) {
        console.error(error);
      });
    },
    statusChangeHandle(status) {
        this.bottomStatus = status;
    },
    dateFmt (dateLong) {
      var date = new Date(dateLong);
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
          D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ',
          h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':',
          m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
      return M + D + h + m;
    }
  }
}
</script>