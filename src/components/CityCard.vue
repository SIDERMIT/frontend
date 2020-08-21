<template>
  <div class="card neuro cityprev">
      <div class="grid top-info">
          <div>
              <h3>{{ city.name }}</h3>
              <span class="p-min">Created at {{ getLocalDate(city.created_at) }}</span>
          </div>
          <div class="grid min">
              <router-link :to="{ name: 'EditCity', params: { cityPublicId: city.public_id }}" class="btn icon" tag="button" alt="Edit"><span class="material-icons">edit</span></router-link>
              <button class="btn icon" @click="showConfirmDuplicateModal = true"  alt="Duplicate"><span class="material-icons">file_copy</span></button>
              <button class="btn icon" @click="showConfirmDeleteModal = true"  alt="Delete"><span class="material-icons">delete</span></button>
          </div>
      </div>
      <div class="grid mid-info">
          <div class="graph-container">
            <CityGraph :network="city.network_descriptor"></CityGraph>
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
      <Modal v-if="showConfirmDeleteModal" @cancel="showConfirmDeleteModal = false" @close="showConfirmDeleteModal = false" @ok="deleteCity(city.public_id)" :showCancelButton="true" :isWarning="true">
          <template slot="title">
              <div class="icon"><span class="material-icons">warning</span></div>
              <div><h4>Warning</h4></div>
          </template>
          <p slot="content">Are you sure you want to delete city "{{ city.name }}"?</p>
          <template slot="close-button-name">Proceed</template>
      </Modal>
      <Modal v-if="showConfirmDuplicateModal" @cancel="showConfirmDuplicateModal = false" @close="showConfirmDuplicateModal = false" @ok="duplicateCity(city.public_id)" :showCancelButton="true" :isWarning="true">
          <template slot="title">
              <div class="icon"><span class="material-icons">warning</span></div>
              <div><h4>Warning</h4></div>
          </template>
          <p slot="content">Are you sure you want to duplicate city "{{ city.name }}"?</p>
          <template slot="close-button-name">Proceed</template>
      </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import dateMixin from '@/mixins/dateMixin.js'
import CityGraph from '@/components/CityGraph.vue'

import citiesAPI from '@/api/cities.api';

export default {
  name: 'CityCard',
  mixins: [dateMixin],
  components: {
    CityGraph,
    Modal,
  },
  props: {
    city: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showConfirmDeleteModal: false,
      showConfirmDuplicateModal: false
    }
  },
  methods: {
    duplicateCity(publicId) {
      citiesAPI.duplicateCity(publicId).then(response => {
        this.$emit('new-city', response.data);
      });
    },
    deleteCity(publicId) {
      citiesAPI.deleteCity(publicId).then(response => {
        this.$emit('erase-city', response.data);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
