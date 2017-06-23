<template>
  <div class="my-group-pb">
  <div class="groupDiv">
    <a :href="linkUrl" target="_blank" v-model="name" class="groupC" :style="interval ? 'border-bottom:0px' : ''">
      <img :src="groupImg" class="iconimg"/>
      {{name}}
    <img :src="youJianTou" class="groupimg"/>
    </a>
  </div>
  </div>
</template>
<script type="es6">
  import youJianTou from '../images/yuoJianTou.png';
  export default {
      data(){
          return {
            youJianTou:youJianTou
          }
      },
    props:['linkUrl','groupImg','name','interval']
  }
</script>
