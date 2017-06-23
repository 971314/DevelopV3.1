<template>
  <div class="my-header-pb">
  <div class="myhead">
    <img :src="myBackImg"/>
    <div class="headPortrait colorFont">
      <div>
        <img :src="headImg"/>
        <span v-model="userName">{{userName}}</span>
      </div>
    </div>
    <div class="headArea colorFont">
        <span @click="mysign()">签到</span>
        <span v-model="coinBuilt">建投币：{{coinBuilt}}</span>
        <a v-model="collection" target="_blank" :href="collectionUrl">收藏：{{collection}}</a>
    </div>
  </div>
  </div>
</template>
<script type="es6">
  export default {
    props:['myBackImg','userName','headImg','coinBuilt','collection','collectionUrl'],
    methods:{
      mysign:function(){
        this.$emit('mysign')
      }
    }
  }
</script>
