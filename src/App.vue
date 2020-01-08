<template>
  <v-app>
    <v-navigation-drawer v-model="$store.state.drawer" app clipped>
      <template v-slot:prepend>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Onshore Dashboard
            </v-list-item-title>
            <v-list-item-subtitle>
              for Asset Review
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list dense>
        <v-list-item
          v-for="item in drawer.items"
          :key="item.name"
          @click="$router.push(item.path)"
        >
          <v-list-item-action>
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <!-- <transition name="fade" mode="out-in"> -->
      <router-view></router-view>
      <!-- </transition> -->
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: {
      visible: true,
      items: [
        {
          name: "Oil and Gas",
          icon: "mdi-water",
          color: "yellow darken-2",
          path: "/oil_and_gas"
        },
        {
          name: "HSE",
          icon: "mdi-ambulance",
          color: "blue",
          path: "/hse"
        },
        {
          name: "Drilling Services",
          icon: "mdi-tools",
          color: "orange darken-2",
          path: "/drilling_services"
        },
        {
          name: "Well Services",
          icon: "mdi-water-well",
          color: "purple lighten-2",
          path: "/well_services"
        },
        {
          name: "Well Status",
          icon: "mdi-chart-pie",
          color: "red lighten-2",
          path: "/well_status"
        },
        {
          name: "Finance & MM",
          icon: "mdi-finance",
          color: "cyan darken-2",
          path: "/finance"
        }
        // {
        //   name: "Inventory Control",
        //   icon: "mdi-file-document-box-search",
        //   color: "brown",
        //   path: "/mm"
        // }
      ]
    }
  })
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
