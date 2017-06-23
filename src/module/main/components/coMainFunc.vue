<template>
  <div class="main-func-wrapper">
        <flex :class="rowClass[key]" v-for="(row, key) in rowInfo">
          <flex-item v-for="rowItem in row">
            <a :href="rowItem.href">
              <img :src="rowItem.image">
            </a>
          </flex-item>
        </flex>
  </div>
</template>

<script>
  export default {
    name: 'main-func',
    data() {
      return {
        rowClass: { //样式map表
          firstRow: "first-row",
          secondRow: "second-row"
        },
        rowInfo: {
          firstRow: [],
          secondRow: []
        }
      }
    },
    methods: {
      getMainFuncSet() {//获取展示区配置
        this.$axios.get('../conf/cfMainConf.json')
        .then((data) => {
          data = data.data['coMainFunc'];
          this.$nextTick(() => {//保证数据的渲染
            for (var k in data['rowInfo']) {
              this.rowInfo[k] = data['rowInfo'][k]; 
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
    created() {
      this.getMainFuncSet && this.getMainFuncSet();
    }
  }
</script>