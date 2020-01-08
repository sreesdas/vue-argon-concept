<template>
  <div class="home">
    <div class="gradient-background">
      <v-toolbar class="pt-2" color="rgba(0,0,0,0)" elevation="0" dark>
        <!-- <v-toolbar-title class="ml-4">{{ month }}</v-toolbar-title> -->
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-select
            :items="assets"
            label="Asset"
            v-model="$store.state.selectedAsset"
            outlined
            dense
            class="px-2"
          ></v-select>
          <v-select
            :items="months"
            label="Month"
            v-model="$store.state.selectedMonth"
            outlined
            dense
            class="px-2"
          ></v-select>
          <v-select
            :items="years"
            label="Year"
            v-model="$store.state.selectedYear"
            outlined
            dense
            class="px-2"
          ></v-select>
        </v-toolbar-items>
        <!-- <v-btn icon @click="$store.state.drawer = !$store.state.drawer">
          <v-icon>mdi-export-variant</v-icon>
        </v-btn> -->
      </v-toolbar>
      <div class="stat-card-container">
        <div class="row">
          <div class="col-xl-3">
            <stat-card
              icon="mdi-swap-horizontal-circle"
              iconcolor="cyan"
              kpi="oil_production"
            ></stat-card>
          </div>
          <div class="col-xl-3">
            <stat-card
              icon="mdi-home-circle"
              iconcolor="teal"
              kpi="gas_production"
            ></stat-card>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-container">
      <div class="row">
        <div class="col-xl-12">
          <div
            class="card elevation-3"
            style="background: linear-gradient(87deg,#172b4d,#1a174d)!important;"
          >
            <div class="card-body">
              <line-chart kpi="oil_production"></line-chart>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-container">
      <activity-table></activity-table>
    </div>
  </div>
</template>

<script>
import StatCard from "../components/StatCard.vue";
import LineChart from "../components/LineChart";
import ActivityTable from "../components/ActivityTable";
export default {
  name: "home",
  data: () => ({
    assets: ["Ahmedabad", "Tripura"],
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    years: ["2018", "2019", "2020"]
  }),
  components: {
    StatCard,
    LineChart,
    ActivityTable
  },
  mounted() {}
};
</script>

<style scoped>
.home {
  background: #f8f9fe;
}
.gradient-background {
  background: linear-gradient(87deg, #5e72e4, #825ee4) !important;
}
.stat-card-container {
  padding-top: 30px;
  padding-bottom: 100px;
  padding-left: 30px;
  padding-right: 30px;
}
.chart-container {
  margin-top: -6rem !important;
  padding-left: 30px;
  padding-right: 30px;
}
.table-container {
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 6rem;
  margin-top: 2rem;
}
</style>
