<template>
  <div class="card">
    <div class="card-body d-block">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <div class="metrics">
          <p class="grey--text text--darken-2 mb-0 font-weight-bold">
            {{ title }}
          </p>
          <h1 class="font-weight-bold">
            {{ metric }}
            <span class="grey--text text--lighten-1" style="font-size:1rem">
              {{ unit }}
            </span>
          </h1>
        </div>
        <div class="icon-container">
          <v-icon x-large :color="iconcolor">{{ icon }}</v-icon>
        </div>
      </div>
      <div class="d-flex">
        <transition name="slide-fade" mode="out-in">
          <div v-if="stat" key="since">
            <v-icon :class="pdirection == 'up' ? 'green--text' : 'red--text'">{{
              pdirection == "up" ? "mdi-arrow-up" : "mdi-arrow-down"
            }}</v-icon>
            <span :class="pdirection == 'up' ? 'green--text' : 'red--text'"
              >{{ percentage }} %</span
            >
            <span class="text-muted ml-3">since last month</span>
          </div>
          <div v-if="!stat" key="then">
            <v-icon :class="adirection == 'up' ? 'green--text' : 'red--text'">{{
              adirection == "up" ? "mdi-arrow-up" : "mdi-arrow-down"
            }}</v-icon>
            <span :class="adirection == 'up' ? 'green--text' : 'red--text'"
              >{{ achievement }} %</span
            >
            <span class="text-muted ml-3">than planned</span>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "stat-card",
  data: () => ({
    stat: true,
    metric: 0,
    title: "-",
    percentage: 0,
    achievement: 0,
    pdirection: "up",
    adirection: "up"
  }),
  computed: mapState(["selectedMonth", "selectedYear", "selectedAsset"]),
  watch: {
    selectedAsset(newVal, oldVal) {
      console.log(newVal, oldVal);
      this.fetch();
    },
    selectedMonth(newVal, oldVal) {
      console.log(newVal, oldVal);
      this.fetch();
    },
    selectedYear(newVal, oldVal) {
      console.log(newVal, oldVal);
      this.fetch();
    }
  },
  mounted() {
    if (this.ticker) {
      setInterval(() => {
        this.stat = !this.stat;
      }, 6000);
    }
    this.fetch();
  },
  methods: {
    fetch() {
      axios
        .get(
          `/data/${this.selectedAsset}/${this.selectedYear}/${this.selectedMonth}/${this.kpi}.json`
        )
        .then(res => {
          console.log(res.data);
          this.metric = res.data.actual;
          this.title = res.data.title;
          this.percentage = Math.ceil(
            ((res.data.actual - res.data.previous) / res.data.previous) * 100
          );
          this.achievement = Math.ceil(
            ((res.data.actual - res.data.planned) / res.data.planned) * 100
          );
          this.pdirection = this.percentage > 0 ? "up" : "down";
          this.adirection = this.achievement > 0 ? "up" : "down";
        });
    }
  },
  props: {
    icon: {
      type: String,
      default: "mdi-check-circle"
    },
    iconcolor: {
      type: String,
      default: "teal"
    },
    kpi: {
      type: String,
      default: "oil_production"
    },
    unit: {
      type: String,
      default: ""
    },
    ticker: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 1s ease;
}
.slide-fade-enter {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}
</style>
