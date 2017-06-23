<template>
  <div>
    <common-nav :goback="false" class="indNews">
       <ul slot="body" style="line-height: 44px; padding-left: 20px;" >
        <li class="ventor" :class="{ active: activeIndex == 0  }" @click="changeHandle(0)">
          <span>建投优选</span>
        </li><li class="ventor" :class="{ active: activeIndex == 1  }" @click="changeHandle(1)">
          <span>行业资讯</span>
        </li>
      </ul>
   </common-nav>


    <!--<router-view :tabs="tabs" keep-alive></router-view>-->
    <keep-alive include>
        <router-view :tabs="tabs"></router-view>
    </keep-alive>

    <!--<news-list :news-list="news" :tabs="tabs"></news-list>-->
  </div>
</template>
<script>
  export default {
    data:function(){
      return{
        tabs: [{
          "name":"国内资讯",
          "ids":["10101"],
          "count": 30
        },
        {
          "name":"金融财经",
          "ids":["10301"],
          "count": 30
        },
        {
          "name":"稀贵金属",
          "ids":["40102","40202"],
          "count": 30
        },
        {
          "name":"金属市场",
          "ids":["40101","40201"],
          "count": 30
        },
        {
          "name":"农产品",
          "ids":["40104","40204"],
          "count": 30
        },
        {
          "name":"能源化工",
          "ids":["40105","40205"],
          "count": 30
        },
        {
          "name":"黑色金属",
          "ids":["40103","40203"],
          "count": 30
        },
        {
          "name":"股指期货",
          "ids":["30101","30102"],
          "count": 30
        }],
        activeIndex: 0
      }
    },
    components: {
      //'nav-bar': NavBar,
      //'news-list': NewsList
    },
    methods: {
      changeHandle(val) {
        this.activeIndex = val;
        if(val == 0){
          this.$router.push('/jtyx')
        }else if (val == 1){
          this.$router.push('/hyzx')
        }
      },
    },
  }
</script>