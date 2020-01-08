import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    selectedMonth: "Jan",
    selectedYear: "2020",
    selectedAsset: "Tripura"
  },
  mutations: {},
  actions: {},
  modules: {}
});
