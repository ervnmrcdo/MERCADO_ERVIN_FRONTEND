<template>
  <div class="login-dialog-container">
    <div v-if="!isLoggedIn" class="login-dialog-wrapper">
      <input v-model="usernameInput" type="text" />
      <button @click="login(usernameInput)">login</button>
    </div>

    <div v-else class="login-dialog-wrapper">
      <span>{{ currentUser.name }}</span>
      <button @click="logout()">logout</button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/userStore.ts";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { currentUser, usernameInput, userList, isLoggedIn } = storeToRefs(userStore);
const { login, logout} = userStore;

console.log(currentUser.value);
</script>

<style lang="scss" scoped>
.login-dialog-container {
  border-style: solid;
  width: 50%;
  min-height: 80%;
  justify-self: center;
  padding: 20px 10px;
  margin: 10px;
  border-radius: 2rem;
  
}
</style>
