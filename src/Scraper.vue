<template>
  <article>
    <ul class="list pl0 ml0 center ba b--light-silver br2">
      <li v-for="d in items" :key="d.id" class="ph3 pv3 bb b--light-silver">{{d.title}}</li>
    </ul>
  </article>
</template>

<script>
import { getPBTagAndMagnetByTopic, setExpiry, isExpired } from "./scrape";
import { pbParse } from "./parsers";
const topics = {
  movies: "aggro.pb.201",
  movieId: "201",
  music: "aggro.pb.101",
  musicId: "101",
  tv: "aggro.pb.205",
  tvId: "205"
};
export default {
  mounted() {
    if (isExpired(topics.movies)) this.fetchItems();
    else {
      console.log("loading cached pb scrape");
      this.items = JSON.parse(localStorage.getItem(topics.movies));
    }
  },
  methods: {
    fetchItems: async function() {
      let t = await getPBTagAndMagnetByTopic(topics.movieId);
      console.log("fetching");
      const movies = t.map(x => ({
        ...x,
        ...pbParse(x.fullTag, topics.movies)
      }));
      setExpiry(topics.movies, movies, 2);
      console.log(movies);
      this.items = movies;
    }
  },
  data() {
    return {
      msg: "Hello World",
      items: [1, 2, 3, 4, 5]
    };
  }
};
</script>
