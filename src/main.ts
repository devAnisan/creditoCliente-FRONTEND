import './assets/style.css'
import { createApp } from 'vue'
import "./services/firebase"
import App from './App.vue'

import router from './router'
createApp(App).use(router).mount('#app')
