<template>
    <li v-bind:key="transportNetwork.public_id" v-bind:class="[state.liClass]">
      <div v-html="state.icon"></div>
      <div class="network-list-name">
        <h4>{{ transportNetwork.name }}</h4>
        <p><b>{{ transportNetwork.route_set.length }} routes</b></p>
      </div>
      <div class="status">
        <span v-html="state.label"></span>
      </div>
      <button class="btn neuro" v-html="state.buttonName">
      </button>
      <div class="grid min">
        <router-link :to="{ name: 'NetworkDetail', params: { cityPublicId: cityPublicId, scenePublicId: scenePublicId, transportNetworkPublicId: transportNetwork.public_id }}" class="btn icon" tag="button" alt="Edit"><span class="material-icons">edit</span></router-link>
        <button class="btn icon" alt="Duplicate" @click="showConfirmDuplicateModal=true"><span class="material-icons">file_copy</span></button>
        <button class="btn icon" alt="Delete" @click="showConfirmDeleteModal = true"><span class="material-icons">delete</span></button>
      </div>
      <Modal v-if="showConfirmDeleteModal" @cancel="showConfirmDeleteModal = false" @close="showConfirmDeleteModal = false" @ok="deleteTransportNetwork(transportNetwork.public_id)" :showCancelButton="true" :modalClasses="['warning']">
        <template slot="title">
          <div class="icon"><span class="material-icons">warning</span></div>
          <div><h4>Warning</h4></div>
        </template>
        <p slot="content">Are you sure you want to delete transport network "{{ transportNetwork.name }}"?</p>
        <template slot="close-button-name">Proceed</template>
      </Modal>
      <Modal v-if="showConfirmDuplicateModal" @cancel="showConfirmDuplicateModal = false" @close="showConfirmDuplicateModal = false" @ok="duplicateTransportNetwork(transportNetwork.public_id)" :showCancelButton="true" :modalClasses="['warning']">
        <template slot="title">
          <div class="icon"><span class="material-icons">warning</span></div>
          <div><h4>Warning</h4></div>
        </template>
        <p slot="content">Are you sure you want to duplicate transport network "{{ transportNetwork.name }}"?</p>
        <template slot="close-button-name">Proceed</template>
      </Modal>
    </li>
</template>

<script>
import transportNetworksAPI from '@/api/transportNetworks.api';
import Modal from '@/components/Modal.vue'

export default {
  name: 'TransportNetworkRow',
  components: {
    Modal,
  },
  props: {
    transportNetwork: {
      type: Object,
      required: true
    },
    cityPublicId: {
      type: String,
      required: true
    },
    scenePublicId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showConfirmDeleteModal: false,
      showConfirmDuplicateModal: false
    }
  },
  computed: {
    state() {
      let icon = '<div class="icon"><span class="material-icons">more_horiz</span></div>';
      let liClass = '';
      let label = 'Not executed';
      let buttonName = '<span>Process</span><span class="material-icons">add</span>';

      switch(this.transportNetwork.optimization_status) {
        case 'queued':
          icon = '<div class="icon"><span class="material-icons">schedule</span></div>';
          liClass = 'queued';
          label = 'Queued';
          buttonName = '<span>Remove</span><span class="material-icons">remove</span>';
          break;
        case 'processing':
          icon = '<div class="loader">Loading...</div>';
          liClass = 'processing';
          label = 'Processing...';
          buttonName = '<span>Cancel</span><span class="material-icons">close</span>';
          break;
        case 'finished':
          icon = '<div class="icon"><span class="material-icons">check_circle</span></div>';
          liClass = 'ok';
          label = 'Processed';
          buttonName = '<span>View results</span><span class="material-icons">chevron_right</span>';
          break;
        case 'error':
          icon = '<div class="icon"><span class="material-icons">error</span></div>';
          liClass = 'error';
          label = 'Error';
          buttonName = '<span>View errors</span><span class="material-icons">chevron_right</span>';
          break;
      }

      return {icon, liClass, buttonName, label};
    },
  },
  methods: {
    duplicateTransportNetwork(publicId) {
      transportNetworksAPI.duplicateTransportNetwork(publicId).then(response => {
        this.$emit('new-trasport-network', response.data);
      });
    },
    deleteTransportNetwork(publicId) {
      transportNetworksAPI.deleteTransportNetwork(publicId).then(() => {
        this.$emit('erase-transport-network', publicId);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
