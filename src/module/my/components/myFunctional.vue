<template>
  <toast-btn :addr="functionalUrl" class="functional">
    <img :src="icon"/>
    <span v-model="name">{{name}}</span>
  </toast-btn>
</template>
<script>
export default {
    props:['icon','name','functionalUrl']
}
</script>
