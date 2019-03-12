<template>
  <div>
    <div v-for="d in items" :key="d.id">
      <div
        v-on:click="d.show = !d.show"
        class="ph3 pv3 bg-washed-green black bg-animate hover-bg-dark-green hover-white"
      >{{d.movieTitle}}</div>
      <transition name="fade">
        <div
          v-if="d.show"
          class="ph3 pv3 bg-washed-green black bg-animate hover-bg-dark-green hover-white"
        >
        <trailer :title="d.movieTitle" :year="d.year" />
          <a class="f6 link dim br2 ph3 pv2 mb2 dib white bg-black" v-bind:href="d.magnet">Download</a>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { getPBTagAndMagnetByTopic, setExpiry, isExpired } from "./scrape";
import { pbParse } from "./parsers";
import Trailer from './Trailer.vue'
const topics = {
  movies: "aggro.pb.201",
  movieId: "201"
};
export default {
  name:'scraper',
  components: { Trailer },
  mounted() {
    isExpired(topics.movies)
      ? this.fetchItems()
      : (this.items = JSON.parse(localStorage.getItem(topics.movies)));
  },
  methods: {
    fetchItems: async function() {
      let t = await getPBTagAndMagnetByTopic(topics.movieId);
      const movies = t.map(x => ({
        ...x,
        ...pbParse(x.fullTag, topics.movies),
        show: false
      }));
      setExpiry(topics.movies, movies, 2);
      this.items = movies;
    }
  },
  data() {
    return {
      items: []
    };
  }
};
</script>
