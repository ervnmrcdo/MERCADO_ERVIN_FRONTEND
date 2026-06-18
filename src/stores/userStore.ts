import { defineStore } from "pinia";

export const useUserStore = defineStore("login-store", {
  state: () => ({
    usernameInput: "",
    currentUser: null ,
    userList: [] ,
  }),

  getters: {
    isLoggedIn(state: any) {
      return state.currentUser ? true : false;
    },
  },

  actions: {
    login(name:String) {
      const user = this.userList.find((user) => user.name === name);
      if (user) {
        this.currentUser = user;
      } else {
        const newUser = new Object({name: name})
        this.userList.push(newUser)
        this.currentUser = newUser;
        }
    },

    logout() {
      this.currentUser = null;
    },
  },

  persist: true,
});
