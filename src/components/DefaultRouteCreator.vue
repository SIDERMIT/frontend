<template>
  <div>
    <Modal v-if="show" v-on="$listeners" @ok="createDefaultRoutes" :modalClasses="['modal-lines']">
        <template slot="title">
            <h2>Add default transit lines</h2>
        </template>
        <template slot="content">
            <div class="default-lines">
                <div class="default-line-row" v-for="(defaultRoute, index) in defaultRoutes" v-bind:key="defaultRoute.id">
                    <div class="options">
                        <div class="mode">
                            <h4>Mode</h4>
                            <select v-model="defaultRoute.transportMode">
                                <option selected disabled>Choose one</option>
                                <option v-for="transportMode in transportmode_set" v-bind:value="transportMode.public_id" v-bind:key="transportMode.public_id">{{ transportMode.name }}</option>
                            </select>
                        </div>
                        <div class="type">
                            <h4>Type</h4>
                            <select v-model="defaultRoute.type">
                                <option selected disabled>Choose one</option>
                                <option v-for="defaultRouteType in defaultRouteTypes" v-bind:value="defaultRouteType" v-bind:key="defaultRouteType">{{ defaultRouteType }}</option>
                            </select>
                        </div>
                        <div class="zones" v-if="['Diametral', 'Tangential'].includes(defaultRoute.type)">
                            <h4>Zone jumps</h4>
                            <div class="counter">
                                <input v-model="defaultRoute.zoneJumps" type="number" class="number" placeholder="0">
                                <button class="num plus" @click="defaultRoute.zoneJumps += 1"><span class="material-icons">arrow_drop_up</span></button>
                                <button class="num less" @click="defaultRoute.zoneJumps -= 1"><span class="material-icons">arrow_drop_down</span></button>
                            </div>
                        </div>
                        <div class="extension" v-if="['Diametral', 'Tangential', 'Radial'].includes(defaultRoute.type)">
                            <h4>Extension</h4>
                            <label class="switch big">
                                <input v-model="defaultRoute.extension" type="checkbox">
                                <div class="switch-body">
                                    <span class="text-on">Large</span>
                                    <span class="text-off">Short</span>
                                </div>
                            </label>
                        </div>
                        <div class="exclusive" v-if="['Diametral', 'Tangential', 'Radial'].includes(defaultRoute.type)">
                            <h4>OD exclusive</h4>
                            <label class="switch big">
                                <input v-model="defaultRoute.odExclusive" type="checkbox">
                                <div class="switch-body">
                                    <span class="text-on">Yes</span>
                                    <span class="text-off">No</span>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="flex end">
                        <button class="btn icon" alt="Delete" @click="removeDefaultTemplateRoute(index)"><span class="material-icons">delete</span></button>
                    </div>
                </div>
            </div>
        </template>
        <template slot="base">
            <div class="left-content">
                <button class="btn" @click="addDefaultTemplateRoute">
                    <span class="material-icons">add</span>
                    <span>Add row</span>
                </button>
                <div class="checker dark" v-if="errorMessage !== null">
                    <div class="grid checker-body error"><span class="material-icons icon">warning</span><span class="text">{{ errorMessage }}</span></div>
                </div>
            </div>
            <div class="right-content">
                <button class="btn red" @click="$emit('close')"><span>Cancel</span></button>
                <button class="btn" @click="createDefaultRoutes"><span>Generate</span></button>
            </div>
        </template>
        <template slot="close-button-name">Proceed</template>
    </Modal>
  </div>
</template>

<script>
import transportNetworksAPI from '@/api/transportNetworks.api';
import Modal from '@/components/Modal.vue';

export default {
  name: 'RouteCard',
  components: {
    Modal,
  },
  props: {
    route_set: {
      type: Array,
      required: true
    },
    transportmode_set: {
      type: Array,
      required: true
    },
    scene_public_id: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
        defaultRouteTypes: ['Circular', 'Diametral','Feeder','Radial','Tangential'],
        defaultRoutes: [],
        errorMessage: null
    }
  },
  methods: {
    createDefaultRoutes() {
        transportNetworksAPI.createDefaultRoutes(this.scene_public_id, this.defaultRoutes).then(response => {
            this.$emit('routes-created', response.data);
            this.defaultRoutes = [];
            this.$emit('close');
            this.errorMessage = null;
        }).catch(error => {
            this.errorMessage = error.response.data.detail;
        });
    },
    addDefaultTemplateRoute() {
      let defaultTemplateRoute = {
          transportMode: null,
          type: null,
          zoneJumps: 0,
          extension: false,
          odExclusive: false
      }
      this.defaultRoutes.push(defaultTemplateRoute);
    },
    removeDefaultTemplateRoute(index) {
      this.defaultRoutes.splice(index, 1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>