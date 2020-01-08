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
              kpi="ws/rig_availability"
            ></stat-card>
          </div>
          <div class="col-xl-3">
            <stat-card
              icon="mdi-home-circle"
              iconcolor="teal"
              kpi="ws/oil_gain"
            ></stat-card>
          </div>
          <div class="col-xl-3">
            <stat-card
              icon="mdi-swap-horizontal-circle"
              iconcolor="red darken-2"
              kpi="ws/gas_gain"
            ></stat-card>
          </div>
          <div class="col-xl-3">
            <stat-card
              icon="mdi-swap-horizontal-circle"
              iconcolor="yellow darken-4"
              kpi="ws/wo_index"
            ></stat-card>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-container">
      <div class="row">
        <div class="col-xl-6">
          <div
            class="card elevation-1"
            style="background: linear-gradient(87deg,#172b4d,#1a174d)!important;"
          >
            <div class="card-body">
              <line-chart kpi="ds/oil_gain"></line-chart>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div
            class="card elevation-1"
            style="background: linear-gradient(87deg,#172b4d,#1a174d)!important;"
          >
            <div class="card-body">
              <line-chart kpi="ds/gas_gain"></line-chart>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card elevation-1">
            <div class="card-body">
              <bar-chart kpi="ws/rig_availability"></bar-chart>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card elevation-1">
            <div class="card-body">
              <bar-chart kpi="ws/wo_index"></bar-chart>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-container">
      <activity-table kpi="oil_and_gas"></activity-table>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import axios from "axios";
import StatCard from "../components/StatCard.vue";
import BarChart from "../components/BarChart";
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
    BarChart,
    ActivityTable
  },
  methods: {
    render(id, data) {
      var ctx = document.getElementById(id);
      new Chart(ctx, data);
    }
  },
  mounted() {
    axios.get(`/data/tripura/2020/trends/rigs.json`).then(res => {
      this.render("assetRigs", {
        type: "bar",
        data: {
          labels: res.data.assets,
          datasets: [
            {
              label: "Asset Wise Rig Nos",
              data: res.data.nos,
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 0.8)",
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 2,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    });
  }
};
</script>

<style scoped>
.home {
  background: #f8f9fe;
}
.gradient-background {
  background: linear-gradient(to right, #4568dc, #b06ab3);
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
