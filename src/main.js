import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TaskListView from './components/TaskListView.vue'
import  router  from '../router/router-index.js'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')