<template>
  <div class="dashboard">
    <div class="header">          
        <h1>Dashboard</h1>
    </div>

    <section class="recent-cities">
        <div class="grid heading">
            <h2>Recently created cities</h2>
            <a class="btn" v-if="cities.length > 0">
                <span>View all (10)</span>
                <span class="material-icons">chevron_right</span>
            </a>
        </div>
        <div class="grid">
            <template v-if="cities.length > 0">
                <CityCard v-for="city in cities" v-bind:key="city.public_id" v-bind:city="city"></CityCard>
            </template>
            <template v-else>
                <div class="empty-box">
                    <p>No cities found, start making your first city</p>
                    <a href="#" class="btn"><span>Add new city</span><span class="material-icons">add</span></a>
                </div>
            </template>
        </div>
    </section>

    <section class="last-optimization">
        <h2>Last optimizations</h2>
        <template v-if="optimizations.length == 0">
            <div class="empty-box">
                <p>You have no optimization finished yet. Start its process from the network list in a city stage.</p>
            </div>
        </template>
        <template v-else>
            <div class="table">
                <ul class="optimizations">
                    <li v-for="optimization in optimizations" v-bind:key="optimization.network_name" 
                        v-bind:class="{ ready: optimization.status == 'finished',  error: optimization.status == 'error' }">
                        <div class="icon"><span class="material-icons">{{ getOptimizationIcon(optimization.status) }}</span></div>
                        <div class="name">
                            <h4>{{ optimization.network_name }}</h4>
                            <span class="p-min">{{ optimization.scene_name }} - {{ optimization.city_name }}</span>
                        </div>
                        <div class="text"><span class="p-min">{{ optimization.status }}</span></div>
                        <a class="btn neuro"><span>View details</span><span class="material-icons">chevron_right</span></a>
                        <a class="btn neuro"><span>View stages</span><span class="material-icons">chevron_right</span></a>
                    </li>                  
                </ul>
            </div>
        </template>
    </section>
    
    <footer>
        <div class="container full grid">
            <div class="left-content">
            </div>
            <div class="right-content">
                <a href="#" class="btn">
                    <span>Add new city</span>
                    <span class="material-icons">add</span>
                </a>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
import CityCard from '@/components/CityCard.vue';
import cities from '@/api/cities.api';

export default {
  name: 'Dashboard',
  components: {
      CityCard,
  },
  data() {
      return {
          cities: [], 
          optimizations: []
      }
  },
  methods: {
      init() {
          cities.getAllCities(3).then( response => (this.cities = response.data));
          cities.getRecentOptimizations().then( response => (this.optimizations = response.data));
      },
      getOptimizationIcon(status) {
          let icon = "";
          switch(status) {
              case "finished":
                  icon = "check_circle";
                  break;
              case "error":
                  icon = "error";
                  break;
              case "processing":
                  icon = "timelapse";
                  break;
              case "queued":
                  icon = "schedule";
                  break;
          }
          return icon
      }
  }, 
  mounted() {
      this.init();
  }
}
</script>
