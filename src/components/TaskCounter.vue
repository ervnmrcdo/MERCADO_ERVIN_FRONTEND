<template>
  <div class="todo-container">
    <h1>Task Counter</h1>
    <div class="task-addition-container">
      <input type="text" v-model="newTaskName" placeholder="Task Name..." />
      <button
        type="button"
        class="add-task-button"
        @click="addTask"
        @keyup.enter="addTask"
      >
        Add Task
      </button>
    </div>
    <div class="stats-container">
      <span class="stats"
        >Total Tasks: {{ totalCount }} | Done: {{ doneCount }} | Ongoing:
        {{ pendingCount }}
      </span>
    </div>

    <div class="filter-settings">
      <button
        type="button"
        :class="{ 'filter-button': true, selected: filter === 'all' }"
        @click="setFilter('all')"
      >
        All
      </button>
      <button
        type="button"
        :class="{ 'filter-button': true, selected: filter === 'done' }"
        @click="setFilter('done')"
      >
        Done
      </button>
      <button
        type="button"
        class="filter-button"
        :class="{ selected: filter === 'pending' }"
        @click="setFilter('pending')"
      >
        Pending
      </button>
    </div>

    <div
      v-if="filter === 'all' && totalCount === 0"
      class="empty-tasks-container"
    >
      <p class="empty">No tasks yet. Add one above!</p>
    </div>
    <div
      v-else-if="filter === 'done' && doneCount === 0"
      class="empty-tasks-container"
    >
      <p class="empty">No finished tasks yet. Complete one!</p>
    </div>
    <div
      v-else-if="filter === 'pending' && doneCount === 0"
      class="empty-tasks-container"
      s
    >
      <p class="empty">No pending tasks yet. Add one above!</p>
    </div>

    <div v-else class="tasks-container">
      <div class="tasks-wrapper" v-for="task in filteredTasks" :key="task.id">
        <input
          type="checkbox"
          v-model="task.isDone"
          :checked="task.isDone"
          @click="toggleTask(task)"
        />
        <select type="dropdown">
          <option value="low">low</option>
          <option value="medium">med</option>
          <option value="high">high</option>
        </select>
        <p :class="{ striked: task.isDone }">{{ task.name }}</p>
        <button class="delete-button" @click="removeTask(task.id)">X</button>
      </div>
    </div>

    <div v-if="doneCount > 0" class="">
      <button type="button" class="clear-all-button" @click="clearAllDone">
        Clear All Done
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";

const newTaskName = ref("");
const newTaskPriority = ref("low");
const tasks = ref([]);
const filter = ref("all"); // all | done | pending
const taskId = ref(1);

const filteredTasks = computed(() => {
  if (filter.value === "all") {
    return tasks.value;
  } else if (filter.value === "done") {
    return tasks.value.filter((task) => {
      return task.isDone;
    });
  } else {
    return tasks.value.filter((task) => {
      return !task.isDone;
    });
  }
});

const totalCount = computed(() => {
  return tasks.value.length;
});
const doneCount = computed(() => {
  return tasks.value.filter((task) => task.isDone).length;
});
const pendingCount = computed(() => {
  return tasks.value.filter((task) => !task.isDone).length;
});

function addTask() {
  if (newTaskName === "") return;

  tasks.value.push({
    id: taskId.value,
    name: newTaskName.value,
    isDone: false,
    priority: newTaskPriority.value,
  });
  taskId.value = taskId.value + 1;
  newTaskName.value = "";
  console.log(tasks.value);
}

function removeTask(id) {
  tasks.value = tasks.value.filter((task) => {
    return task.id !== id;
  });
}

function toggleTask(task) {
  task.isDone = !task.isDone;
}

function setFilter(newFilterValue) {
  filter.value = newFilterValue;
}

function clearAllDone() {
  tasks.value = tasks.value.filter((task) => !task.isDone);
}
</script>

<style lang="scss" scoped>
.add-task-button {
  display: inline-flex;
  border-radius: 4px;
  color: #08060d;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.todo-container {
  align-self: center;
  display: block;
  min-width: 70%;
  border-style: solid;
  padding: 40px 3px;
  border-radius: 2rem;
  margin-top: 45px;
  min-height: 500px;
  background: #0d0b17;
  background: linear-gradient(
    30deg,
    rgba(13, 11, 23, 1) 0%,
    rgba(72, 51, 82, 0.55) 49%,
    rgba(13, 11, 23, 1) 100%
  );
}

.task-addition-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 7px 0px;

  input,
  select,
  button {
    min-height: 30px;
  }
  select {
    border-style: none;
  }
  input {
    border-radius: 0.5rem;
    border-style: solid;
    opacity: calc(75%);
    min-width: 250px;
  }
}

.stats-container {
  border-style: solid;
  display: flex;
  justify-self: center;
  padding: 7px 9px;
  border-radius: 0.5rem;
  margin: 8px 0px;
  width: fit-content;
  background-color: #2e303a;
}

.filter-settings {
  display: flex;
  justify-content: center;
  gap: 5px;
  padding: 10px 0px;
}

.filter-button {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.filter-settings {
  .selected {
    background: #030308;
  }
}

.empty-tasks-container {
  justify-items: center;
  margin-top: 10px;
}

.tasks-container {
  justify-self: center;
  align-self: center;
  margin-top: 10px;
  border-style: none;
  min-width: 600px;
  min-height: 300px;
  max-height: 300px;
  overflow-y: scroll;
}

.tasks-wrapper {
  justify-items: center;
  align-items: center;
  justify-content: left;
  display: flex;
  flex-direction: row;
  border-style: solid;
  padding: 5px;
  border-width: 1px;
  border-radius: 0.5rem;
  padding: 20px 0px;
  min-width: 75%;
  margin-bottom: 10px;

  input {
    margin-left: 30px;
    margin-right: 30px;
    border-radius: 0%;
    border-color: transparent;
  }

  p.badge {
    border-style: solid;
    border-radius: 0.7rem;
    padding: 3px 7px;
    font-size: 10px;
    border-width: 0.5px;
    min-width: 10px;
    margin-right: 30px;
  }

  select {
    margin-right: 30px;
  }

  .delete-button {
  }

  p {
    margin-right: 30px;
  }
  p.striked {
    text-decoration-line: line-through;
  }
}

.clear-all-button {
  display: inline-flex;
  border-radius: 4px;
  color: #08060d;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-top: 10px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}
</style>
