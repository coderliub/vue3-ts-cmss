import { createApp } from 'vue'
// import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './service/axios_demo'
import lbRequest from './service'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// app.use(globalRegister)
app.use(router)
app.use(store)
// app.use(lbRequest)

app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)

lbRequest.request({
  url: '/home/multidata',
  method: 'GET'
})
