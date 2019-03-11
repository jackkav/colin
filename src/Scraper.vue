<template>
  <article>
    <ul class="list pl0 ml0 mt0 center ba b--light-silver br2">
      <li v-for="d in items" :key="d.id" class="ph3 pv3 bg-washed-green black bg-animate hover-bg-dark-green hover-white">{{d.title}}</li>
    </ul>
  </article>
</template>

<script>
import { getPBTagAndMagnetByTopic, setExpiry, isExpired } from "./scrape";
import { pbParse } from "./parsers";
const topics = {
  movies: "aggro.pb.201",
  movieId: "201"
};
export default {
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
        ...pbParse(x.fullTag, topics.movies)
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
