<template>
  <div class="card neuro cityprev">
      <div class="grid top-info">
          <div>
              <h3>{{ city.name }}</h3>
              <span class="p-min">Created at {{ getLocalDate(city.created_at) }}</span>
          </div>
          <div class="grid">
              <router-link :to="{ name: 'CityDetail', params: { cityPublicId: city.public_id }}" class="btn icon" tag="button"><span class="material-icons">edit</span></router-link>
              <button class="btn icon" @click="duplicateCity(city.public_id)" ><span class="material-icons">file_copy</span></button>
              <router-link :to="{ name: 'CityDetail', params: { cityPublicId: city.public_id }}" class="btn icon" tag="button"><span class="material-icons">delete</span></router-link>
          </div>
      </div>
      <div class="grid mid-info">
          <div class="graph-container">
            <CityGraph :city="city"></CityGraph>
          </div>
          <dl>
            <div v-for="scene in city.scene_set" v-bind:key="scene.public_id">
              <dt><h4>{{ scene.name }}</h4></dt>
              <dd><span class="p-min">{{ scene.transportnetwork_set.length }} networks available</span></dd>
            </div>
          </dl>
      </div>
      <div class="bot-info">
          <router-link :to="{ name: 'CityDetail', params: { cityPublicId: city.public_id }}" class="btn neuro">View details</router-link>
      </div>
  </div>
</template>

<script>
import dateMixin from '@/mixins/dateMixin.js'
import CityGraph from '@/components/CityGraph.vue'

import citiesAPI from '@/api/cities.api';

export default {
  name: 'CityCard',
  mixins: [dateMixin],
  components: {
    CityGraph
  },
  props: {
    city: {
      type: Object,
      required: true
    }
  },
  methods: {
    duplicateCity(publicId) {
      citiesAPI.duplicateCity(publicId).then(response => {
        // TODO: isertar respuesta en cities del componente padre
        console.log(response.data)
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
