import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import EleForm from '@/components/EleForm'

Vue.use(ElementUI)
Vue.use(EleForm, {
  number: {
    min: 1
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
