<template>
  <v-data-table
    :headers="headers"
    :items="params"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  props: ["kpi"],
  data: () => ({
    headers: [],
    params: []
  }),
  computed: mapState(["selectedMonth", "selectedYear", "selectedAsset"]),
  mounted() {
    axios
      .get(
        `/data/${this.selectedAsset}/${this.selectedYear}/${this.selectedMonth}/activities/${this.kpi}.json`
      )
      .then(res => {
        this.headers = res.data.headers;
        this.params = res.data.params;
      });
  }
};
</script>

<style></style>
