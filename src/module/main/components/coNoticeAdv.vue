<template>
	<div class="notice">
		<div>
          <img :src="noticeImage">
        </div>
        <div class="vertical-swipe">
          <vertical-swipe
          :noticeList="noticeList"
          :delay="noticeDelay">
          </vertical-swipe>
        </div>
        <div>
          <img :src="arrowRight">
        </div>
	</div>
</template>

<script>
	export default {
    name: 'notice-adv',
		data() {
			return {
        arrowRight: "",
        noticeDelay: 3000,
        noticeImage: "",
				noticeList: [],
        postData: {
          func: '7001',
          data: [{
            pageNo: 1,
            pageSize: 3,
            tags: null,
            part: 'PBQHGSGG'
          }]
        },
        postUrl: pbRC.RHS('newsbase', 'listurl')
			}
		},
    methods: {
      getNoticeAdv() {//获取纵向公告配置
        this.$axios.get('../conf/cfMainConf.json')
        .then((data) => {
          data = data.data['coNoticeAdv'];
          this.arrowRight = data['arrowRight'];
          this.noticeDelay = data['noticeDelay'];
          this.noticeImage = data['noticeImage'];
          this.getNoticeList && this.getNoticeList();
        })
        .catch((error) => {
          console.log(error);
        });
      },
      getNoticeList() {
        this.$axios.post(this.postUrl, this.postData).then((axiosData) => {
          var data = axiosData.data.data;
          // if (data && data[0]) {
          //   this.noticeList = data[0].results;
          // }
          this.noticeList = data[0].results;
        }).catch((error) => {
          console.error(error);
        });
      }
    },
    created() {
      this.getNoticeAdv && this.getNoticeAdv(); //获取横向新闻列表的数据
    }
	}
</script>