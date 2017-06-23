<template>
  <div class="rslt">
    <p class="header">基金/资管</p>
    <div class="type">
      <img :src="rsltImgSrc" alt="" />
    </div>
    <p class="level">您的风险级别</p>
    <router-link class="btn btn-block btn-fourthly" to="/risk/qnr" replace>重新测评</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      levelConfig: {
        'level-1': {
          rsltImgSrc: './images/result1.png',
          typeText: '保守型',
          riskRank: '低'
        },
        'level-2': {
          rsltImgSrc: './images/result2.png',
          typeText: '稳健型',
          riskRank: '中/低'
        },
        'level-3': {
          rsltImgSrc: './images/result3.png',
          typeText: '积极型',
          riskRank: '高/中/低'
        },
        'level-4': {
          rsltImgSrc: './images/result4.png',
          typeText: '积极型',
          riskRank: '高/中/低'
        },
        'level-5': {
          rsltImgSrc: './images/result5.png',
          typeText: '积极型',
          riskRank: '高/中/低'
        }
      },
      rsltImgSrc: './images/result.png',
      typeText: '',
      riskRank: ''
    }
  },
  created () {
    var level = this.$route.params.rslt;
    this.rsltImgSrc = this.levelConfig['level-' + level].rsltImgSrc;
    this.typeText = this.levelConfig['level-' + level].typeText;
    this.riskRank = this.levelConfig['level-' + level].riskRank;
  },
  mounted () {
    document.getElementById('title').innerHTML = '风险测评';
  }
}
</script>
