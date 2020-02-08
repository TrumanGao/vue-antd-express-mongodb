import Vue from 'vue'
import router from '@/router'

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
	Form,
	Rate,
	Select,
	Modal,
	Popconfirm,
	Upload,
	Table,
	Icon
} from 'ant-design-vue';
/* v1.1.2 */
// Vue.component(Button.name, Button);
// Vue.component(Button.Group.name, Button.Group);
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
Vue.use(Form)
Vue.use(Rate)
Vue.use(Modal)
Vue.use(Popconfirm)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Table)
Vue.use(Icon)

Vue.config.productionTip = false

import App from './App.vue'

new Vue({
	render: h => h(App),
	router,
}).$mount('#app')
