<template>
  <div :class="{ 'navbar-container': true }">
    <ul :class="{ 'navbar-list': true }">
      <li :class="{ 'navbar-items': true }" @click="goToTaskCounter">
        Task Counter
      </li>
      <li :class="{ 'navbar-items': true }" @click="goToTaskList">Task List</li>
      <li :class="{ 'navbar-items': true }" @click="goToTaskListSpecificView">
        Task List Specific View
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goToTaskCounter() {
  router.push("/task-counter");
}
function goToTaskList() {
  router.push("/task-list");
}

function goToTaskListSpecificView() {
  router.push("/task-list-specific-view");
}
</script>

<style scoped>
.navbar-container {
  width: 100%;
  height: 80%;
  background-color: blueviolet;
}

.navbar-list {
  list-style-type: none;
  display: flex;
  margin: 0px;
}

.navbar-items {
  margin-right: 10px;
  /* cursor:pointer; */
}
</style>
