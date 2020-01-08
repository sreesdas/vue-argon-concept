<template>
  <div class="home">
    <div class="gradient-background">
      <v-toolbar class="pt-2" color="rgba(0,0,0,0)" elevation="0" dark>
        <v-btn icon @click="$store.state.drawer = !$store.state.drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
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
              icon="mdi-call-missed"
              iconcolor="cyan"
              kpi="hse/near_miss"
            ></stat-card>
          </div>
          <div class="col-xl-3">
            <stat-card
              icon="mdi-bandage"
              iconcolor="teal"
              kpi="hse/minor"
            ></stat-card>
          </div>
          <div class="col-xl-3">
            <stat-card
              icon="mdi-fire-truck"
              iconcolor="red darken-2"
              kpi="hse/major"
            ></stat-card>
          </div>
          <div class="col-xl-3">
            <stat-card
              icon="mdi-ambulance"
              iconcolor="blue"
              kpi="hse/fatal"
            ></stat-card>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-container">
      <div class="row">
        <div class="col-12">
          <div
            class="card elevation-3"
            style="background: linear-gradient(87deg,#172b4d,#1a174d)!important;"
          >
            <div class="card-body">
              <canvas id="accidentChart" width="400" height="400"></canvas>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="card elevation-3">
            <div class="card-body">
              <canvas id="dgmsChart" width="400" height="400"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-container">
      <activity-table kpi="hse"></activity-table>
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
    assets: [
      "Ahmedabad",
      "Ankleshwar",
      "Assam",
      "Bokaro",
      "Cambay",
      "Cauvery",
      "Jorhat",
      "Rajahmundry",
      "Tripura"
    ],
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
    years: ["2018", "2019", "2020", "2021"]
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
    axios.get(`/data/tripura/2020/historical/accidents.json`).then(res => {
      this.render("accidentChart", {
        type: "bar",
        data: {
          labels: res.data.labels,
          datasets: [
            {
              label: "Near Miss",
              data: res.data.near_miss,
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 0.8)",
              borderWidth: 2
            },
            {
              label: "Major",
              data: res.data.major,
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 2
            },
            {
              label: "Minor",
              data: res.data.minor,
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 2
            },
            {
              label: "Fatal",
              data: res.data.fatal,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "ACCIDENT INCIDENTS"
          },
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

    axios.get(`/data/tripura/2020/historical/dgms.json`).then(res => {
      this.render("dgmsChart", {
        type: "bar",
        data: {
          labels: res.data.labels,
          datasets: [
            {
              label: "DGMS (Long Pending)",
              data: res.data.dgms_lp,
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 0.8)",
              borderWidth: 2
            },
            {
              label: "OISD (Long Pending)",
              data: res.data.oisd_lp,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2
            },
            {
              label: "DGMS (Compliance)",
              data: res.data.dgms_c,
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 2
            },
            {
              label: "OISD (Compliance)",
              data: res.data.oisd_c,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: "OISD AND DGMS"
          },
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
