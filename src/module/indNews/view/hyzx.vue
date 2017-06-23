<template>
 <div class="hyzx">
  <div class="scroll" style="overflow: hidden;">
    <tabbar class="no-margin" :activeKey="tabs[0].name" @change="getObjBeforeData" ref="scroll">
        <tabbar-item v-for="item in tabs" :eventKey="item.name">{{item.name}}</tabbar-item>
    </tabbar>
  </div>

  <div id="info-list">
   <div class="list-group">
     <a v-for="item in newsList" class="list-group-item clearfix" v-bind:href="'pobo:goback=0&uncheck=1&pageId=904002&url=indNews/index.html#/details/'+item.ID"><span class="title">{{item.Title}}</span><span class="time">{{item.Pubtime}}</span></a>
     <!--<a v-for="item in newsList" class="list-group-item clearfix" v-bind:href="'file:///E:/develop/PbRes/DevelopV3/dist/indNews/index.html#/details/'+item.ID"><span class="title">{{item.Title}}</span><span class="time">"1111"+{{item.Pubtime}}</span></a>-->
    </div>
  </div>
 </div>
</template>

<script>
  import '../../../assets/js/jroll.min.js'

    export default{
      props: ['tabs'],

      data: function(){
        return {
          newsList: [],
          count: 0
        }
      },

      mounted: function () {
        var width = document.documentElement.clientWidth;
        var num = Math.ceil(this.tabs.length/4);
        var scroll = this.$refs.scroll.$el;
        document.getElementsByClassName('no-margin')[0].style.width = num*width + 'px';
        for (var i = 0, j = scroll.children.length; i < j; i++) {
          scroll.children[i].style.width = width/4 + 'px';
          scroll.children[i].style.float = 'left';
        }
        scroll.style.width = width*num;
        //$('.tabbar>tabbar-item').css('float', 'left');
        /*$('.tabbar .tabbar-item').css('width', width/4);
        $('.tabbar').css('width', width*num);*/

        var option = {
          scrollX: true,
          scrollY: false,
          scroller: '.tabbar',
          maxX: -width*(scroll.children.length-5)/4,//添加滑动限制(滑动的最大距离)
          minX: 0,
          bounce: false
        },
        jroll = new JRoll(".scroll", option);

        this.getData(this.tabs[0]);
        this.initPage();
        // window.callback = function (message) {
        //   var msg = JSON.parse(message);
        //   if(msg.moduleId == 90004){
        //     var CONTENTS = msg.jData.Indexes.slice(0, this.count);
        //     this.newsList = CONTENTS;
        //     //ReactDOM.render(React.createElement(InfoList, { contents: CONTENTS, dir: dirStr }), document.getElementById('info-list'));
        //   }
        // }.bind(this);
      },

      methods: {
          callback_90012(msg) {
            msg = JSON.parse(message);
            var CONTENTS = msg.jData.Indexes.slice(0, this.count);
            this.newsList = CONTENTS;
          },
          initPage(){
          if (pbPage.getInitState()) {
            pbPage.addModuleCallback(90012, this.callback_90012);
            pbPage.addReloadFun(this.pageReload);

          } else {
            pbPage.initPage({
              reload: this.pageReload,
              callbacks: [{module: 90012, callback: this.callback_90012}]
            });
            this.pageReload();
          }

        },
        pageReload(){

        },
        getData: function (obj) {
          this.count = obj.count;
          if (pbE.isPoboApp) {
            pbE.INFO().infoQueryListWithJson(JSON.stringify({type: 'mu', groupIDs: obj.ids, doc: 'json', count: obj.count}));
          }
          /*this.newsList = [{"ID":"551304","Pubtime":"2017-04-14 09:18","Title":"【谈金说银】2017年4月14日","Type":null},{"ID":"550204","Pubtime":"2017-04-13 09:19","Title":"【谈金说银】2017年4月13日","Type":null},{"ID":"549104","Pubtime":"2017-04-12 09:17","Title":"【谈金说银】2017年4月12日","Type":null},{"ID":"547604","Pubtime":"2017-04-11 09:06","Title":"【谈金说银】2017年4月11日","Type":null},{"ID":"546704","Pubtime":"2017-04-10 09:13","Title":"【谈金说银】2017年4月10日","Type":null},{"ID":"545404","Pubtime":"2017-04-07 09:14","Title":"【谈金说银】2017年4月7日","Type":null},{"ID":"544304","Pubtime":"2017-04-06 09:18","Title":"【谈金说银】2017年4月6日","Type":null},{"ID":"543004","Pubtime":"2017-04-05 09:11","Title":"【谈金说银】2017年4月5日","Type":null},{"ID":"541704","Pubtime":"2017-03-31 09:27","Title":"【谈金说银】2017年3月31日","Type":null},{"ID":"541504","Pubtime":"2017-03-31 09:14","Title":"【公告】关于2017年清明节休市安排的公告","Type":null}];*/
        },

        getObjBeforeData: function (val) {
          var arr = this.tabs;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].name == val) {
              this.getData(arr[i]);
              return;
            }
          }
        },

        showDetail: function (id) {
          /*const path = '/details/' + id;
          this.$router.push({path: path})*/
          window.location.href = "pobo:uncheck=1&pageId=904002&url=indNews/index.html#/details/" + id;
        }
      }
    }
</script>