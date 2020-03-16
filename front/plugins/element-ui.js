import Vue from 'vue'
import locale from 'element-ui/lib/locale/lang/en'

//全局引用
//import Element from 'element-ui'

// 按需引用
import { Row,Col,Menu,MenuItem,submenu,Pagination,Breadcrumb,BreadcrumbItem,} from 'element-ui'
// 按需使用
Vue.use(Row, { locale })
Vue.use(Col, { locale })
Vue.use(Menu, { locale })
Vue.use(MenuItem, { locale })
Vue.use(submenu, { locale })
Vue.use(Pagination, { locale })
Vue.use(Breadcrumb, { locale })
Vue.use(BreadcrumbItem, { locale })



// export default () => {
//   Vue.use(Element, { locale })
// }
