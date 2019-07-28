import Vue from 'vue'
import App from './App.vue'
import 'normalize.css'
import EleForm from 'vue-ele-form'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(EleForm, {
  upload: {
    action: 'https://jsonplaceholder.typicode.com/posts/', // 请求地址,
    data: { token: 'xxx' }, // 附带的参数,
    responseFn (response, file) {
      return file.url
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
