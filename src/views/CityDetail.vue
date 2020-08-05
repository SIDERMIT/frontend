<template>
  <div class="CityDetail">
    <h1>{{ city.name }}</h1>
    <span class="p-min">Created at {{ getLocalDate(city.created_at) }}</span>
  </div>
</template>

<script>
import cities from '@/api/cities.api';
import dateMixin from '@/mixins/dateMixin.js'

export default {
  name: 'CityDetail',
  mixins: [dateMixin],
  components: {
    
  },
  data() {
    return {
      city: {}
    }
  },
  methods: {
    setData(city) {
      this.city = city;
    }
  },
  beforeRouteEnter (to, from, next) {
    cities.getCity(to.params.cityPublicId).then(response => (next(vm => vm.setData(response.data))));
  },
  beforeRouteUpdate(to, from, next) {
    this.city = {};
    cities.getCity(to.params.cityPublicId).then(response => {
      this.setData(response.data); 
      next();
    });
  }
}
</script>
