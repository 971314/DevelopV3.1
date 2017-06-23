<template>
  <div class="adver" id="adver">
    <swipe :interval="advDelay" :dots="advList.length > 1 ? true : false" :style="imgSet">
        <swipe-item v-for="adv in advList">
          <a :href="getUrl && getUrl(adv)">
            <!--加上this.onerror=null  可以避免找不到图片进入死循环-->
            <img :src="imgurl + adv.imageid +'.png'" onerror="this.onerror=null;this.src='../images/default-adv.png'">
          </a>
        </swipe-item>
        <swipe-item v-if="advList.length == 0">
          <a href="javascript:void(0)"><img :src="defaultImage"></a>
        </swipe-item>
    </swipe>
  </div>
</template>
<script>
  export default {
    name: 'advert',
    data () {
      return {
        advDelay: 3000,
        advList: [],
        centerUrl1: '900005&url=consult/index.html#/detail?cId=',
        centerUrl2: '900004&title=',
        defaultImage: '',
        headUrl: 'pobo:goback=0&uncheck=1&pageId=',
        imgurl: pbRC.RHS('newsbase', 'imgurl'),
        imgSet: {},//图片设置
        postData: {
          func: '661',
          data: {
            advtype: 'PBSYGG'
          }
        },
        postUrl: pbRC.RHS('bsapply', 'url')
      }
    },
    methods: {
      getAdvList() { //获取广告图片
        this.$axios.post(this.postUrl, this.postData).then((axiosData) => {
          var data = axiosData.data.data;
          this.advDelay = (data[0].advstep - 0) * 1000;
          this.advList = data[0].infoadv;
        }).catch((error) => {
          console.error(error);
        });
      },
      getAdvSet() {//获取广告配置
        this.$axios.get('../conf/cfMainConf.json')
        .then((data) => {
          data = data.data['coAdvert'];
          this.advDelay = data['advDelay'];
          this.defaultImage = data['defaultImage'];
          for (var k in data['imgSet']) {
            this.imgSet[k] = data['imgSet'][k];
          }
          this.getAdvList && this.getAdvList();
        })
        .catch((error) => {
          console.log(error);
        });
      },
      getUrl (adv) { //获取广告图片url
        if(!adv.url || (adv.url.substr(0, 7) != 'http://' && adv.url.substr(0, 8) != 'https://')) {
          return this.headUrl + this.centerUrl1 + adv.detailId;
        } else {
          return this.headUrl + this.centerUrl2 + adv.infotitle + '&url=' + adv.url;
        }
      }
    },
    created() {
      this.getAdvSet && this.getAdvSet();
    }
  }


</script>