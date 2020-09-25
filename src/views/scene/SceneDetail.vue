<template>
  <div class="SceneDetail">
    <div class="header">          
        <h1>{{ scene.name }}</h1>
        <span class="p-min">Created at {{ getLocalDate(scene.created_at) }}</span>
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
        <div class="table full">
            <ul class="network-list">
                <li class="ok">
                    <div class="icon"><span class="material-icons">check_circle</span></div>
                    <div class="network-list-name">
                        <h4>Network 1 copy</h4>
                        <p><b>28 total networks</b> 13 tangential, 7 diametrial and 8 others</p>
                    </div>
                    <div class="status">
                        <span>Processed</span>
                    </div>
                    <button class="btn neuro">
                        <span>View results</span>
                        <span class="material-icons">chevron_right</span>
                    </button>
                    <div class="grid min">
                        <button class="btn icon" alt="Edit"><span class="material-icons">edit</span></button>
                        <button class="btn icon" alt="Duplicate"><span class="material-icons">file_copy</span></button>
                        <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                    </div>
                </li>
                <li class="procesing">
                    <div class="loader">Loading...</div>
                    <div class="network-list-name">
                        <h4>Network 2 copy</h4>
                        <p><b>5 total networks</b> 13 tangential, 7 diametrial and 8 others</p>
                    </div>
                    <div class="status">
                        <span>Procesing...</span>
                    </div>
                    <button class="btn neuro">
                        <span>Cancel</span>
                        <span class="material-icons">close</span>
                    </button>
                    <div class="grid min">
                        <button class="btn icon" alt="Edit" disabled><span class="material-icons">edit</span></button>
                        <button class="btn icon" alt="Duplicate"><span class="material-icons">file_copy</span></button>
                        <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                    </div>
                </li>
                <li class="queued">
                    <div class="icon"><span class="material-icons">schedule</span></div>
                    <div class="network-list-name">
                        <h4>Network 2</h4>
                        <p><b>28 total networks</b> 13 tangential, 7 diametrial and 8 others</p>
                    </div>
                    <div class="status">
                        <span>In queued</span>
                    </div>
                    <button class="btn neuro">
                        <span>Remove</span>
                        <span class="material-icons">remove</span>
                    </button>
                    <div class="grid min">
                        <button class="btn icon" alt="Edit"><span class="material-icons">edit</span></button>
                        <button class="btn icon" alt="Duplicate"><span class="material-icons">file_copy</span></button>
                        <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                    </div>
                </li>
                <li>
                    <div class="icon"><span class="material-icons">more_horiz</span></div>
                    <div class="network-list-name">
                        <h4>Network 3</h4>
                        <p><b>28 total networks</b> 13 tangential, 7 diametrial and 8 others</p>
                    </div>
                    <div class="status">
                        <span>Ready</span>
                    </div>
                    <button class="btn neuro">
                        <span>Process</span>
                        <span class="material-icons">add</span>
                    </button>
                    <div class="grid min">
                        <button class="btn icon" alt="Edit"><span class="material-icons">edit</span></button>
                        <button class="btn icon" alt="Duplicate"><span class="material-icons">file_copy</span></button>
                        <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                    </div>
                </li>
                <li class="error">
                    <div class="icon"><span class="material-icons">error</span></div>
                    <div class="network-list-name">
                        <h4>Network 3 copy</h4>
                        <p><b>28 total networks</b> 13 tangential, 7 diametrial and 8 others</p>
                    </div>
                    <div class="status">
                        <span>Error</span>
                    </div>
                    <button class="btn neuro">
                        <span>View errors</span>
                        <span class="material-icons">chevron_right</span>
                    </button>
                    <div class="grid min">
                        <button class="btn icon" alt="Edit"><span class="material-icons">edit</span></button>
                        <button class="btn icon" alt="Duplicate"><span class="material-icons">file_copy</span></button>
                        <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                    </div>
                </li>
            </ul>
        </div>
    </section>
    <footer>
        <div class="container full grid">
            <div class="left-content">
            </div>
            <div class="right-content">
                <router-link class="btn" v-if="scene.city.public_id !== null" :to="{ name: 'NetworkResults', params: {cityPublicId: scene.city.public_id, scenePublicId: scene.public_id, transportNetworkPublicId: 12 }}" >
                    <span class="material-icons">edit</span>
                    <span>Resultados de red (temporal)</span>
                </router-link>
                <router-link class="btn" v-if="scene.city.public_id !== null" :to="{ name: 'EditScene', params: {cityPublicId: scene.city.public_id, scenePublicId: scene.public_id }}" >
                    <span class="material-icons">edit</span>
                    <span>Edit scene</span>
                </router-link>
                <router-link class="btn" v-if="scene.city.public_id !== null" :to="{ name: 'GlobalResults', params: {cityPublicId: scene.city.public_id, scenePublicId: scene.public_id }}" >
                    <span>View global results</span>
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
            <div><h2>OD Matrix</h2></div>
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
    TransportModeTable
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
            transportmode_set: []
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
