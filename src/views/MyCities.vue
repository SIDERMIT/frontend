<template>
  <div class="MyCities">
    <div class="header"> 
      <h1>My cities</h1>
    </div>
  
    <section class="cities">
      <div class="grid heading">
        <h2>{{ cities.length }} Cities available</h2>
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

export default {
  name: 'MyCities',
  components: {
    CityCard
  },
  data() {
    return {
      cities: []
    }
  },
  methods: {
    setData(cities) {
      this.cities = cities;
    },
    updateCityList(city) {
      this.cities.unshift(city);
    },
    eraseCityList(deletedCityPublicId) {
      this.cities = this.cities.filter(city => {
          return city.public_id != deletedCityPublicId;
      });
    }
  },
  beforeRouteEnter (to, from, next) {
    citiesAPI.getAllCities().then(response => {
        next(vm => vm.setData(response.data));
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.cities = [];
    citiesAPI.getAllCities().then(response => {
        this.setData(response.data);
        next();
    });
  }
}
</script>
