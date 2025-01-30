import {createPinia} from 'pinia'

import router from './router'
import './assets/fonts/index.css'
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import "./main.css"
import axios from "axios";

const app = createApp(App)

axios.defaults.baseURL = '/api'
axios.defaults.headers.common['Content-Type'] = 'application/json'

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
