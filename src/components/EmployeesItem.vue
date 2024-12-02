<template>
  <div @click="openCard" class="list-item">
    <div class="item-content name border">
      <p>
        {{ this.employee.lastName }}
        {{ this.employee.firstName }}
        {{ this.employee.middleName }}
      </p>
    </div>
    <div class="item-content department border">
      <p class="box-content">{{ this.employee.department }}</p>
    </div>
    <div class="item-content jobTitle">
      <p>{{ this.employee.post }}</p>
    </div>
  </div>
</template>
<script>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const length = ref(100);

    const searchName = computed(
      () => store.getters["employeesModule/searchName"]
    );

    watch(searchName, (name) => {
      length.value = name.length;
    });

    const setCurrentUser = () => {
      store.dispatch("employeesModule/setCurrentUser", {
        user: props.employee,
      });
    };

    const openCard = () => {
      router.push("/employee/" + props.employee.id);
      setCurrentUser();
    };

    return {
      length,
      searchName,
      openCard,
    };
  },
};
</script>
<style scoped>
.list-item {
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  width: 800px;
  height: 60px;
  transition: transform 0.2s;
  display: flex;
}
.list-item:hover {
  transform: translateY(-4px);
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);
  cursor: default;
}
.border {
  border-right: 1px solid #e2e2e2;
}
.item-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.name {
  width: 400px;
}
.department {
  width: 100px;
  padding: 0 50px 0 50px;
  text-align: center;
}
.jobTitle {
  width: 120px;
  padding: 0 40px 0 40px;
  text-align: center;
}
</style>
