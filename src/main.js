import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/style.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.component('vue-draggable-resizable', VueDraggableResizable)

app.mount('#app')
