<script setup>
import NavBar from "./components/NavBar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentRoute = computed(() => route.fullPath);
</script>

<template>
  <main>
    <!-- <NavBar class="navbar"/> -->
    <div class="list-container">
      <TransitionGroup class="links-wrapper" name="list" tag="RouterLink">
        <RouterLink
          :class="{ active: currentRoute === '/home' }"
          class="link"
          to="/home"
          >Home</RouterLink
        >
        <RouterLink
          :class="{ active: currentRoute === '/task-counter' }"
          class="link"
          to="/task-counter"
          >Task Counter</RouterLink
        >
        <RouterLink
          :class="{ active: currentRoute === '/task-list' }"
          class="link"
          to="/task-list"
          >Task List</RouterLink
        >
        <RouterLink
          :class="{ active: currentRoute === '/task-list-specific-view' }"
          class="link"
          to="/task-list-specific-view"
          >Specific</RouterLink
        >
        <RouterLink
          :class="{ active: currentRoute === '/todo-list-view' }"
          class="link"
          to="/todo-list-view"
          >Todo List</RouterLink
        >
        <RouterLink
          :class="{ active: currentRoute === '/user-list-view' }"
          class="link"
          to="/user-list-view"
          >User List</RouterLink
        >
      </TransitionGroup>
    </div>
    <RouterView />
  </main>
</template>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

.list-container {
  border-style: solid;
  padding: 10px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  width: fit-content;
  height: auto;
  justify-content: center;
  border-radius: 0.5rem;
  border-width: 2px;
  z-index: 10;
}

.links-wrapper {
  display: flex;
  justify-content: center;
  justify-items: center;
  gap: 10px;
}

.link {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  margin: auto;
}

.active {
  background-color: green;
  /* padding:10px; */
  border-style: solid;
  border-width: 1px;
  border-radius: 1rem;
}
</style>
