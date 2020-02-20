import Vue from 'vue'
import router from '@/router'

// 引入Vuex
import store from '@/store/index.js'

// 引入自定义网络请求插件
import Http from '@/plugins/http'
Vue.use(Http)

// 按需引入antd：
import {
	Layout,
	Breadcrumb,
	Row,
	Col,
	Menu,
	Button,
	message,
	Input,
	InputNumber,
	Form,
	Rate,
	Select,
	Modal,
	Popconfirm,
	Upload,
	Table,
	Icon,
	Timeline,
	Radio,
	DatePicker,
	LocaleProvider,
} from 'ant-design-vue';

/* v1.1.3+ 自动注册Button下组件，如Button.Group */
Vue.use(Layout)
Vue.use(Breadcrumb)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Button)
Vue.use(message)
Vue.prototype.$message = message; // 挂载到vue实例上
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(Rate)
Vue.use(Modal)
Vue.use(Popconfirm)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Table)
Vue.use(Icon)
Vue.use(Radio)
Vue.use(Timeline)
Vue.use(DatePicker)
Vue.use(LocaleProvider)
 
Vue.config.productionTip = false

import App from './App.vue'

export default new Vue({
	render: h => h(App),
	store,
	router,
}).$mount('#app')

