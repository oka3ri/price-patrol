import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  modules: {},
  plugins: [
    createPersistedState({
      key: "vuex",
      storage: {
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) => localStorage.setItem(key, value),
        removeItem: (key) => localStorage.removeItem(key),
      },
    }),
  ],
});
