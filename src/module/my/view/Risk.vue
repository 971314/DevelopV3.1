<template>
  <div class="risk">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a><a class="search" href="pobo:uncheck=1&pageId=800013">
          <img src="../../../assets/images/title-search.png"
        </a>
      </div>
      <div slot="body" id="title">
        合格投资者认定
      </div>
      <div slot="footer">
        <message-icon></message-icon>
        <a class="service" href="javascript:void(0)">
          <img src="../../../assets/images/service.png">
        </a>
      </div>
    </navbar>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    var rslt = localStorage.getItem('rslt');
    if (rslt) {
      this.$router.replace('/risk/rslt/' + rslt);
    }
  }
}
</script>