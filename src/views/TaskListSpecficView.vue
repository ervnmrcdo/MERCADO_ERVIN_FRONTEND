<!--
=============================================================
  DAY 3 ASSIGNMENT — HomeView.vue
  Shows the task list with router-link navigation to each task
=============================================================
-->
<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useTaskStore } from '../stores/taskStore'
import { useUserStore } from "../stores/userStore.ts";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { currentUser, usernameInput, userList, isLoggedIn } =
  storeToRefs(userStore);
const { login, logout } = userStore;

const taskStore = useTaskStore();
const {
  tasks,
  taskId,
  newTaskName,
  newTaskPriority,
  filter,
  // doneCount,
  // totalCount,
  // pendingCount,
} = storeToRefs(taskStore);
const { setFilter, addTask, removeTask, toggleTask, clearAllDone } = taskStore;


const route = useRoute();


// TODO 1: Read route.query.error — if it equals 'notfound', show a warning banner
const showErrorBanner = computed(() => {
  if (route.query.error === "notfound") return true;
});

function filteredTasks(userName) {
  if (filter.value === "all") {
    return tasks.value.filter((task) => {
      return task.by === userName;
    });
  } else if (filter.value === "done") {
    return tasks.value.filter((task) => {
      return task.done && task.by === userName;
    });
  } else {
    return tasks.value.filter((task) => {
      return !task.done && task.by === userName;
    });
  }
}
</script>

<template>
  <div class="home-view">
    <h1>📝 My Tasks</h1>

    <!-- TODO 2: Show a warning banner if showErrorBanner is true -->
    <div class="error-banner" v-if="showErrorBanner">
      ⚠️ Task not found. Redirected back to home.
    </div>

    <nav class="page-nav">
      <!-- TODO 3: Add a RouterLink to /about -->
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/stats">Stats</RouterLink>
    </nav>


    <ul class="task-list">
      <!-- <li v-for="task in taskStore.tasks" :key="task.id"> -->
      <li v-for="task in filteredTasks(currentUser.name)" :key="task.id">
        <RouterLink :to="`/task/${task.id}`">
          <span :class="{ done: task.done }">{{ task.name }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}
h1 {
  color: #1b2a4a;
  margin-bottom: 16px;
}
.error-banner {
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 16px;
  color: #92400e;
  font-size: 14px;
}
.page-nav {
  margin-bottom: 20px;
}
.page-nav a {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
}
.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.task-list li {
  padding: 12px;
  background: white;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #eee;
  cursor: pointer;
}
.task-list li:hover {
  border-color: #42b883;
}
.done {
  text-decoration: line-through;
  color: #9ca3af;
}
</style>
