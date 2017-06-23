<template>
  <div class="full-height">
    <common-nav id="navbarContent" :gobackUrl="gobackUrl" class="pb-jgdx">
      <ul slot="body" style="font-size: 0; line-height: 58px; padding-left: 20px;" >
        <li class="ventor" :class="{ active: activeIndex == 0  }" @click="changeHandle(0)">
          <span>品种</span>
        </li>
        <li class="ventor" :class="{ active: activeIndex == 1  }" @click="changeHandle(1)">
          <span>机构</span>
        </li>
      </ul>
    </common-nav>
    <router-view></router-view>
    <!--<mt-spinner v-if="spinner" type="double-bounce" class="spinner" :color="color" :size="30"></mt-spinner>-->
    <!--<mt-spinner v-if="!spinner && loading" type="snake" class="spinner" :color="color" :size="30"></mt-spinner>-->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        gobackUrl: 'goBack',
        activeIndex: 0,
        color: "#eb1212"
      }
    },
    created() {
      this.$store.commit("loading", false);
      this.$loading.toggle();
    },
    computed: {
      spinner() {
        return this.$store.state.spinner
      },
      loading() {
        return this.$store.state.loading
      }
    },
    methods: {
//        changeActiveKey(event,val) {//change activekey
//          this.activeIndex = val;
//          console.log('change');
//          console.log('val');
//        },
        changeHandle(type) {
          this.activeIndex = type;
          if(type == 0){
            this.$router.replace('/variety')
          }else if (type == 1){
            this.$router.replace('/institution')
          }
        }
    }
  }
</script>
