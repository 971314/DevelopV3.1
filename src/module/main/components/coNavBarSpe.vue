<template>
	<div class="navbar-spec">
		<with-status-bar>
	      <navbar id="indexNav" theme="default">
	        <city />
	        <div slot="body">
	          <a :href="NavBarHref">
	            <img class="search" :src="searchImage">
	            <img class="search-box" :src="searchBoxImage">
	            <img class="speak" :src="speakImage">
	          </a>
	        </div>
	        <div slot="footer">
	          <message-icon></message-icon>
	          <a class="service" :href="serviceHref">
	            <img :src="serviceImage">
	          </a>
	        </div>
	      </navbar>
	    </with-status-bar>
	</div>
</template>

<script>
	export default {
		name: 'nav-bar-spe',
		data() {
			return {
				searchImage: "",
				searchBoxImage: "",
				speakImage: "",
				serviceImage: "",
				serviceHref: "",
				NavBarHref: ""
			}
		},
		methods: {
			getNavBarSpeSet() { //获取导航条配置
				this.$axios.get('../conf/cfMainConf.json')
		        .then((data) => {
		          	data = data.data['coNavBarSpe'];
			        this.searchImage = data['searchImage'];
			        this.searchBoxImage = data['searchBoxImage'];
			        this.speakImage = data['speakImage'];
			        this.serviceImage = data['serviceImage'];
			        this.serviceHref = data['serviceHref'];
			        this.NavBarHref = data['NavBarHref'];
		        })
		        .catch((error) => {
		          	console.log(error);
		        });
			}
		},
		created() {
			this.getNavBarSpeSet && this.getNavBarSpeSet();
		}
	}
</script>