<template>
    <div>
        <router-link :to="{name:'detail',query:{cId:info.id}}" tag="div" class="list" v-for="info in infos" v-if="info.id != exclude">
            <div class="list-info">
                <div class="info-title" v-text="info.infotitle"></div>
                <div class="info-more"><span v-text="info.source"></span> {{info.pushdate | dateFmt('MM-dd hh:mm')}}</div>
            </div>
            <div class="list-img">
                <img :src="projectPrefix[0]+slImg+'/'+info.thumbid">
            </div>
        </router-link>
    </div>
</template>
<script>
import {
    slImg
} from "./../common/config/constants.js"
export default {
    props: {
        infos: {
            type: Array,
            default: []
        },
        exclude: {
            type: Number
        }
    },
    data() {
        return {
            slImg: slImg
        }
    }
}
</script>

