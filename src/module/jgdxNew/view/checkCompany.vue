<template>
    <div class="full-height">
      <common-nav :gobackUrl="gobackUrl" class="pb-jgdx">
        <span slot="body" v-text="rankingTitle"></span>
      </common-nav>
        <div class="container">
            <div class="k-search" :class="{'active':keyworld}">
                <input type="text" v-model="keyworld">
            </div>
            <mt-index-list>
                <mt-index-section :index="k" v-for="(vs,k) in companys">
                    <mt-cell :title="v.memberName" v-for="v in vs" :href="'#/institution?companyid='+v.memberId+'&companyname='+v.memberName"></mt-cell>
                </mt-index-section>
            </mt-index-list>
        </div>
    </div>
</template>
<script>
  //import _ from "lodash";
export default {
    data() {
            return {
                gobackUrl: 'goBack',
                rankingTitle: '选择公司',
                keyworld: '',
                cs: {}
            }
        },
        created() {
            this.$get([1, "queryFuturesMember"], -1).then(res => {
                this.cs = res;
            });
        },
        computed: {
            companys() {
                let cs = {};
                for (let k in this.cs) {
                    let v = _.filter(this.cs[k], (c) => {
                        return c.memberName.match(this.keyworld);
                    })
                    if (v.length != 0) {
                        cs[k] = v;
                    }
                }
                return cs;
            }
        }
}
</script>
