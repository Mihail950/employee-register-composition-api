<template>
  <div class="box">
    <pagination-button v-for="page in pagesArr" :page="page" />
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PaginationButton from "./PaginationButton.vue";
export default {
  name: "the-pagination",
  components: { PaginationButton },
  setup() {
    const store = useStore();
    const pagesArr = computed(() => store.getters["paginationModule/pagesArr"]);

    return {
      pagesArr,
    };
  },
};
</script>
<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: 740px;
  width: 100%;
  gap: 5px;
  padding-bottom: 20px;
}
</style>
