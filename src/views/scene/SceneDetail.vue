<template>
  <div class="SceneDetail">
    <div class="header">          
        <h1>{{ scene.name }}</h1>
        <span class="p-min">Created {{ getLocalDate(scene.created_at) }}</span>
    </div>
    <section class="city-details">
        <div class="graph-container">
            <CityGraph :network="scene.city.network_descriptor"></CityGraph>
        </div>
        <div>
            <div class="def-box">
                <h2>City parameters</h2>
                <div class="grid min">
                    <button class="btn" @click="showMatrixModal = true"><span class="material-icons">chevron_right</span><span>View matrix</span></button>
                </div>
            </div>
            <div>
                <div class="grid title">
                    <h2>User definition</h2>
                    <a class="link-icon" @click="showUserLegendModal = true"><span class="material-icons">help</span></a>
                </div>
                <div class="table">
                    <table class="fixed">
                        <tbody>
                            <tr>
                                <th><span>𝑣𝑎<br>[𝑘𝑚/h]</span></th>
                                <th><span>subjective<br>𝑝𝑣<br>[𝑈𝑆$/h]</span></th>
                                <th><span>subjective<br>𝑝𝑤<br>[𝑈𝑆$/h]</span></th>
                                <th><span>subjective<br>𝑝𝑎<br>[𝑈𝑆$/h]</span></th>
                                <th><span>subjective<br>𝑝𝑡<br>[𝐸𝐼𝑉]</span></th>
                                <th><span>social<br>𝑝𝑣<br>[𝑈𝑆$/h]</span></th>
                                <th><span>social<br>𝑝𝑤<br>[𝑈𝑆$/h]</span></th>
                                <th><span>social<br>𝑝𝑎<br>[𝑈𝑆$/h]</span></th>
                                <th><span>social<br>𝑝𝑡<br>[𝐸𝐼𝑉]</span></th>
                            </tr>
                            <tr>
                                <td><input type="text" :value="scene.passenger.va" disabled></td>
                                <td><input type="text" :value="scene.passenger.pv" disabled></td>
                                <td><input type="text" :value="scene.passenger.pw" disabled></td>
                                <td><input type="text" :value="scene.passenger.pa" disabled></td>
                                <td><input type="text" :value="scene.passenger.pt" disabled></td>
                                <td><input type="text" :value="scene.passenger.spv" disabled></td>
                                <td><input type="text" :value="scene.passenger.spw" disabled></td>
                                <td><input type="text" :value="scene.passenger.spa" disabled></td>
                                <td><input type="text" :value="scene.passenger.spt" disabled></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <section class="transportation-mode">
        <div class="grid title">
            <h2>Transport mode</h2>
            <a class="link-icon" @click="showTransportModeLegendModal = true"><span class="material-icons">help</span></a>
        </div>
        <TransportModeTable v-if="scene !== null" :scenePublicId="scene.public_id" :rows="scene.transportmode_set" v-on:new-transportmode="addTransportMode" v-on:erase-transportmode="removeTransportMode" ></TransportModeTable>
    </section>
    <section class="transportation-network">
        <h2>Transport network</h2>
        <div class="subtitle">
            <h4>Configuration of transport modes and users for the city</h4>
        </div>        
        <div class="table full" v-if="scene.transportnetwork_set.length !== 0">
            <ul class="network-list">
                <template v-for="transportNetwork in scene.transportnetwork_set">
                    <TransportNetworkRow :cityPublicId="scene.city.public_id" :scenePublicId="scene.public_id" :transportNetwork="transportNetwork" @new-transport-network="newTransportNetwork" @erase-transport-network="removeTransportNetwork" @change-optimization-info="updateTransportNetwork" v-bind:key="transportNetwork.public_id"/>
                </template>
            </ul>
        </div>
        <div class="empty-box" v-else>
            <p>There are not transport networks for this scenario</p>
            <router-link :to="{ name: 'NewNetwork', params: {cityPublicId: scene.city.public_id, scenePublicId: scene.public_id }}" class="btn">
                <span>Add new network</span>
                <span class="material-icons">add</span>
            </router-link>
        </div>
    </section>
    <footer>
        <div class="container full grid">
            <div class="left-content">
            </div>
            <div class="right-content">
                <router-link class="btn" v-if="scene.city.public_id !== null" :to="{ name: 'EditScene', params: {cityPublicId: scene.city.public_id, scenePublicId: scene.public_id }}" >
                    <span class="material-icons">edit</span>
                    <span>Edit scenario</span>
                </router-link>
                <router-link class="btn" v-if="scene.city.public_id !== null" :to="{ name: 'GlobalResults', params: {cityPublicId: scene.city.public_id, scenePublicId: scene.public_id }}" >
                    <span>View all scenario results</span>
                    <span class="material-icons">chevron_right</span>
                </router-link>
                <router-link v-if="scene.city.public_id !== null" :to="{ name: 'NewNetwork', params: {cityPublicId: scene.city.public_id, scenePublicId: scene.public_id }}" class="btn">
                    <span>Add new network</span>
                    <span class="material-icons">add</span>
                </router-link>
            </div>
        </div>
    </footer>
    <UserLegend :show="showUserLegendModal" @close="showUserLegendModal = false"></UserLegend>
    <TransportModeLegend :show="showTransportModeLegendModal" @close="showTransportModeLegendModal = false"></TransportModeLegend>
    <Modal v-if="showMatrixModal" @close="showMatrixModal = false" :showBase="false">
        <template slot="title">
            <div><h2>OD Matrix (Pax/h)</h2></div>
        </template>
        <template slot="content">
            <div class="parameters-container">
                <h4>Matrix parameters</h4>
                <div class="table">
                    <table>
                        <tbody>
                            <tr>
                                <th><span>𝑛</span></th>
                                <th><span>𝑌[𝑝𝑎𝑥/h]</span></th>
                                <th><span>a</span></th>
                                <th><span>𝛼</span></th>
                                <th><span>𝛽</span></th>
                            </tr>
                            <tr>
                                <td><input disabled="true" type="text" :value="scene.city.n"/></td>
                                <td><input disabled="true" type="text" :value="scene.city.y"/></td>
                                <td><input disabled="true" type="text" :value="scene.city.a"/></td>
                                <td><input disabled="true" type="text" :value="scene.city.alpha"/></td>
                                <td><input disabled="true" type="text" :value="scene.city.beta"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <CityDemand :matrixData="scene.city.demand_matrix" :header="scene.city.demand_matrix_header"></CityDemand>
        </template>
    </Modal>
  </div>
