<script lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const searchEmployee = (x: string) => {
      store.dispatch("employeesModule/searchEmployee", x);
    };

    const setPageQuantity = () => {
      store.dispatch("paginationModule/setPageQuantity");
    };

    const setPagesArr = () => {
      store.dispatch("paginationModule/setPagesArr");
    };

    onMounted(() => {
      searchEmployee({ name: "" });
      setPageQuantity();
      setPagesArr();
    });

    return {
      searchEmployee,
      setPageQuantity,
      setPagesArr,
    };
  },
};
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
