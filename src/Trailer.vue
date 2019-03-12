<template>
  <div class="bg-black">
    <a target="blank" v-bind:href="video.watch">
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
      this.video = await getTrailer(this.title, this.year);
    }
  },
  data() {
    return {
      video: { icon: "", watch: "", title: "" }
    };
  }
};
</script>
