import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import './style/base.scss'
// element-plus
import ElementPlus from 'element-plus'
// 样式
import "element-plus/dist/index.css"
import router from './router/index'
import {createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import "virtual:svg-icons-register"
import 'element-plus/theme-chalk/dark/css-vars.css'


const app = createApp(App)
app.use(createPinia().use(piniaPluginPersist))
app.use(router)
app.mount('#app')
