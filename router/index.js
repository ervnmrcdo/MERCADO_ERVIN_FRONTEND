import { createWebHistory, createRouter } from 'vue-router'

import TaskCounter from '../src/components/TaskCounter.vue'
import TaskListView from '../src/components/TaskListView.vue'

const routes = [
  { path: '/task-counter', component: TaskCounter  },
  { path: '/task-list', component: TaskListView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})