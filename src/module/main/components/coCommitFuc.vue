<template>
<div class="common-func">
	<div class="parent-wrap">
		<swipe :dots="hasDots" :autoplay="false">
            <swipe-item v-for="(items, index) in showContent">
            	<div class="item-warp">
            		<div class="warp-item" :style="{width: swipeItemWidth}" v-for="item in items">
		        		<toast-btn :addr="item.url" @clicks="aClick && aClick(item)">
		        			<img :src="item.image1">
		        			<p>{{item.title}}</p>
		        			<div v-if="item['flag']" class="newItem">
			        			<img src="../images/new.png" />
			        		</div>
		        		</toast-btn>
		        	</div>
            	</div>
            </swipe-item>
        </swipe>
	</div>
</div>
</template>

<script>
	export default {
		name: 'commit-fuc',
		props: {
			isUserDefined: {
				type: Boolean,
				default: false
			},
			isShowDots: {
				type: Boolean,
				default: null
			},
			maxPage: {
				type: Number,
				default: 2
			},
			swipeRow: {
				type: Number,
				default: 1
			},
			singleRowNum: {
				type: Number,
				default: 5
			}
		},
		data() {
			return {
				addURL: "",
				addImage: "",
				addTitle: "",
				addID: "",
				itemLists: {},
				showContent: []
			}
		},
		computed: {
			hasDots() {
				if (this.isShowDots != null) {
					return this.isShowDots
				}else{
					if (this.showContent.length < 2) {
						return false;
					}
					else if(this.showContent.length >= 2) {
						return true;
					}
					else {
						return false;
					}
				}
			},
			itemList() {
				if (this.itemLists) {
					return this.itemLists;
				}
			},
			itemNum() {
				return this.swipeRow*this.singleRowNum
			},
			swipeItemWidth() {
				return ((100/this.singleRowNum) - 0.1) + '%'
			},
			MaxNum() {
				if (this.isUserDefined) {
					return this.maxPage*this.itemNum - 1
				}else {
					return this.maxPage*this.itemNum
				}
			},
			getCustoms() {
				if (this.itemList.customs) {
					return this.itemList.customs
				}else {
					return ''
				}
			}
		},
		methods: {
			aClick(item) { //点击响应方法
				if(item.flag) {
					if (pbE.isPoboApp && pbE.SYS().isHasLocalFile('main' , 1)) {
						var localMain = pbE.SYS().readLocalFile('main', 1);
						localMain = JSON.parse(localMain);
						for (var i = 0; i < localMain.contents.length; i++) {
							if (localMain.contents[i].id == item.id) {
								delete localMain.contents[i].flag
							}
						}
						pbE.SYS().writeLocalFile('main', 1, JSON.stringify(localMain))
					}
				}
			},
			getCommitFuncSet() {//获取功能区配置
				this.$axios.get('../conf/cfMainConf.json')
		        .then((data) => {
		          	data = data.data['coCommitFuc'];
		          	this.addURL = data['addURL'];
		          	this.addImage = data['addImage'];
		          	this.addTitle = data['addTitle'];
		          	this.addID = data['addID'];
		          	this.getCustomData && this.getCustomData();
		        })
		        .catch((error) => {
		          	console.log(error);
		        });
			},
			getCustomData() {//获取数据
				if (pbE.isPoboApp) {
					this.itemLists = JSON.parse(pbE.SYS().readConfig('conf/cfMain.json'));
					this.showContent = this.showContents();
				} else {
			 		this.$axios.get('../conf/cfMain.json').then((data) => {
			   		this.itemLists = data.data;
			   		this.showContent = this.showContents();
			      	}).catch((err) => {
			   		console.log('服务器异常',err)
			 		});
				}
			},
			showContents() {  //处理功能区逻辑
				var localMain = this.getCustoms;
				if (pbE.isPoboApp) {
					if (pbE.SYS().isHasLocalFile('main', 1)) {
						localMain = pbE.SYS().readLocalFile('main', 1);
						localMain = JSON.parse(localMain);
						if(localMain && this.getCustoms) {
							if (localMain.version != this.getCustoms.version) {
								localMain.version = this.getCustoms.version
								var temp = {}, temp2 = {}
								for (var i = 0; i < localMain.contents.length; i++) {
									temp[localMain.contents[i].id] = localMain.contents[i]
								}

								for (var j = 0; j < this.getCustoms.contents.length; j++) {
									temp2[this.getCustoms.contents[j].id] = this.getCustoms.contents[j]
									if (!temp[this.getCustoms.contents[j].id]) {
										var obj = {}
										obj = this.getCustoms.contents[j]
										obj.flag = true
										localMain.contents.unshift(obj)
									}
								}
								var newsList = []
								for (var j = 0; j < localMain.contents.length; j++) {
			                        var d = localMain.contents[j], d2 =temp2[d.id]
			                        if(d2)
			                        {
			                                d.checked = d2.checked;
			                                d.title = d2.title;
			                                d.image1 = d2.image1;
			                                d.image2 = d2.image2;
			                                d.url = d2.url;
			                                newsList.push(d)
			                        }
			                    }
			                    localMain.contents = newsList
			                    pbE.SYS().writeLocalFile('main', 1, JSON.stringify(localMain))
							}
						} else {
							pbE.SYS().writeLocalFile('main', 1, JSON.stringify(localMain = this.getCustoms))
						}
					}else {
						pbE.SYS().writeLocalFile('main', 1, JSON.stringify(localMain = this.getCustoms))
					}
				}

				var arr = []
				var contentArr = []
				var addObj = {
					"title": this.addTitle,
			        "checked": "1",
			        "image1": this.addImage,
			        "image2": this.addImage,
			        "url": this.addURL,
			        "id": this.addID
				}
				var sizeFlag = 0
				var length = localMain.contents.length
				if (length > 0) {
					for (var i = 0; i < length; i++) {
						if (localMain.contents[i].checked === '1' && sizeFlag < this.MaxNum) {
							sizeFlag++
							arr.push(localMain.contents[i])
							if (arr.length % this.itemNum === 0) {
								contentArr.push(arr)
								arr = []
							}
						}
					}
				}
				if(this.isUserDefined) {
					arr.push(addObj)
				}
				if (contentArr.length < this.maxPage) {
					if (arr.length == 0) {
						return contentArr;
					}
					contentArr.push(arr);
					// //添加空白滚动页
					// if (contentArr.length == this.maxPage) {
					// 	return contentArr;
					// }
					// var conLength = contentArr.length;
					// for(var i = 0; i < this.maxPage-conLength; i++) {
					// 	arr = []
					// 	contentArr.push(arr)
					// }
					return contentArr;


				}else if (contentArr.length == this.maxPage) {
					return contentArr
				}
			}
		},
		created() {
			this.getCommitFuncSet && this.getCommitFuncSet();//获取功能区的配置数据
		}
	}
</script>