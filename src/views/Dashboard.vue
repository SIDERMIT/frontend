<template>
  <div class="dashboard">
    <div class="header">          
        <h1>Dashboard</h1>
    </div>

    <section class="recent-cities">
        <div class="grid heading">
            <h2>Recently created cities</h2>
            <template v-if="cities.length > 0">
                <router-link :to="{ name: 'MyCities'}" class="btn">
                    <span>View all</span>
                    <span class="material-icons">chevron_right</span>
                </router-link>
            </template>
        </div>
        <template v-if="cities.length > 0">
            <div class="grid cities">
                <CityCard v-for="city in cities" v-bind:key="city.public_id" v-bind:city="city" v-on:new-city="updateCityList" v-on:erase-city="eraseCityList"></CityCard>
            </div>
        </template>
        <template v-else>
            <div class="empty-box">
                <p>No cities found, start making your first city</p>
                <router-link :to="{ name: 'NewCity'}" class="btn">
                    <span>Add new city</span>
                    <span class="material-icons">add</span>
                </router-link>
            </div>
        </template>
    </section>

    <section class="last-optimization">
        <h2>Last optimizations</h2>
        <template v-if="optimizations.length == 0">
            <div class="empty-box">
                <p>You have no optimization finished yet. Start its process from network list in a city scene.</p>
            </div>
        </template>
        <template v-else>
            <div class="table full">
                <ul class="optimizations">
                    <li v-for="optimization in optimizations" v-bind:key="optimization.network_name" 
                        v-bind:class="{ ready: optimization.optimization_status == 'finished',  error: optimization.optimization_status == 'error' }">
                        <div v-html="getOptimizationIcon(optimization.optimization_status)"></div>
                        <div class="name">
                            <h4>{{ optimization.network_name }}</h4>
                            <span class="p-min">{{ optimization.scene_name }} - {{ optimization.city_name }}</span>
                        </div>
                        <div class="text"><span class="p-min">{{ optimization.optimization_status }}</span></div>
                        <router-link v-if="optimization.optimization_status === 'finished'" :to="{ name: 'NetworkResults', params: {cityPublicId: optimization.city_public_id, scenePublicId: optimization.scene_public_id, transportNetworkPublicId: optimization.network_public_id }}" class="btn neuro"><span>View results</span><span class="material-icons">chevron_right</span></router-link>
                        <router-link :to="{ name: 'NetworkDetail', params: { cityPublicId: optimization.city_public_id, scenePublicId: optimization.scene_public_id, transportNetworkPublicId: optimization.network_public_id }}" class="btn neuro"><span>View details</span><span class="material-icons">chevron_right</span></router-link>
                        <router-link :to="{ name: 'SceneDetail', params: { cityPublicId: optimization.city_public_id, scenePublicId: optimization.scene_public_id }}" class="btn neuro"><span>View scenes</span><span class="material-icons">chevron_right</span></router-link>
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
                <router-link :to="{ name: 'NewCity'}" class="btn">
                    <span>Add new city</span>
                    <span class="material-icons">add</span>
                </router-link>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
import CityCard from '@/components/CityCard.vue';
import citiesAPI from '@/api/cities.api';
import axios from 'axios';

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
      setData(cities, optimizations){
        this.cities = cities;
        this.optimizations = optimizations;
      },
      getOptimizationIcon(status) {
          let icon = "";
          switch(status) {
              case "queued":
                  icon = '<div class="icon"><span class="material-icons">schedule</span></div>';
                  break;
              case "processing":
                  icon = '<div class="loader">Loading...</div>';
                  break;
              case "finished":
                  icon = '<div class="icon"><span class="material-icons">check_circle</span></div>';
                  break;
              case "error":
                  icon = '<div class="icon"><span class="material-icons">error</span></div>';
                  break;
              default:
                  icon = '<div class="icon"><span class="material-icons">more_horiz</span></div>';
                  break;
          }
          return icon;
      },
      updateCityList(city) {
        this.cities.unshift(city);
        if (this.cities.length > 3) {
            this.cities.pop();
        }
      },
      eraseCityList() {
        citiesAPI.getAllCities(3).then(response => {
            this.cities = response.data;
        });
      }
  },
  beforeRouteEnter (to, from, next) {
    axios.all([
        citiesAPI.getAllCities(3),
        citiesAPI.getRecentOptimizations()
    ]).then(axios.spread( (citiesResponse, optimizationsResponse) => {
        next(vm => vm.setData(citiesResponse.data, optimizationsResponse.data));
    }));
  },
  beforeRouteUpdate(to, from, next) {
    this.city = [];
    this.optimizations = [];
    axios.all([
          citiesAPI.getAllCities(3),
          citiesAPI.getRecentOptimizations()
    ]).then(axios.spread( (citiesResponse, optimizationsResponse) => {
        this.setData(optimizationsResponse.data, optimizationsResponse.data);
        next();
    }));
  }
}
</script>
