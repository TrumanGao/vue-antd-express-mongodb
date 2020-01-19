import Vue from 'vue'
import {Button} from 'ant-design-vue';
import App from './App.vue'

Vue.component(Button.name, Button);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
