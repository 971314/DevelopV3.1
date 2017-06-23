<template>
  <a :href="functionalUrl" class="noviceFunctional">
    <img :src="functionalIcon"/>
    <span v-model="name">{{name}}</span>
  </a>
</template>
<script type="es6">
  export default {
      props:['functionalUrl','functionalIcon','name']
  }
</script>
