<template>
  <div class="width95 list">
    <a :href="hrefUrl" class="block">
      <img :src="imgUrl"/>
    </a>
  </div>
</template>
<script type="es6">
  export default {
      props:['hrefUrl','imgUrl']
  }
</script>
