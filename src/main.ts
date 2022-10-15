import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './service/axios_demo'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(globalRegister)
app.use(store)
setupStore()

// path: /user => user
app.use(router)

app.mount('#app')

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}
