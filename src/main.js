import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TaskListView from './components/TaskListView.vue'
import { router } from '../router/index.js'

createApp(App).use(router).mount('#app')
