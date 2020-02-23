import Vue from 'vue'
import moment from 'moment'; //日期格式化
export function dateformat (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return  moment(dataStr).format(pattern)
}
const filters = {
    dateformat
}
export default filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})