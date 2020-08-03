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
                <div v-for="item in cities" :key="item">
                    <CityCard city=item></CityCard>
                </div>
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
                    <li class="ready">
                        <div class="icon"><span class="material-icons">check_circle</span></div>
                        <div class="name">
                            <h4>Network 1</h4>
                            <span class="p-min">Stage 2 - My City 1</span>
                        </div>
                        <div class="text"><span class="p-min">Result ready</span></div>
                        <a class="btn neuro"><span>View details</span><span class="material-icons">chevron_right</span></a>
                        <a class="btn neuro"><span>View stages</span><span class="material-icons">chevron_right</span></a>
                    </li>
                    <li>
                        <div class="icon"><span class="material-icons">timelapse</span></div>
                        <div class="name">
                            <h4>Network 1 copy</h4>
                            <span class="p-min">Stage 2 - My City 1</span>
                        </div>
                        <div class="text"><span class="p-min">Processing...</span></div>
                        <a class="btn neuro"><span>View details</span><span class="material-icons">chevron_right</span></a>
                        <a class="btn neuro"><span>View stages</span><span class="material-icons">chevron_right</span></a>
                    </li>
                    <li>
                        <div class="icon"><span class="material-icons">schedule</span></div>
                        <div class="name">
                            <h4>Network 2</h4>
                            <span class="p-min">Stage 2 - My City 1</span>
                        </div>
                        <div class="text"><span class="p-min">Enqueued</span></div>
                        <a class="btn neuro"><span>View details</span><span class="material-icons">chevron_right</span></a>
                        <a class="btn neuro"><span>View stages</span><span class="material-icons">chevron_right</span></a>
                    </li>
                    <li>
                        <div class="icon"><span class="material-icons">more_horiz</span></div>
                        <div class="name">
                            <h4>Network 3</h4>
                            <span class="p-min">Stage 2 - My City 1</span>
                        </div>
                        <div class="text"><span class="p-min">Pending</span></div>
                        <a class="btn neuro"><span>View details</span><span class="material-icons">chevron_right</span></a>
                        <a class="btn neuro"><span>View stages</span><span class="material-icons">chevron_right</span></a>
                    </li>
                    <li class="error">
                        <div class="icon"><span class="material-icons">error</span></div>
                        <div class="name">
                            <h4>Network 4</h4>
                            <span class="p-min">Stage 2 - My City 1</span>
                        </div>
                        <div class="text"><span class="p-min">With errors</span></div>
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
      }
  }, 
  mounted() {
      this.init();
  }
}
</script>
