<template>
  <div class="mrk">
    <common-nav :gobackUrl="gobackUrl">
      <div slot="body">
        <!--<span class="select" @click="show">{{selected}}&nbsp;&nbsp;<img src="../../assets/images/select.png" width="10"></span>-->
        <span class="select">{{selected}}</span>
      </div>
    </common-nav>
    <div>
      <tabbar class="no-margin" :activeKey="currentBar" @change="changeHandle" id="marketHot-tabbar">
        <tabbar-item v-for="item in tabs" :eventKey="item.name">{{item.name}}</tabbar-item>
        <a href="pobo:uncheck=1&pageId=800012&type=1"><img src="../images/share.png"
                                                           :style="{width: '20px', height: '20px', marginTop: '7px', marginRight:'10px'}"></a>
      </tabbar>
      <router-view></router-view>

     <!-- <news-list :newsPar="newsPar" :tabs="newsTabs"></news-list>-->
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        showBase: false,
        selected: '市场热点',
        activeItem: 'mrkHot',
        gobackUrl: 'close',
        tabs: [{
          name: '资金流向',
        }, {
          name: '资金沉淀',
        }, {
          name: '活跃品种',
        }],
        currentBar:this.getActiveBar()
      }
    },

    mounted: function () {
      var path = this.$route.path;
        console.log(path);
      if(path == '/mrkHot/zjlx')
        this.currentBar='资金流向'
      else if(path == '/mrkHot/zjcd')
        this.currentBar='资金沉淀'
      else if(path == '/mrkHot/hypz')
        this.currentBar='活跃品种'

      console.log(this.currentBar);
      //this.$router.replace({path: '/mrkHot/zjlx'});
    },
    methods: {
      getActiveBar: function () {
        var path = this.$route.path;
        if(path == '/mrkHot/zjlx')
          return '资金流向';
        else if(path == '/mrkHot/zjcd')
          return '资金沉淀';
        else if(path == '/mrkHot/hypz')
          return '活跃品种';
      },

      show: function () {
        if (this.showBase) {
          this.showBase = false;
        } else {
          this.showBase = true;
        }
      },

      initPage(){
        if (pbPage.getInitState()) {
          pbPage.addReloadFun(this.pageReload);
        } else {
          pbPage.initPage({
            reload: this.pageReload
          });
          this.pageReload();
        }
      },
      pageReload() {
        /*this.$router.replace({path: '/zjlx'});*/
      },
      changeHandle(val) {
        if (val == "资金流向") {
          this.$router.replace('/mrkHot/zjlx')
          console.log("1:"+ this.$route.fullPath);
        } else if (val == "资金沉淀") {
          this.$router.replace('/mrkHot/zjcd')
          console.log("2:"+ this.$route.fullPath);
        } else if (val == "活跃品种") {
          this.$router.replace('/mrkHot/hypz')
          console.log("3:"+ this.$route.fullPath);
        }
      }
    }
  }
</script>
