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
      city: null
    }
  },
  methods: {
    init() {
      cities.getCity(this.$route.params.publicId).then(response => (this.city = response.data))
    }
  },
  mounted() {
    this.init()
  }
}
</script>
