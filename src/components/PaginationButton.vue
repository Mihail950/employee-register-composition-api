<template>
  <button
    :class="{ button_active: page == currentPage }"
    @click="goToPage(page)"
  >
    {{ page }}
  </button>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  props: {
    page: {
      type: Number,
      requared: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const currentPage = computed(
      () => store.getters["paginationModule/currentPage"]
    );

    const goToPage = (page) => {
      router.push("/page/" + page);
    };

    return {
      currentPage,
      goToPage,
    };
  },
};
</script>
<style scoped>
button {
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  color: #79838b;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.button_active {
  background-color: #e2e2e2;
  cursor: default;
}
</style>
