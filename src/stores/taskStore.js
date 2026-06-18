import { defineStore } from "pinia";

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

  },

  actions: {
    addTask(userName) {
      console.log(userName);
      if (!this.newTaskName.trim() && !userName) return;
      this.tasks.push({
        id: this.taskId,
        name: this.newTaskName,
        done: false,
        priority: this.newTaskPriority,
        by: userName,
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
  persist: true,
});
