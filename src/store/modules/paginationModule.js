import store from "..";

const paginationModule = {
  namespaced: true,
  state: {
    currentPage: "",
    pageQuantity: "",
    pagesArr: [],
  },
  getters: {
    currentPage: (state) => state.currentPage,
    pageQuantity: (state) => state.pageQuantity,
    pagesArr: (state) => state.pagesArr,
  },
  mutations: {
    SET_CURRENTPAGE(state, message) {
      state.currentPage = message;
    },
    SET_PAGEQUANTITY(state, message) {
      state.pageQuantity = message;
    },
    SET_PAGEPAGESARR(state, message) {
      state.pagesArr = message;
    },
  },
  actions: {
    setCurrentPage({ commit }, { pageNum }) {
      commit("SET_CURRENTPAGE", pageNum);
    },
    setPageQuantity({ commit }) {
      const pageQuantity = Math.ceil(
        store.state.employeesModule.employeesVisible.length / 10
      );
      commit("SET_PAGEQUANTITY", pageQuantity);
    },
    setPagesArr({ state, commit }) {
      const allNumbers = [];
      for (let i = 1; i <= state.pageQuantity; i++) {
        allNumbers.push(i);
      }
      commit("SET_PAGEPAGESARR", allNumbers);
    },
  },
};

export default paginationModule;
