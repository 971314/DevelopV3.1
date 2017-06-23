<template>
    <div class="mrk">
       <common-nav :gobackUrl="gobackUrl">
          <div slot="body">
             <!--<span class="select" @click="show">{{selected}}&nbsp;&nbsp;<img src="../../assets/images/select.png" width="10"></span>-->
             <span class="select">{{selected}}</span>
          </div>
       </common-nav>
        <div>
            <router-view></router-view>
        </div>
        <div class="my-modal" v-show="showBase">
          <div class="my-modal-backdrop" @click="showBase = false"></div>
          <div class="my-modal-dialog">
            <ul>
              <!--<li value="市场热点"><router-link :to="{path: '/mrkHot'}">市场热点</router-link></li>
              <li value="机构动向"><router-link :to="{path: '/jgdx'}">机构动向</router-link></li>
              <li value="套利分析"><router-link :to="{path: '/tlfx'}">套利分析</router-link></li>
              <li value="仓单库存"><router-link :to="{path: '/cdkc'}">仓单库存</router-link></li>-->
              <li @click="routerLink('市场热点')" v-bind:class="{active: activeItem == 'mrkHot'}">市场热点</li>
              <li @click="routerLink('机构动向')" v-bind:class="{active: activeItem == 'jgdx'}">机构动向</li>
              <li @click="routerLink('套利分析')" v-bind:class="{active: activeItem == 'tlfx'}">套利分析</li>
              <li @click="routerLink('仓单库存')" v-bind:class="{active: activeItem == 'cdkc'}">仓单库存</li>
            </ul>
          </div>
        </div>
    </div>
</template>
<script>
   export default{
       data:function(){
         return{
           showBase: false,
           selected: '市场热点',
           activeItem: 'mrkHot',
           gobackUrl: 'close'
         }
       },

     mounted: function () {
       this.$router.replace({path: '/mrkHot'});
     },
     methods:{
         show: function () {
           if (this.showBase) {
             this.showBase = false;
           } else {
             this.showBase = true;
           }
         },

         routerLink: function (val) {
           this.showBase = false;
           if (val == this.selected) {
             return;
           } else {
             this.selected = val;
             if (val == "市场热点") {
              this.activeItem = "mrkHot";
              this.$router.replace({path: '/mrkHot'});
             } else if (val == "机构动向") {
               this.activeItem = "jgdx";
               this.$router.replace({path: '/jgdx'});
             } else if (val == "套利分析") {
               this.activeItem = "tlfx";
               this.$router.replace({path: '/tlfx'});
             } else if (val == "仓单库存") {
               this.activeItem = "cdkc";
               this.$router.replace({path: '/cdkc'});
             }
           }
         }
     }
   }
</script>