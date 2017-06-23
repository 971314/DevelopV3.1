<template>
	<div class="set">
		<group>
	      <cell href="pobo:uncheck=1&pageId=805006" :hasArrow="hasArrow">
	        交易设置
	        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
	      </cell>
	      <cell href="pobo:uncheck=1&pageId=805007" :hasArrow="hasArrow">
	        系统设置
	        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
	      </cell>
	      <cell href="pobo:uncheck=1&pageId=805008" :hasArrow="hasArrow">
	        系统地址
	        <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
	      </cell>
	      <cell href="pobo:uncheck=1&pageId=805009" :hasArrow="hasArrow">
	        版本说明
	       <img class="more" slot="footer" src="../../../assets/images/arrow-right.png">
	      </cell>
	    </group>
	</div>
</template>

<script>
	export default {
		data () {
		    return {
		      hasArrow: true
		    }
	  	},
	  	mounted() {
	  		
	  	}
	}
</script>