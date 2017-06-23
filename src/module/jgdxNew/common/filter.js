import Vue from "vue";
import moment from "moment";
const weekday = {
    0: "日",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六"
}
Vue.filter('dateFmt', function(value, fmt) {
    if (!value) {
        return null;
    }
    return moment(value).format(fmt ? fmt : "YYYY-MM-DD hh:mm:ss");
});

Vue.filter('getWeek', function(value, str) {
    return (value && weekday[moment(value).weekday()]) ? str + weekday[moment(value).weekday()] : null;
});
