<template>
    <li v-bind:key="transportNetwork.public_id">
      <div v-bind:class="[state.liClass]" v-html="state.icon"></div>
      <div v-bind:class="[state.liClass]" class="network-list-name">
        <h4>{{ transportNetwork.name }}</h4>
        <p><b>{{ transportNetwork.route_set.length }} routes</b></p>
      </div>
      <div class="status">
        <span v-html="state.label"></span>
      </div>
      <button class="btn neuro" v-html="state.buttonName" @click="action">
      </button>
      <div class="grid min">
        <router-link :to="{ name: 'NetworkDetail', params: { cityPublicId: cityPublicId, scenePublicId: scenePublicId, transportNetworkPublicId: transportNetwork.public_id }}" class="btn icon" tag="button" alt="Edit" :disabled="[null, 'error'].indexOf(transportNetwork.optimization_status)<0"><span class="material-icons">edit</span></router-link>
        <button class="btn icon" alt="Duplicate" @click="showConfirmDuplicateModal=true"><span class="material-icons">file_copy</span></button>
        <button class="btn icon" alt="Delete" @click="showConfirmDeleteModal = true"><span class="material-icons">delete</span></button>
      </div>
      <Modal v-if="showConfirmDeleteModal" @cancel="showConfirmDeleteModal = false" @close="showConfirmDeleteModal = false" @ok="deleteTransportNetwork()" :showCancelButton="true" :modalClasses="['warning']">
        <template slot="title">
          <div class="icon"><span class="material-icons">warning</span></div>
          <div><h4>Warning</h4></div>
        </template>
        <p slot="content">Are you sure you want to delete transport network "{{ transportNetwork.name }}"?</p>
        <template slot="close-button-name">Proceed</template>
      </Modal>
      <Modal v-if="showConfirmDuplicateModal" @cancel="showConfirmDuplicateModal = false" @close="showConfirmDuplicateModal = false" @ok="duplicateTransportNetwork()" :showCancelButton="true" :modalClasses="['warning']">
        <template slot="title">
          <div class="icon"><span class="material-icons">warning</span></div>
          <div><h4>Warning</h4></div>
        </template>
        <p slot="content">Are you sure you want to duplicate transport network "{{ transportNetwork.name }}"?</p>
        <template slot="close-button-name">Proceed</template>
      </Modal>      
      <Modal v-if="showConfirmRunOptimizationModal" @cancel="showConfirmRunOptimizationModal = false" @close="showConfirmRunOptimizationModal = false" @ok="runOptimization" :showCancelButton="true" :modalClasses="['warning']">
        <template slot="title">
          <div class="icon"><span class="material-icons">warning</span></div>
          <div><h4>Warning</h4></div>
        </template>
        <p slot="content">Are you sure you want to run optimization for transport network "{{ transportNetwork.name }}"?</p>
        <template slot="close-button-name">Yes</template>
        <template slot="cancel-button-name">No</template>
      </Modal>      
      <Modal v-if="showConfirmCancelOptimizationModal" @cancel="showConfirmCancelOptimizationModal = false" @close="showConfirmCancelOptimizationModal = false" @ok="cancelOptimization" :showCancelButton="true" :modalClasses="['warning']">
        <template slot="title">
          <div class="icon"><span class="material-icons">warning</span></div>
          <div><h4>Warning</h4></div>
        </template>
        <p slot="content">Are you sure you want to cancel optimization for transport network "{{ transportNetwork.name }}"?</p>
        <template slot="close-button-name">Yes</template>
        <template slot="cancel-button-name">No</template>
      </Modal>
      <Modal v-if="showOptimizationErrorModal" @cancel="showOptimizationErrorModal = false" @close="showOptimizationErrorModal = false" @ok="showOptimizationErrorModal = false" :showCancelButton="false" :modalClasses="['warning']">
        <template slot="title">
          <div class="icon"><span class="material-icons">warning</span></div>
          <div><h4>Warning</h4></div>
        </template>
        <p slot="content">{{ errorMessage }}</p>
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
      showConfirmCancelOptimizationModal: false,
      showConfirmRunOptimizationModal: false,
      showConfirmDeleteModal: false,
      showConfirmDuplicateModal: false,
      showOptimizationErrorModal: false,
      errorMessage: '',
      interval: null
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
    duplicateTransportNetwork() {
      transportNetworksAPI.duplicateTransportNetwork(this.transportNetwork.public_id).then(response => {
        this.$emit('new-transport-network', response.data);
      });
    },
    deleteTransportNetwork() {
      transportNetworksAPI.deleteTransportNetwork(this.transportNetwork.public_id).then(() => {
        this.$emit('erase-transport-network', this.transportNetwork.public_id);
      });
    },
    action() {
      switch(this.transportNetwork.optimization_status) {
        case 'queued':
          this.showConfirmCancelOptimizationModal = true;
          break;
        case 'processing':
          this.showConfirmCancelOptimizationModal = true;
          break;
        case 'finished':
          this.$router.push({name: 'NetworkResults', params: {cityPublicId: this.cityPublicId, scenePublicId: this.scenePublicId, transportNetworkPublicId: this.transportNetwork.public_id}});
          break;
        case 'error':
          this.showOptimizationErrorModal = true;
          this.errorMessage = this.transportNetwork.optimization_error_message;
          break;
        default:
          // so it is ready to run
          this.showConfirmRunOptimizationModal = true;
          break;
      }
    },
    runOptimization() {
      transportNetworksAPI.runOptimization(this.transportNetwork.public_id).then(response => {
        this.$emit('change-optimization-info', response.data);
        this.runPeriodicCall();
      }).catch(error => {
          this.errorMessage = error.response.data[0];
          this.showOptimizationErrorModal = true;
      });
    },
    cancelOptimization() {
      transportNetworksAPI.cancelOptimization(this.transportNetwork.public_id).then(response => {
        this.$emit('change-optimization-info', response.data);
        clearInterval(this.interval);
      }).catch(error => {
        this.errorMessage = error.response.data[0];
        this.showOptimizationErrorModal = true;
      });
    },
    runPeriodicCall() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        console.log(`updated network "${this.transportNetwork.name}" ...`);
        transportNetworksAPI.getTransportNetwork(this.transportNetwork.public_id).then(response => {
          if (['finished', 'error'].indexOf(response.data.optimization_status) > -1 ) {
            clearInterval(this.interval);
          }
          this.$emit('change-optimization-info', response.data);
        });
      }, 5000);
    }
  },
  created() {
    if (['queued', 'processing'].indexOf(this.transportNetwork.optimization_status) > -1) {
      this.runPeriodicCall();
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
