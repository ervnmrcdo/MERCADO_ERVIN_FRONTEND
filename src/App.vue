<script setup>
import NavBar from "./components/NavBar.vue";
import { computed, ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentRoute = computed(() => route.fullPath);

const containerRef = ref(null);
const sliderRef = ref(null);

function updateSlider() {
  const container = containerRef.value;
  const slider = sliderRef.value;
  if (!container || !slider) return;

  const activeLink = container.querySelector(".link.active");
  if (!activeLink) {
    slider.style.opacity = "0";
    return;
  }

  slider.style.opacity = "1";
  slider.style.transform = `translateX(${activeLink.offsetLeft}px)`;
  slider.style.width = `${activeLink.offsetWidth}px`;
}

onMounted(() => nextTick(updateSlider));
watch(currentRoute, () => nextTick(updateSlider));
</script>

<template>
  <main>
    <!-- <NavBar class="navbar"/> -->
    <div class="list-container" ref="containerRef">
      <TransitionGroup class="links-wrapper" name="list" tag="div">
        <div class="slider" ref="sliderRef" />
        <RouterLink
          :class="{ active: currentRoute === '/home' }"
          class="link"
          to="/home"
          key="home"
          >Home</RouterLink
        >
        <RouterLink
          :class="{ active: currentRoute === '/task-counter' }"
          class="link"
          to="/task-counter"
          key="task-counter"
          >Task Counter</RouterLink
        >
        <RouterLink
          :class="{ active: currentRoute === '/task-list' }"
          class="link"
          to="/task-list"
          key="task-list"
          >Task List</RouterLink
        >
        <RouterLink
          :class="{ active: currentRoute === '/task-list-specific-view' }"
          class="link"
          to="/task-list-specific-view"
          key="task-list-specific"
          >Specific</RouterLink
        >
        <RouterLink
          :class="{ active: currentRoute === '/todo-list-view' }"
          class="link"
          to="/todo-list-view"
          key="todo-list"
          >Todo List</RouterLink
        >
        <RouterLink
          :class="{ active: currentRoute === '/user-list-view' }"
          class="link"
          to="/user-list-view"
          key="user-list"
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
  position: relative;
  z-index: 10;
}

.links-wrapper {
  display: flex;
  justify-content: center;
  justify-items: center;
  gap: 10px;
  position: relative;
}

.link {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  margin: auto;
  position: relative;
  z-index: 1;
}

.active {
  color: #f0f1ee;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: green;
  border-radius: 1rem;
  transition: transform 0.3s ease, width 0.3s ease, opacity 0.3s ease;
  z-index: 0;
}
</style>
