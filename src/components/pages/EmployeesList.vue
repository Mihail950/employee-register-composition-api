<template>
  <the-pagination />
  <div class="page">
    <div>
      <input
        placeholder="Поиск"
        class="search"
        @keyup="searchEmployee"
        v-model="searchEmployeeValue"
      />
    </div>
    <employees-item v-for="employee in employeesVisible" :employee="employee" />
  </div>
</template>
<script lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import EmployeesItem from "../EmployeesItem.vue";
import ThePagination from "../ThePagination.vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  components: { EmployeesItem, ThePagination },
  setup() {
    const store = useStore();
    const router = useRouter();

    const searchEmployeeValue = ref("");
    const employeesVisible = ref([]);

    const employeesGetter = computed(
      () => store.getters["employeesModule/employeesVisible"]
    );
    const currentPage = computed(
      () => store.getters["paginationModule/currentPage"]
    );

    watch(employeesGetter, (arr) => {
      const start = currentPage.value * 10 - 10;
      const end = currentPage.value * 10;
      employeesVisible.value = arr.slice(start, end);
    });

    watch(
      () => router.currentRoute.value.params.pageNum,
      (pageNum) => {
        setCurrentPage({ pageNum });
        setEmployeesVisible();
      }
    );

    const searchEmployee = async () => {
      await store.dispatch("employeesModule/searchEmployee", {
        name: searchEmployeeValue.value.toLowerCase(),
      });
      await store.dispatch("paginationModule/setPagesArr");
      router.push("/page/1");
    };

    const setCurrentPage = ({ pageNum }) => {
      store.dispatch("paginationModule/setCurrentPage", { pageNum });
    };

    const setEmployeesVisible = () => {
      const start = currentPage.value * 10 - 10;
      const end = currentPage.value * 10;
      employeesVisible.value = employeesGetter.value.slice(start, end);
    };

    onMounted(() => {
      searchEmployee();
    });

    return {
      searchEmployeeValue,
      employeesVisible,
      searchEmployee,
      setCurrentPage,
      setEmployeesVisible,
      g,
    };
  },
});
</script>
<style scoped>
.page {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.search {
  border: 1px solid #e2e2e2;
  height: 40px;
  width: 500px;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  font-family: "Roboto";
  font-weight: 500;
}
</style>
