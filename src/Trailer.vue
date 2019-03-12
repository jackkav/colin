<template>
  <div>
    <div v-if="loading">Loading...</div>
    <a v-else target="blank" v-bind:href="video.watch">
      <img v-bind:src="video.icon" v-bind:title="video.title" alt="yt" width="240" height="180">
    </a>
  </div>
</template>

<script>
import { getTrailer } from "./scrape";

export default {
  props: ["title", "year"],
  mounted() {
    this.fetchItems();
  },
  methods: {
    fetchItems: async function() {
      this.loading = true;
      this.video = await getTrailer(this.title, this.year);
      this.loading = false;
    }
  },
  data() {
    return {
      loading: false,
      video: { icon: "", watch: "", title: "" }
    };
  }
};
</script>
