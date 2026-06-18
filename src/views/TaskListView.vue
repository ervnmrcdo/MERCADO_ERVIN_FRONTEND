<!--
=============================================================
  DAY 2 ASSIGNMENT — TaskListView.vue (Parent Component)
  This file renders a list of TaskCard components.
=============================================================
-->
<script setup>
import { ref } from "vue";
import TaskCard from "../components/TaskCard.vue";
import NavBar from "../components/NavBar.vue";

// TODO 1: Create a ref() tasks array with at least 3 sample tasks
// Each task: { id, name, done, dueDate }
const tasks = ref([
  { id: 1, name: "Get grocery", done: true, dueDate: "June 6, 2026" },
  { id: 2, name: "Take a bathe", done: false, dueDate: "June 6, 2026" },
  { id: 3, name: "Eat breakfast", done: true, dueDate: "June 6, 2026" },
]);

// TODO 2: Write handleComplete(id) — toggle the done state of the task with this id
function handleComplete(id) {
  const task = tasks.value.find((t) => t.id === id);
  if (task) {
    task.done = !task.done;
  }
}

function handleDelete(id) {
  // your code here
  tasks.value = tasks.value.filter((t) => {
    return t.id !== id;
  });
}
</script>

<template>
  <div class="task-list-view">
    <h1>My Tasks</h1>
  <div v-if="tasks.length === 0">
    <span>There are no tasks available.</span>
  </div>

    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @complete="handleComplete"
      @delete="handleDelete"
    >
      <template #meta> 🗓️Due: {{ task.dueDate }} </template>
    </TaskCard>

  </div>
</template>

<style scoped>
.task-list-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}
h1 {
  color: #cacdd4;
  margin-bottom: 24px;
}
</style>
