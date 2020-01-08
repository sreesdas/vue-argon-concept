<template>
  <canvas width="400" height="400"></canvas>
</template>

<script>
import Chart from "chart.js";
import axios from "axios";
export default {
  props: {
    kpi: String,
    title: {
      type: String,
      default: "TITLE"
    }
  },
  mounted() {
    axios.get(`/data/tripura/2020/historical/${this.kpi}.json`).then(res => {
      this.render({
        type: "bar",
        data: {
          labels: res.data.labels,
          datasets: [
            {
              label: "Planned",
              data: res.data.planned,
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              borderColor: "rgba(153, 102, 255, 0.8)",
              borderWidth: 2
            },
            {
              label: "Actual",
              data: res.data.actual,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: this.title
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
  },

  methods: {
    render(data) {
      var ctx = this.$el.getContext("2d");
      new Chart(ctx, data);
    }
  }
};
</script>

<style></style>
