<script setup>

import { useUserStore } from "../stores/userStore.ts"
import { useTaskStore } from "../stores/taskStore.js"
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();
const { doneCount, pendingCounts, totalCount } = storeToRefs(taskStore)


</script>

<template>
  <div class="stats-container">
    stats page
  </div>
</template>



<style></style>