</template>

<script>
import scenesAPI from '@/api/scenes.api';
import dateMixin from '@/mixins/dateMixin.js';
import CityGraph from '@/components/CityGraph';
import CityDemand from '@/components/CityDemand';
import UserLegend from '@/components/UserLegend.vue';
import TransportModeLegend from '@/components/TransportModeLegend.vue';
import TransportModeTable from '@/components/TransportModeTable.vue';
import TransportNetworkRow from '@/components/TransportNetworkRow.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'SceneDetail',
  mixins: [dateMixin],
  components: {
    CityGraph,
    CityDemand,
    Modal,
    UserLegend,
    TransportModeLegend,
    TransportModeTable,
    TransportNetworkRow
  },
  data(){
    return {
        showUserLegendModal: false,
        showTransportModeLegendModal: false,
        showMatrixModal: false,
        scene: {
            name: null,
            created_at: null,
            passenger: {
                𝑣𝑎: null,
                𝑝𝑣: null,
                𝑝𝑤: null,
                𝑝𝑎: null,
                𝑝𝑡: null,
                𝑠𝑝𝑣: null,
                𝑠𝑝𝑤: null,
                𝑠𝑝𝑎: null,
                𝑠𝑝𝑡: null,
            },
            city: {
                n: null,
                y: null,
                a: null,
                alpha: null,
                beta: null,
                network_descriptor: {
                    nodes: [],
                    edges: []
                },
                public_id: null
            },
            transportmode_set: [],
            transportnetwork_set: []
        }
    }
  },
  methods: {
    setData(scene) {
        this.scene = scene;
    },
    addTransportMode(transportModeObj) {
        this.scene.transportmode_set.push(transportModeObj);
    },
    removeTransportMode(transportModeObj, index) {
        this.scene.transportmode_set.splice(index, 1);
    },
    newTransportNetwork(transportNetwork) {
        this.scene.transportnetwork_set.push(transportNetwork);
    },
    removeTransportNetwork(deletedTransportNetworkPublicId) {
        this.scene.transportnetwork_set = this.scene.transportnetwork_set.filter(transportNetwork => {
          return transportNetwork.public_id != deletedTransportNetworkPublicId;
      });
    },
    updateTransportNetwork(transportNetworkObj) {
        let index = this.scene.transportnetwork_set.findIndex(el => el.public_id === transportNetworkObj.public_id);
        this.scene.transportnetwork_set[index].optimization_status = transportNetworkObj.optimization_status;
        this.scene.transportnetwork_set[index].optimization_error_message = transportNetworkObj.optimization_error_message;
    }
  },
  beforeRouteEnter (to, from, next) {
    scenesAPI.getScene(to.params.scenePublicId).then(response => {
        let scene = response.data;
        next(vm => vm.setData(scene));
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.scene = {};
    scenesAPI.getCity(to.params.cityPublicId).then(response => {
      this.setData(response.data); 
      next();
    });
  }
}
</script>
