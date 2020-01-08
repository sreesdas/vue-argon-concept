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
              kpi="well_status/total"
            ></stat-card>
          </div>
          <div class="col-xl-3">
            <stat-card
              icon="mdi-home-circle"
              iconcolor="teal"
              kpi="well_status/flowing"
            ></stat-card>
          </div>
          <div class="col-xl-3">
            <stat-card
              icon="mdi-swap-horizontal-circle"
              iconcolor="red darken-2"
              kpi="well_status/non_flowing"
            ></stat-card>
          </div>
          <div class="col-xl-3">
            <stat-card
              icon="mdi-swap-horizontal-circle"
              iconcolor="yellow darken-4"
              kpi="well_status/sick"
            ></stat-card>
          </div>
          <div class="col-xl-3">
            <stat-card
              icon="mdi-swap-horizontal-circle"
              iconcolor="yellow darken-4"
              kpi="well_status/other"
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
              <canvas id="wellStatus" width="400" height="400"></canvas>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div
            class="card elevation-1"
            style="background: linear-gradient(87deg,#172b4d,#1a174d)!important;"
          >
            <canvas id="sickStatus" width="400" height="400"></canvas>
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
    ActivityTable
  },
  methods: {
    render(id, data) {
      var ctx = document.getElementById(id);
      new Chart(ctx, data);
    }
  },
  mounted() {
    axios
      .get(`/data/tripura/2020/historical/well_status/total.json`)
      .then(res => {
        this.render("wellStatus", {
          type: "line",
          data: {
            labels: res.data.labels,
            datasets: [
              {
                label: "Total",
                data: res.data.total,
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 0.8)",
                borderWidth: 2
              },
              {
                label: "Flowing",
                data: res.data.flowing,
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 0.8)",
                borderWidth: 2
              },
              {
                label: "Non Flowing",
                data: res.data.non_flowing,
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

        this.render("sickStatus", {
          type: "line",
          data: {
            labels: res.data.labels,
            datasets: [
              {
                label: "Sick Wells",
                data: res.data.sick,
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 0.8)",
                borderWidth: 2
              },
              {
                label: "Other Non-flowing Wells",
                data: res.data.other,
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
  background: linear-gradient(87deg, #2dce89, #2dcecc) !important;
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
