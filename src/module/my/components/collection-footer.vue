<template>
  <div class="cellectionFooter">
    <span @click="selectClick">全选</span>
    <span @click="deleteClick" class="red">删除{{num}}</span>
  </div>
</template>
<script type="es6">
  export default {
      props:['num'],
    methods:{
      selectClick(){
          this.$emit('selectClick')
      },
      deleteClick(){
          this.$emit('deleteClick')
      }
    }
  }
</script>