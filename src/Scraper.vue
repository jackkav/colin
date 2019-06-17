<template>
  <div>
    <div v-for="d in items.filter(x=>x.hd)" :key="d.id">
      <div
        v-on:click="d.show = !d.show"
        class="ba ph3 pv3 bg-washed-green black bg-animate hover-bg-dark-green hover-white"
      >{{d.movieTitle}} [{{d.uploadedAtFromNow}}]</div>
      <transition name="fade">
        <div
          v-if="d.show"
          class="ph3 pv3 bg-washed-green black bg-animate hover-bg-dark-green hover-white"
        >
          <div>Name: {{d.title}}</div>
          <div>Position: #{{d.index + 1}}</div>
          <div>Quality: {{d.quality}}</div>
          <div>Size: {{d.size}}</div>
          <a class="f6 link dim br2 ph3 pv2 mb2 dib white bg-black" v-bind:href="d.magnet">Download</a>
          <trailer :title="d.movieTitle" :year="d.year"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import fromNow from "moment-from-now";
import { getPBTagAndMagnetByTopic, setExpiry, isExpired } from "./scrape";
import { pbParse } from "./parsers";
import Trailer from "./Trailer.vue";
const topics = {
  movies: "aggro.pb.201",
  movieId: "201"
};
export default {
  name: "scraper",
  components: { Trailer },
  mounted() {
    isExpired(topics.movies)
      ? this.fetchItems()
      : (this.items = JSON.parse(localStorage.getItem(topics.movies)));
  },
  methods: {
    fetchItems: async function() {
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
