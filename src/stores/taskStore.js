import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore("main", {
  state: () => ({
    taskId: 1,
    newTaskName: "",
    newTaskPriority: "low",
    filter: "all",
    tasks: [],
  }),

  getters: {
    totalCount(state) {
      return state.tasks.length;
    },
    doneCount(state) {
      return state.tasks.filter((task) => task.done).length;
    },
    pendingCount(state) {
      return state.tasks.filter((task) => !task.done).length;
    },
    filteredTasks(state) {
      console.log(state.filter);
      if (state.filter === "all") {
        return state.tasks;
      } else if (state.filter === "done") {
        return state.tasks.filter((task) => {
          return task.done;
        });
      } else {
        return state.tasks.filter((task) => {
          return !task.done;
        });
      }
    },
  },

  actions: {
    addTask(state, newTask) {
      if (!this.newTaskName.trim()) return;
      this.tasks.push({
        id: this.taskId,
        name: this.newTaskName,
        isDone: false,
        priority: this.newTaskPriority,
      });
      this.taskId += 1;
      this.newTaskName = "";
    },

    removeTask(id) {
      this.tasks = this.tasks.filter((task) => {
        return task.id !== id;
      });
    },

    setFilter(newFilterValue) {
      this.filter.value = newFilterValue;
    },

    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id);
      console.log(task);
      if (task) {
        task.done = !task.done;
      }
    },

    clearAllDone() {
      // console.log(this.tasks.filter((task) => !task.done))
      this.tasks = this.tasks.filter((task) => !task.done);
    },

    setFilter(newFilterValue) {
      this.filter = newFilterValue;
    },
  },
});
