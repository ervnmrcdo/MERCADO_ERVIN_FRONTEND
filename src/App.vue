<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TaskCounter from "./components/TaskCounter.vue";
</script>

<template>
  <h1>Hello App!</h1>
  <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/task-counter"> Go to Task Counter</RouterLink>
    <RouterLink to="/task-list"> Go to Task List</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
  <!-- <TaskCounter /> -->
</template>
