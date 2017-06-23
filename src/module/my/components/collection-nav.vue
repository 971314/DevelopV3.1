<template>
  <div class="collection-nav">
  <nav>
    <a href="goBack" :class="{placeholder:navIsShow}" >
      <img src="../../../assets/images/title-back.png"/>
    </a>
    <span class="tipp">{{captionText}}</span>
    <span @click="edit" class="right">{{rigthText}}</span>
  </nav>
  </div>
</template>
<script type="es6">
  export default {
      props:['captionText','rigthText','navIsShow'],
    methods:{
      edit(){
          this.$emit('edit')
      }
    }
  }
</script>
