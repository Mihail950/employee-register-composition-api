import { createStore } from "vuex";
import employeesModule from "./modules/employeesModule.js";
import paginationModule from "./modules/paginationModule.js";

const store = createStore({
  modules: {
    employeesModule,
    paginationModule,
  },
});

export default store;
