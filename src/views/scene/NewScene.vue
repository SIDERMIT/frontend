<template>
  <div class="NewScene">
    <div class="header">          
        <h1>Add new scene</h1>
    </div>
    <section class="definitions">
        <div>
            <div class="def-box">
                <h2>Name your scene</h2>
                <input v-model="scene.name" v-bind:class="{ error: (scene.name === null || scene.name === '') }"  type="text" placeholder="Can't be empty" class="text-left"/>
            </div>
            <div>
                <h2>Define transport user</h2>
                <div class="subtitle">
                    <div class="grid">
                        <h4>User settings</h4>
                        <a class="icon-link" @click="showUserLegendModal = true"><span class="material-icons">help</span></a>
                    </div>
                </div>
                <div class="table">
                    <table>
                        <tbody>
                            <tr>
                                <th><span>𝑣𝑎<br>[𝑘𝑚/h]</span></th>
                                <th><span>𝑝𝑣<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑝𝑤<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑝𝑎<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑝𝑡<br>[𝐸𝐼𝑉]</span></th>
                                <th><span>𝑠𝑝𝑣<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑠𝑝𝑤<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑠𝑝𝑎<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑠𝑝𝑡<br>[𝐸𝐼𝑉]</span></th>
                            </tr>
                            <tr>
                                <td><input v-model="scene.passenger.va" v-bind:class="{ error: (scene.passenger.va === null || scene.passenger.va === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.pv" v-bind:class="{ error: (scene.passenger.pv === null || scene.passenger.pv === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.pw" v-bind:class="{ error: (scene.passenger.pw === null || scene.passenger.pw === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.pa" v-bind:class="{ error: (scene.passenger.pa === null || scene.passenger.pa === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.pt" v-bind:class="{ error: (scene.passenger.pt === null || scene.passenger.pt === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.spv" v-bind:class="{ error: (scene.passenger.spv === null || scene.passenger.spv === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.spw" v-bind:class="{ error: (scene.passenger.spw === null || scene.passenger.spw === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.spa" v-bind:class="{ error: (scene.passenger.spa === null || scene.passenger.spa === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.spt" v-bind:class="{ error: (scene.passenger.spt === null || scene.passenger.spt === '') }" type="text" placeholder="-"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="ckecher">
                    </div>
                </div>
            </div>
        </div>
        <div class="graph-container">
            <CityGraph :network="scene.city.network_descriptor"></CityGraph>
        </div>
    </section>
    <section class="scene-modes">
        <h2>Define transportation modes</h2>
        <div class="subtitle">
            <div class="grid">
                <h4>Add or remove all transportation modes that the city will have</h4>
                <a class="icon-link" @click="showTransportModeLegendModal = true" ><span class="material-icons">help</span></a>
            </div>
        </div>
        <TransportModeTable v-if="scene !== null" :scenePublicId="scene.public_id" :rows="scene.transportmode_set" v-on:new-transportmode="addTransportMode" v-on:erase-transportmode="removeTransportMode" ></TransportModeTable>
    </section>
    <footer>
        <div class="container full grid">
            <div class="left-content">
            </div>
            <div class="right-content">
                <button class="btn" @click="updateScene">
                    <span>Save and continue</span>
                    <span class="material-icons">chevron_right</span>
                </button>
            </div>
        </div>
    </footer>
    <UserLegend :show="showUserLegendModal" @close="showUserLegendModal = false"></UserLegend>
    <TransportModeLegend :show="showTransportModeLegendModal" @close="showTransportModeLegendModal = false"></TransportModeLegend>
    <Modal v-if="showWarningModal" @close="showWarningModal = false" :showCancelButton="modalData.showCancelButton" :modalClasses="['warning']">
        <template slot="title">
            <div class="icon"><span class="material-icons">warning</span></div>
            <div><h4>Warning</h4></div>
        </template>
        <p slot="content" v-html="modalData.message"></p>
        <template slot="close-button-name">{{ modalData.closeButtonName }}</template>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import CityGraph from '@/components/CityGraph.vue';
import UserLegend from '@/components/UserLegend.vue';
import TransportModeLegend from '@/components/TransportModeLegend.vue';
import TransportModeTable from '@/components/TransportModeTable.vue';
import scenesAPI from '@/api/scenes.api';
import citiesAPI from '@/api/cities.api';
import errorMessageMixin from '@/mixins/errorMessageMixin.js'

export default {
  name: 'NewScene',
  mixins: [errorMessageMixin],
  components: {
    Modal,
    UserLegend,
    TransportModeLegend,
    TransportModeTable,
    CityGraph
  },
  data() {
      return {
          pageTitle: 'Add new scene',
          isNew: true,
          showWarningModal: false,
          showUserLegendModal: false,
          showTransportModeLegendModal: false,
          showDeleteConfirmationModal: false,
          modalData: {
            showCancelButton: true,
            closeButtonName: 'Ok',
            message: ''
          },
          deleteModalData: {
              index: null,
              name: null,
              publicId: null
          },
          scene: {
              name: null,
              passenger: {
                va: null,
                pv: null,
                pw: null,
                pa: null,
                pt: null,
                spw: null,
                spa: null,
                spt: null,
                spv: null
              },
              transportmode_set: [],
              public_id: null,
              city: {
                  network_descriptor: {
                      nodes: [],
                      edges: []
                  }
              }
          }
      }
  },
  methods: {
      setData(scene) {
        this.pageTitle = 'Edit scene';
        this.isNew = false;
        this.scene = scene;
      },
      addTransportMode(transportModeObj) {
        this.scene.transportmode_set.push(transportModeObj);
      },
      removeTransportMode(transportModeObj, index) {
        this.scene.transportmode_set.splice(index, 1);
      },
      updateScene() {
        let data = JSON.parse(JSON.stringify(this.scene));
        data.city_public_id = this.$router.currentRoute.params.cityPublicId;

        let request = null;
        if (this.isNew) {
            request = scenesAPI.createScene(data)
        } else {
            request = scenesAPI.updateScene(this.scene.public_id, data)
        }
        
        request.then(response => {
            this.$router.push({name: 'SceneDetail', params: {scenePublicId: response.data.public_id}})
        }).catch(error => {
            let message = this.getErrorMessage(error.response.data);
            this.modalData.message = message;
            this.modalData.showCancelButton = false
            this.modalData.closeButtonName = 'OK'
            this.showWarningModal = true;
        });
      }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.scenePublicId) {
      scenesAPI.getScene(to.params.scenePublicId).then(response => (next(vm => vm.setData(response.data))));
    } else {
        // fill city data
        citiesAPI.getCity(to.params.cityPublicId).then(response => {
            next(vm => vm.scene.city.network_descriptor = response.data.network_descriptor);
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.scenePublicId) {
        this.scene = {};
        scenesAPI.getScene(to.params.scenePublicId).then(response => {
            this.setData(response.data); 
            next();
        });
    } else {
        // fill city data
        citiesAPI.getCity(to.params.cityPublicId).then(response => {
            this.scene.city.network_descriptor = response.data.network_descriptor;
            next();
        });
    }
  }
}
</script>
