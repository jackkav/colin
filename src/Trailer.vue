<template lang="pug">
  div
    div(v-if="loading") Loading...
    a(v-else target="blank" :href="video.watch")
      img(
        :src="video.icon"
        :title="video.title"
        alt=""
        width="240"
        height="180"
      )
</template>

<script>
import { getTrailer } from "./scrape";
import { reactive, onMounted, toRefs } from "@vue/composition-api";
export default {
  name: "Trailer",
  props: ["title", "year"],
  setup(props) {
    const state = reactive({
      loading: false,
      video: { icon: "", watch: "", title: "" }
    });

    onMounted(async () => {
      state.loading = true;
      state.video = await getTrailer(props.title, props.year);
      state.loading = false;
    });

    return {
      ...toRefs(state)
    };
  }
};
</script>
