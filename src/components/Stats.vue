<script setup>

import { useUserStore } from "../stores/userStore.ts"
import { useTaskStore } from "../stores/taskStore.js"
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();
const { doneCount, pendingCount, totalCount } = storeToRefs(taskStore)


</script>

<template>
  <RouterLink to="task-list-specific-view">Back</RouterLink>
  <div class="stats-container">
    Task Statistics
    <ul>
      <li>Total: {{ totalCount }}</li>
      <li>Pending: {{pendingCount }}</li>
      <li>Done: {{ doneCount }}</li>
    </ul>

  </div>
</template>



<style>


.stats-container{
  border-style: solid;
  width:fit-content;
  height:auto;
  margin:auto;
  margin-top: 10px;
  padding: 40px;

}
</style>
