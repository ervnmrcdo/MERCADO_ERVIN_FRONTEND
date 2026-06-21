<template>
  <!-- <div>
    <input v-model="usernameInput" type="text" />
    <button @click="login(usernameInput)">login</button>
  </div> -->
  <div v-if="!isLoggedIn" class="login-dialog">
    <LoginDialog />
  </div>

  <div v-if="isLoggedIn" class="todo-container">
    <h1>Task Counter</h1>
    <div class="task-addition-container">
      <select v-model="newTaskPriority">
        <option :class="{ low: true }" value="low">low</option>
        <option :class="{ medium: true }" value="medium">med</option>
        <option :class="{ high: true }" value="high">high</option>
      </select>

      <input
        type="text"
        v-model="newTaskName"
        placeholder="Task Name..."
        :class="{
          'border-low': newTaskPriority === 'low',
          'border-medium': newTaskPriority === 'medium',
          'border-high': newTaskPriority === 'high',
        }"
        @keyup.enter="addTask(currentUser.name)"
      />
      <button
      type="button"
        class="add-task-button"
        @click="addTask(currentUser.name)"
      >
        Add Task
      </button>
    </div>

    <div class="filter-settings">
      <button
        type="button"
        :class="{ 'filter-button': true, selected: filter === 'all' }"
        @click="setFilter('all')"
      >
        All ({{ totalCount }})
      </button>
      <button
        type="button"
        :class="{ 'filter-button': true, selected: filter === 'done' }"
        @click="setFilter('done')"
      >
        Done ({{ doneCount }})
      </button>
      <button
        type="button"
        class="filter-button"
        :class="{ selected: filter === 'pending' }"
        @click="setFilter('pending')"
      >
        Pending ({{ pendingCount }})
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
      v-else-if="filter === 'pending' && pendingCount === 0"
      class="empty-tasks-container"
      s
    >
      <p class="empty">No pending tasks yet. Add one above!</p>
    </div>

    <!-- <div v-else class="tasks-container"> -->
    <TransitionGroup v-else class="tasks-container" name="list" tag="div">
      <div
        :class="{ 'tasks-wrapper': true, 'is-done': task.done }"
        v-for="task in filteredTasks(currentUser.name)"
        :key="task.id"
        @click="toggleTask(task.id)"
      >
        <input
          type="checkbox"
          v-model="task.done"
          :checked="task.done"
          @click="toggleTask(task.id)"
        />
        <p
          :class="{
            badge: true,
            low: task.priority === 'low',
            medium: task.priority === 'medium',
            high: task.priority === 'high',
          }"
        ></p>
        <p :class="{ striked: task.done }">{{ task.name }}</p>
        <button class="delete-button" @click="removeTask(task.id)">X</button>
      </div>
    </TransitionGroup>
    <!-- </div> -->

    <div v-if="doneCount > 0 && filter !== 'pending'" class="">
      <button type="button" class="clear-all-button" @click="clearAllDone">
        Clear All Done
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";
import { useTaskStore } from "../stores/taskStore.js";
import { useUserStore } from "../stores/userStore.ts";
import { storeToRefs } from "pinia";
import LoginDialog from "../components/LoginDialog.vue";

const userStore = useUserStore();
const { currentUser, usernameInput, userList, isLoggedIn } =
  storeToRefs(userStore);
const { login, logout } = userStore;

const taskStore = useTaskStore();
const {
  tasks,
  taskId,
  newTaskName,
  newTaskPriority,
  filter,
  // doneCount,
  // totalCount,
  // pendingCount,
} = storeToRefs(taskStore);
const { setFilter, addTask, removeTask, toggleTask, clearAllDone } = taskStore;

function filteredTasks(userName) {
  if (filter.value === "all") {
    return tasks.value.filter((task) => {
      return task.by === userName;
    });
  } else if (filter.value === "done") {
    return tasks.value.filter((task) => {
      return task.done && task.by === userName;
    });
  } else {
    return tasks.value.filter((task) => {
      return !task.done && task.by === userName;
    });
  }
}

const userTasks = computed(() => 
  tasks.value.filter(t => t.by === currentUser.value?.name)
);
const totalCount = computed(() => userTasks.value.length);
const doneCount = computed(() => userTasks.value.filter(t => t.done).length);
const pendingCount = computed(() => userTasks.value.filter(t => !t.done).length);

</script>

<style lang="scss" scoped>
.login-dialog {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.7);
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

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
  margin-left: auto;
  margin-right:auto;
  display: block;
  width: 60%;
  border-style: solid;
  padding: 40px 3px;
  border-radius: 2rem;
  margin-top: 33px;
  min-height: 600px;
  max-height: 600px;
  max-width: 75%;
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
    border-radius: 0.5rem;

    option {
      display: flex;
      top: 10px;
      border-radius: 0.5rem;
      &:hover {
        background-color: none;
      }
    }
  }
  input {
    border-radius: 0.5rem;
    border-style: solid;
    opacity: calc(75%);
    padding-left: 10px;
  }

  select {
    padding: 5px 9px;
    padding-right: 7px;
  }
}

.border-low {
  border-color: green;
}
.border-medium {
  border-color: yellow;
}
.border-high {
  border-color: red;
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
  justify-items: center;
  margin-top: 10px;
  border-style: none;
  min-width: 600px;
  min-height: 300px;
  max-height: 300px;
  overflow-y: scroll;
  scrollbar-width: none;
}

.tasks-wrapper {
  justify-items: center;
  align-items: center;
  justify-content: left;
  align-content: center;
  display: flex;
  flex-direction: row;
  border-style: solid;
  padding: 5px;
  border-width: 1px;
  border-radius: 0.5rem;
  padding: 9px 0px;
  min-width: 75%;
  max-width: 75%;
  margin-bottom: 10px;

  input {
    margin-left: 30px;
    margin-right: 30px;
    border-radius: 0%;
    align-self: center;
    border-color: transparent;
  }

  p.badge {
    border-style: solid;
    border-radius: 0.7rem;
    padding: 1px 7px;
    font-size: 5px;
    border-width: 0.5px;
    min-width: 11px;
    min-height: 10px;
    max-height: 10px;
    margin-right: 30px;
  }

  .low {
    background-color: #90ee90;
    color: lightgreen;
  }
  .medium {
    background-color: #ffc964;
    color: #ffc964;
  }

  .high {
    background-color: #f08080;
    color: lightcoral;
  }

  p {
    min-width: 55%;
    max-width: 55%;
    text-align: left;
    overflow-wrap: break-word;
  }

  .delete-button {
    display: flex;
    align-self: flex-end;
    border-radius: 4px;
    color: #08060d;
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 5px;
    color: var(--accent);
    background: var(--accent-bg);
    border: 0.5px solid transparent;
    transition: border-color 0.3s;

    &:hover {
      border-color: var(--accent-border);
    }
    &:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
  }

  p {
    margin-right: 30px;
  }
  p.striked {
    text-decoration-line: line-through;
  }
}

.is-done {
  background-color: black;
  opacity: calc(25%);
}

.clear-all-button {
  display: inline-flex;
  border-radius: 4px;
  color: #83e6ab;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  background: #0a4f2f;
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
