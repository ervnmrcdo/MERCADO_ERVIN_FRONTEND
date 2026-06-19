<script setup>
// import HelloWorld from "./components/HelloWorld.vue";
import NavBar from "./components/NavBar.vue";
// import TaskCounter from "./components/TaskCounter.vue";
</script>

<template>
  <main>
    <!-- <NavBar class="navbar"/> -->
    <div class="list-container">
      <TransitionGroup>
        <RouterLink class="link" to="/home">Home</RouterLink>
        <RouterLink class="link" to="/task-counter">Task Counter</RouterLink>
        <RouterLink class="link" to="/task-list">Task List</RouterLink>
        <RouterLink class="link" to="/task-list-specific-view">Specific</RouterLink>
        <RouterLink class="link" to="/todo-list-view">Todo List</RouterLink>
        <RouterLink class="link" to="/user-list-view">User List</RouterLink>
      </TransitionGroup>
    </div>
    <RouterView />
  </main>
</template>

<style>
.list-container {
  gap: 5px;
  border-style: solid;

}

.link {
  color: white;
  text-decoration: none;
}
</style>
