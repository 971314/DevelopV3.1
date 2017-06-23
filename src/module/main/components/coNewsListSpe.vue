<template>
	<div class="news">
		<news-list
		:newsPar="newsPar"
		:tabs="newsTabs"
		:tags="tags">
		</news-list>
	</div>
</template>

<script>
	export default {
		name: 'news-list-spe',
		data() {
			return {
				newsPar: [],
			    newsTabs: [{
			                name: '财经新闻',
			                par: 'PBCJXW'
			              },{
			                name: '热点解读',
			                par: 'PBSYRDJD'
			              },{
			                name: '市场公告',
			                par: 'PBSCGG'
			            }],
			    tags: false
			}
		},
		methods: {
			getNewsListSpeSet() {//获取新闻条配置(coNewsList组件没做兼容处理,newsTabs不能为空)会报错
				this.$axios.get('../conf/cfMainConf.json')
		        .then((data) => {
		          	data = data.data['coNewsListSpe'];
		          	this.newsTabs = data['newsTabs'];
		        })
		        .catch((error) => {
		          	console.log(error);
		        });
			}
		},
		created() {
			this.getNewsListSpeSet && this.getNewsListSpeSet();
		}
	}
</script>