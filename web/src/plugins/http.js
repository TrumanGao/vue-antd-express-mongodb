import axios from 'axios'

const Http = {}
Http.install = function (Vue) {
    // 4. 添加实例方法

    // 设置接口基准地址
    axios.defaults.baseURL = "http://localhost:3000";

    //   挂载到vue实例上
    Vue.prototype.$axios = axios
}

export default Http