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
      <li v-if="!isLoggedIn" :class="{ 'navbar-items': true  }" @click="goToLogin">
        Login
      </li>
      <li v-if="isLoggedIn" :class="{ 'navbar-items': true  }" @click="logout">
        Logout
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore.ts";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { logout } = userStore;


const router = useRouter();

function goToTaskCounter() {
  router.push("/task-counter");
}


function goToLogin() {
  router.push("/login");
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
