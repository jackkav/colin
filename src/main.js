import Vue from "vue";
import "babel-polyfill";
import App from "./App.vue";
import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);
new Vue({
  el: "#app",
  render: h => h(App)
});
