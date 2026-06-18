import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore("main", {
  state: () => ({
    taskList: [
      { id: 1, name: "Get grocery", done: true, dueDate: "June 6, 2026" },
      { id: 2, name: "Take a bathe", done: false, dueDate: "June 6, 2026" },
      { id: 3, name: "Eat breakfast", done: true, dueDate: "June 6, 2026" },
    ],
  }),

  getters: {
    tasks(state) {
      return state.taskList;
    },
  },

  actions: {
    addTask(newTask) {
      this.taskList.push(newTask);
    },
  },

  
});


