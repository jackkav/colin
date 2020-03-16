<template lang="pug">
  div
    .ba.ph3.pv3.bg-washed-green.black.bg-animate.hover-bg-dark-green.hover-white(@click="storage = !storage") Welcome {{lock}}
    scraper(:storage="storage")
</template>

<script>
import Scraper from "./Scraper.vue";
import { computed } from "@vue/composition-api";
import { useLocalStorage } from "vue-composable";
export default {
  name: "app",
  components: { Scraper },
  setup() {
    const { storage } = useLocalStorage("unlocked", false);
    const lock = computed(() => (storage.value ? "🔓" : "🔒"));
    return { storage, lock };
  }
};
</script>

<style>
html {
  height: 100%;
  display: flex;
  flex-direction: column;
}

body,
.flex-body {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
