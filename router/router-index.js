import { createWebHistory, createRouter } from "vue-router";
import { useTaskStore } from "../src/stores/taskStore.js";
import { useUserStore } from "../src/stores/userStore.ts";
import { storeToRefs } from "pinia";
import TaskCounter from "../src/views/TaskCounter.vue";
import TaskDetailView from "../src/views/TaskDetailView.vue";
import AboutView from "../src/views/AboutView.vue";
import TaskListView from "../src/views/TaskListView.vue";
import TaskListSpecficView from "../src/views/TaskListSpecficView.vue";
import HomeView from "../src/views/HomeView.vue";
import LoginDialog from "../src/components/LoginDialog.vue";
import TodoListView from "../src/views/TodoListView.vue"
import UserListView from "../src/views/UserListView.vue"
import Stats from "../src/components/Stats.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginDialog },
  { path: "/home", component: HomeView },
  {
    path: "/task-counter",
    component: TaskCounter,
    meta: { requiresLogin: true },
  },
  {
    path: "/task-list",
    component: TaskListView,
  },
  {
    path: "/task-list-specific-view",
    component: TaskListSpecficView,
  },
  {
    path: "/task/:id",
    component: TaskDetailView,
    meta: { requiresTask: true, },
  },
  { path: "/stats", component: Stats, },
  { path: "/about", component: AboutView, },
  { path: "/todo-list-view", component: TodoListView, },
  { path: "/user-list-view", component: UserListView, },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const taskStore = useTaskStore();
  const userStore = useUserStore();
  const { isLoggedIn } = storeToRefs(userStore);

  // if ((to.meta.requiresLogin || from.path === '/login') && !isLoggedIn.value) {
  //   next({ path: "/login" })
  //   return;
  // }

  // if (to.path === '/login' && isLoggedIn.value) {
  //   next({ path: "/home" })
  //   return;
  // }
  if (to.meta.requiresTask) {
    if (taskStore.tasks.find((t) => t.id === Number(to.params.id))) {
      next();
    } else {
      next({ path: "/home", query: { error: "notfound" } });
    }
  } else {
    next();
  }
});
export default router;
// =============================================================
//  DAY 3 ASSIGNMENT — Vue Router: router/index.js
//  Topic: Dynamic Routes, Navigation Guards, Programmatic Navigation
//  Files: router/index.js  |  HomeView.vue  |  TaskDetailView.vue
//  Time: 60 minutes
// =============================================================
//
// OBJECTIVE
// ---------
// Add client-side routing to your task app. Students will create a
// multi-page SPA with dynamic routes, query params, and a guard that
// protects the detail page from invalid task IDs.
//
// WHAT TO BUILD
// -------------
//  1. /home         → HomeView.vue  (task list with router-link to each task)
//  2. /task/:id     → TaskDetailView.vue  (detail page for one task)
//  3. /about        → AboutView.vue  (static info page)
//  4. /             → redirects to /home
//
// NAVIGATION GUARD
// ----------------
//  If the user navigates to /task/:id with a non-existent ID:
//  → redirect to /home?error=notfound
//  HomeView should display a warning banner when it sees ?error=notfound
//
// REQUIREMENTS (Acceptance Criteria)
// ------------------------------------
//  [x] Install vue-router@4: npm install vue-router@4
//  [x] createRouter with createWebHistory
//  [x] Dynamic route: /task/:id (params.id is a string — cast to Number)
//  [x] router.beforeEach checks if the task exists
//  [x] router-link used on HomeView for navigation (not <a> tags)
//  [x] useRoute() used in TaskDetailView to read params.id
//  [x] useRouter() used for the "Back" button (programmatic navigation)
//  [x] App.vue contains <RouterView />
//
// EXTENSION
// ---------
//  - Add a /stats route that shows total/done/pending counts
//  - Add router-link-active styling to the nav links
//  - Add a page transition animation using Vue's <Transition> component
//
// HINTS (read only if stuck)
// ---------------------------
//  Hint 1: import { createRouter, createWebHistory } from 'vue-router'
//  Hint 2: { path: '/task/:id', component: TaskDetailView, meta: { requiresTask: true } }
//  Hint 3: router.beforeEach((to, from, next) => { ... next() ... })
//  Hint 4: In TaskDetailView — const route = useRoute(); route.params.id
//  Hint 5: Cast param to number — Number(route.params.id) or parseInt(route.params.id)
//  Hint 6: For the error banner — useRoute().query.error === 'notfound'
//  Hint 7: Always call next() at the end of beforeEach or navigation hangs!
// =============================================================

// import { createRouter, createWebHistory } from 'vue-router'

// TODO 1: Import your view components
// import HomeView       from '@/views/HomeView.vue'
// import TaskDetailView from '@/views/TaskDetailView.vue'
// import AboutView      from '@/views/AboutView.vue'

// TODO 2: Import your Pinia task store so the guard can check if a task exists
// import { useTaskStore } from '@/stores/taskStore'

// const router = createRouter({
// TODO 7: Use createWebHistory() for clean URLs
//   history: createWebHistory(),
//   routes,
// })
