<template lang="pug">
  scraper(source="201")
</template>

<script>
import Scraper from "./Scraper.vue";
export default {
  name: "app",
  components: { Scraper }
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
