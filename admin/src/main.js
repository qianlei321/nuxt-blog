import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import 'font-awesome/css/font-awesome.min.css' //引入字体图标
import {get,post,newAxios} from './assets/js/http.js' //axios封装
import url from './assets/js/config.js' //接口config
import './components/common/directives';  //窗口拖动
import "babel-polyfill";
import moment from 'moment'; //日期格式化
import VueBus from 'vue-bus';

Vue.config.productionTip = false

Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(VueBus);

Vue.prototype.$url=url;
Vue.prototype.$axios = newAxios;
Vue.prototype.$get=get;
Vue.prototype.$post=post;

//定义全局过滤器dateformat,用于格式化UTC格式时间
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('admin_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        //role === 'admin' ? next() : next('/403');
        next()
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')