<template>
  <div class="NewNetwork">
    <div class="header">          
        <h1>New transportation network</h1>
        <p>{{ scene.name }}</p>
    </div>
    <section class="new-network">
        <div class="grid input-name">
            <h2>Name your network</h2>
            <input v-model="network.name" v-bind:class="{ error: (network.name === null || network.name === '') }" type="text" class="text-left" placeholder="Can't be empty"/>
        </div>
    </section>
    <section class="network-information">
        <h2>Transport network information</h2>
        <div class="subtitle">
            <div class="grid">
                <h4>Add details of each transit line</h4>
                <a class="icon-link" @click="showLegendModal = true" ><span class="material-icons">help</span></a>
            </div>
        </div>
        <div class="line-details">
            <div>
                <div class="grid search-bar">
                    <input v-model="search" type="search"/>
                    <button class="btn neuro" disabled>
                        <span class="material-icons">visibility</span>
                        <span>View all</span>
                    </button>
                </div>

                <div class="empty-box" v-if="network.route_set.length === 0">
                    <p>There is not defined route in this network. You can add a new one or create predefined tours</p>
                    <div class="grid">
                        <button class="btn">
                            <span class="material-icons">add</span>
                            <span>Add transit line</span>
                        </button>
                        <button class="btn" @click="showDefaultRouteCreatorModal=true">
                            <span>Add default transit lines</span>
                            <span class="material-icons">format_list_bulleted</span>
                        </button>
                    </div>
                </div>
                <div class="linebox-container" v-else>
                    <div class="linebox">
                        <div class="linebox-header">
                            <div class="line-input">
                                <h4>Line ID</h4>
                                <input type="text">
                            </div>
                            <div class="line-input">
                                <h4>Mode</h4>
                                <select>
                                    <option selected>bus 1</option>
                                    <option>metro 1</option>
                                </select>
                            </div>
                            <div class="grid min">
                                <button class="btn icon" alt="Show"><span class="material-icons">visibility_off</span></button>
                                <button class="btn icon" alt="Open"><span class="material-icons">arrow_drop_down</span></button>
                            </div>
                        </div>
                        <div class="linebox-anim">
                            <div class="linebox-content">
                                <div class="table min">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th colspan="1"><span>Dir</span></th>
                                                <th colspan="4"><span>Node sequence</span></th>
                                                <th colspan="4"><span>Stop sequence</span></th>
                                                <th colspan="1">&nbsp;</th>
                                            </tr>
                                            <tr>
                                                <th colspan="1"><span>I</span></th>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="1"><button class="btn icon flat" alt="Show"><span class="material-icons">visibility_off</span></button></td>
                                            </tr>
                                            <tr>
                                                <th colspan="1"><span>R</span></th>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="1"><button class="btn icon flat active" alt="Hide"><span class="material-icons">visibility</span></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="checker">
                                    <div></div>
                                    <button class="btn neuro"><span>Delete</span><span class="material-icons">delete</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="linebox">
                        <div class="linebox-header">
                            <div class="line-input">
                                <h4>Line ID</h4>
                                <input type="text">
                            </div>
                            <div class="line-input">
                                <h4>Mode</h4>
                                <select>
                                    <option selected>bus 1</option>
                                    <option>metro 1</option>
                                </select>
                            </div>
                            <div class="grid min">
                                <button class="btn icon active" alt="Show all"><span class="material-icons">vignette</span></button>
                                <button class="btn icon" alt="Open"><span class="material-icons">arrow_drop_down</span></button>
                            </div>
                        </div>
                        <div class="linebox-anim open">
                            <div class="linebox-content">
                                <div class="table min">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th colspan="1"><span>Dir</span></th>
                                                <th colspan="4"><span>Node sequence</span></th>
                                                <th colspan="4"><span>Stop sequence</span></th>
                                                <th colspan="1">&nbsp;</th>
                                            </tr>
                                            <tr>
                                                <th colspan="1"><span>I</span></th>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="1"><button class="btn icon flat" alt="Show"><span class="material-icons">visibility_off</span></button></td>
                                            </tr>
                                            <tr>
                                                <th colspan="1"><span>R</span></th>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="1"><button class="btn icon flat active" alt="Hide"><span class="material-icons">visibility</span></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="checker">
                                    <div></div>
                                    <button class="btn neuro"><span>Delete</span><span class="material-icons">delete</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="linebox">
                        <div class="linebox-header">
                            <div class="line-input">
                                <h4>Line ID</h4>
                                <input type="text">
                            </div>
                            <div class="line-input">
                                <h4>Mode</h4>
                                <select>
                                    <option selected>bus 1</option>
                                    <option>metro 1</option>
                                </select>
                            </div>
                            <div class="grid min">
                                <button class="btn icon active" alt="Show all"><span class="material-icons">vignette</span></button>
                                <button class="btn icon" alt="Open"><span class="material-icons">arrow_drop_down</span></button>
                            </div>
                        </div>
                        <div class="linebox-anim open">
                            <div class="linebox-content">
                                <div class="table min">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th colspan="1"><span>Dir</span></th>
                                                <th colspan="4"><span>Node sequence</span></th>
                                                <th colspan="4"><span>Stop sequence</span></th>
                                                <th colspan="1">&nbsp;</th>
                                            </tr>
                                            <tr>
                                                <th colspan="1"><span>I</span></th>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="1"><button class="btn icon flat" alt="Show"><span class="material-icons">visibility_off</span></button></td>
                                            </tr>
                                            <tr>
                                                <th colspan="1"><span>R</span></th>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="1"><button class="btn icon flat active" alt="Hide"><span class="material-icons">visibility</span></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="checker">
                                    <div></div>
                                    <button class="btn neuro"><span>Delete</span><span class="material-icons">delete</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="graph-container">
                <CityGraph :network="scene.city.network_descriptor"></CityGraph>
            </div>
        </div>
    </section>
    <Modal v-if="showDefaultRouteCreatorModal" @close="showDefaultRouteCreatorModal = false" @ok="createDefaultRoutes()" :isWarning="false">
        <template slot="title">
            <div class="modal-title">
                <h2>Add default transit lines</h2>
            </div>
        </template>
        <template slot="content">
            <div class="default-lines">
                <div class="default-line-row" v-for="(defaultRoute, index) in defaultRoutes" v-bind:key="defaultRoute.id">
                    <div class="options">
                        <div class="mode">
                            <h4>Mode</h4>
                            <select v-model="defaultRoute.transport_mode">
                                <option selected disabled>Choose one</option>
                                <option v-for="transportMode in transport_modes" v-bind:value="transportMode.public_id" v-bind:key="transportMode.public_id">{{ transportMode.name }}</option>
                            </select>
                        </div>
                        <div class="type">
                            <h4>Type</h4>
                            <select v-model="defaultRoute.type">
                                <option selected disabled>Choose one</option>
                                <option v-for="defaultRouteType in defaultRouteTypes" v-bind:value="defaultRouteType" v-bind:key="defaultRouteType">{{ defaultRouteType }}</option>
                            </select>
                        </div>
                        <div class="zones">
                            <h4>Zone jumps</h4>
                            <div class="counter">
                                <input v-model="defaultRoute.zoneJumps" type="number" class="number" placeholder="0">
                                <button class="num plus"><span class="material-icons">arrow_drop_up</span></button>
                                <button class="num less"><span class="material-icons">arrow_drop_down</span></button>
                            </div>
                        </div>
                        <div class="extension">
                            <h4>Extension</h4>
                            <label class="switch big">
                                <input v-model="defaultRoute.extension" type="checkbox">
                                <div class="switch-body">
                                    <span class="text-on">Large</span>
                                    <span class="text-off">Short</span>
                                </div>
                            </label>
                        </div>
                        <div class="exclusive">
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
                <button class="btn" @click="addDefaultTemplateRoute()">
                    <span class="material-icons">add</span>
                    <span>Add row</span>
                </button>
            </div>
            <div class="right-content">
                <button class="btn red" @click="showDefaultRouteCreatorModal = false"><span>Cancel</span></button>
                <button class="btn" @click="createDefaultRoutes()"><span>Generate</span></button>
            </div>
        </template>
        <template slot="close-button-name">Proceed</template>
    </Modal>
    <Modal v-if="showLegendModal" @close="showLegendModal = false" :showBase="false">
        <template slot="title">
            <h2>modal</h2>
        </template>
        <template slot="content">
            <p>table</p>
            <div class="table">
                <table>
                    <tbody>
                        <tr>
                            <th><span>Symbol</span></th>
                            <th><span>Unit</span></th>
                            <th><span>Description</span></th>
                        </tr>
                        <tr>
                            <td><span>𝑛</span></td>
                            <td>&nbsp;</td>
                            <td><span>Number of zones</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
    </Modal>
    <footer>
        <div class="container full grid">
            <div class="left-content">
                <button class="btn">
                    <span class="material-icons">add</span>
                    <span>Add new transit line</span>
                </button>
                <p class="info">{{ network.route_set.length }} total transit lines</p>
            </div>
            <div class="right-content">
                <button class="btn" @click="showDefaultRouteCreatorModal=true">
                    <span>Add default transit lines</span>
                    <span class="material-icons">format_list_bulleted</span>
                </button>
                <button class="btn" @click="createTransportNetwork">
                    <span>Save</span>
                    <span class="material-icons">chevron_right</span>
                </button>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
