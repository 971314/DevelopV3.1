<template>
  <div class="collection-list">
  <div class="list" @click="listSelectClick">
    <span class="container" :class="{hide:isHide,select:isSelect}"></span>
    <!--<input type="checkbox" name="list" class="inputCheck"/>-->
    <a :href="url" class="aBlock" target="_blank">
      <div class="news" :style="isHide ? 'width:79%;padding-left:0;':'width:72.5%;padding-left:1rem;'">
        <span v-model="title">{{title}}</span>
        <span v-model="source">{{source}}</span>
        <span v-model="time">{{time}}</span>
      </div>
      <img :src="newsImg" class="newImg" onerror="this.src='../images/default.png'" v-if="newsImg"/>
      <img src="../../../assets/images/default.png" class="newImg" v-else/>
    </a>
  </div>
  </div>
</template>
<script type="es6">
  export default {
    props:['url','source','title','time','newsImg','isHide','id','isSelect'],
    methods:{
      listSelectClick(){
          this.$emit('listSelectClick');
      }
    }
  }
</script>
