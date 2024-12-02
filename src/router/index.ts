import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../components/pages/EmployeesList.vue"),
      beforeEnter: async (to, from, next) => {
        next("/page/1");
      },
    },
    {
      path: "/page/:pageNum",
      component: () => import("../components/pages/EmployeesList.vue"),
      beforeEnter: (to, from) => {
        const CURRENT_PAGE = to.params.pageNum;
        store.dispatch("paginationModule/setCurrentPage", {
          pageNum: CURRENT_PAGE,
        });
      },
    },
    {
      path: "/employee/:id",
      component: () => import("../components/pages/EmployeesCard.vue"),
      beforeEnter: (to) => {
        const EMPLOYEE_ID = to.params.id;
        store.dispatch("employeesModule/setEmployeeId", {
          employeeId: EMPLOYEE_ID,
        });
      },
    },
  ],
});

export default router;
