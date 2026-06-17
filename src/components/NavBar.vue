<template>
  <div :class="{ 'navbar-container': true }">
    <ul :class="{ 'navbar-list': true }">
      <li :class="{ 'navbar-items': true }" @click="goToTaskCounter">Task Counter</li>
      <li :class="{ 'navbar-items': true }">Task List</li>
    </ul>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

// const router = useRouter()

function goToTaskCounter() {
    console.log('redirecting')
    router.push('/task-counter')
}
</script>

<style scoped>
.navbar-container {
  width: 100%;
  height: 70%;
  background-color: blueviolet;
}

.navbar-list {
  list-style-type: none;
  display: flex;
  margin: none;
}

.navbar-items {
  margin-right: 10px;
}
</style>
