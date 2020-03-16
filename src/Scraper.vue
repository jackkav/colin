<template lang="pug">
div
  div(v-for="d in items.filter(x=>x.hd)" :key="d.id")
    .ba.ph3.pv3.bg-washed-green.black.bg-animate.hover-bg-dark-green.hover-white(@click="d.show = !d.show") {{d.movieTitle}} [{{d.uploadedAtFromNow}}]
    transition(name="fade")
      .ph3.pv3.bg-washed-green.black.bg-animate.hover-bg-dark-green.hover-white(v-if="d.show")
        div(v-if="storage") Name: {{d.title}}
        div(v-if="storage") Position: # {{d.index + 1}}
        div(v-if="storage") Quality: {{d.quality}}
        div(v-if="storage") Size: {{d.size}}
        .f6.link.dim.br2.ph3.pv2.mb2.dib.white.bg-black(v-if="storage" :href="d.magnet") Download
        trailer(:title="d.movieTitle" :year="d.year")
</template>

<script>
import fromNow from "moment-from-now";
import { getPBTagAndMagnetByTopic, setExpiry, isExpired } from "./scrape";
import { pbParse } from "./parsers";
import Trailer from "./Trailer.vue";
import { reactive, onMounted, toRefs } from "@vue/composition-api";

const topics = {
  movies: "aggro.pb.201",
  movieId: "201"
};
export default {
  name: "scraper",
  components: { Trailer },
  props: ["storage"],
  setup(props) {
    const state = reactive({
      items: []
    });
    onMounted(async () => {
      console.log(props.storage);
      isExpired(topics.movies)
        ? fetchItems()
        : (state.items = JSON.parse(localStorage.getItem(topics.movies)));
    });
    let fetchItems = async function() {
      let t = await getPBTagAndMagnetByTopic(topics.movieId);
      let movies = t
        .map(x => ({
          ...x,
          ...pbParse(x.fullTag, topics.movies),
          show: false
        }))
        .map(x => ({ ...x, uploadedAtFromNow: fromNow(x.uploadedAt) }));
      movies = movies.sort(
        (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
      );
      setExpiry(topics.movies, movies, 2);
      state.items = movies;
    };
    return {
      ...toRefs(state),
      storage: props.storage
    };
  }
};
</script>
