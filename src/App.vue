<template>
  <scraper source="201"/>
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
  flex: 1; /* no need anymore to deal with height/width */
  flex-direction: column;
}

.main {
  background: rgb(88, 124, 88);
  display: flex;
  flex: 1;
  /* mind this */
  /*overflow:auto; */ /* can come handy here if you want to keep footer in view */
}

.nav {
  background: rgb(145, 101, 101);
  flex: 0 0 12em;
}

.content {
  background: gray;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
}

.col {
  flex: 1 0 auto;
}

* {
  box-shadow: inset 0px 0px 0px 1px #f00;
}

</style>