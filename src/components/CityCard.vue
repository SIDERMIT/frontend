<template>
  <div class="card neuro cityprev">
      <div class="grid top-info">
          <div>
              <h3>{{ city.name }}</h3>
              <span class="p-min">Created at {{ getLocalDate(city.created_at) }}</span>
          </div>
          <div class="grid">
              <button class="btn icon"><span class="material-icons">edit</span></button>
              <button class="btn icon"><span class="material-icons">file_copy</span></button>
              <button class="btn icon"><span class="material-icons">delete</span></button>
          </div>
      </div>
      <div class="grid mid-info">
          <div class="graph-container">
          </div>
          <dl>
            <div v-for="scene in city.scene_set" v-bind:key="scene.public_id">
              <dt><h4>{{ scene.name }}</h4></dt>
              <dd><span class="p-min">{{ scene.transportnetwork_set.length }} networks available</span></dd>
            </div>
          </dl>
      </div>
      <div class="bot-info">
          <a href="#" class="btn neuro">View details</a>
      </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CityCard',
  props: {
    city: {
      type: Object,
      required: true
    }
  },
  methods: {
    getLocalDate(dateObj) {
        return moment(dateObj).format("YYYY-MMM-DD");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