import transportNetworksAPI from '@/api/transportNetworks.api';
import CityGraph from '@/components/CityGraph.vue';
import scenesAPI from '@/api/scenes.api';
import Modal from '@/components/Modal.vue'

export default {
  name: 'NewNetwork',
  components: {
    CityGraph,
    Modal
  },
  data() {
    return {
        showDefaultRouteCreatorModal: false,
        showLegendModal: false,
        search: '',
        defaultRouteTypes: ['Tangential','Diametral','Radial','Feeder'],
        defaultRoutes: [
            {id:0, transport_mode: 'd481df32-a416-44e1-9e21-330c19e1b51a', type: 'Radial', zoneJumps: 10, extension: false, odExclusive: true}
        ],
        transport_modes: [
            {name: "metro", public_id: "d481df32-a416-44e1-9e21-330c19e1b51a"}
        ],
        network: {
            name: null,
            route_set: []
            
        },
        scene: {
            name: null,
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
      setData(transportNetworkData) {
        console.log(transportNetworkData);
      },
      createDefaultRoutes() {

      },
      createTransportNetwork() {

      },
      addDefaultTemplateRoute() {
        let defaultTemplateRoute = {
            transport_mode: null,
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
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.transportNetworkPublicId) {
      transportNetworksAPI.getTransportNetwork(to.params.transportNetworkPublicId).then(response => (next(vm => vm.setData(response.data))));
    } else {
        // fill city data
        scenesAPI.getScene(to.params.scenePublicId).then(response => {
            next(vm => vm.scene = response.data);
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.transportNetworkPublicId) {
        this.scene = {};
        transportNetworksAPI.getTransportNetwork(to.params.transportNetworkPublicId).then(response => {
            this.setData(response.data); 
            next();
        });
    } else {
        // fill city data
        scenesAPI.getScene(to.params.scenePublicId).then(response => {
            this.scene = response.data;
            next();
        });
    }
  }
}
</script>
