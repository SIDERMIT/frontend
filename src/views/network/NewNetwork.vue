<template>
  <div class="NewNetwork">
    <div class="header">          
        <h1>{{ network.public_id? "Edit": "New" }} transportation network</h1>
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
                    <input v-model="searchQuery" type="search"/>
                    <button class="btn neuro" :disabled="network.route_set.length === 0">
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
                    <template v-for="route in resultQuery">
                    <RouteCard :route="route" :transportModeSet="scene.transportmode_set" @erase-route="deleteRoute" v-bind:key="route.route_id"/>
                    </template>
                </div>
            </div>
            <div class="graph-container">
                <CityGraph :network="scene.city.network_descriptor" :showNodeId="true"></CityGraph>
            </div>
        </div>
    </section>
    <DefaultRouteCreator :route_set="network.route_set" :transportmode_set="scene.transportmode_set" :scene_public_id="scene.public_id" :show="showDefaultRouteCreatorModal" @close="showDefaultRouteCreatorModal=false" @routes-created="createRoutes" />
    <Modal v-if="showLegendModal" @close="showLegendModal = false" :showBase="false">
        <template slot="title">
            <h2>Terminology</h2>
        </template>
        <template slot="content">
            <div class="table">
                <table>
                    <tbody>
                        <tr>
                            <th><span>Name</span></th>
                            <th><span>Unit</span></th>
                            <th colspan="2"><span>Description</span></th>
                        </tr>
                        <tr>
                            <td><span>Line ID</span></td>
                            <td><span>Any</span></td>
                            <td colspan="2"><span>Name for the specific transport line</span></td>
                        </tr>
                        <tr>
                            <td><span>Mode</span></td>
                            <td><span>Select</span></td>
                            <td colspan="2"><span>Select one of the predefined modes</span></td>
                        </tr>
                        <tr>
                            <td><span>Dir</span></td>
                            <td><span>I</span></td>
                            <td colspan="2"><span>Direction I of the line</span></td>
                        </tr>
                        <tr>
                            <td><span>Dir</span></td>
                            <td><span>R</span></td>
                            <td colspan="2"><span>Direction R of the line</span></td>
                        </tr>
                        <tr>
                            <td><span>Node sequence</span></td>
                            <td><span>Number</span></td>
                            <td colspan="2"><span>Specific nodes where the transit line will travel</span></td>
                        </tr>
                        <tr>
                            <td><span>Stop sequence</span></td>
                            <td><span>Number</span></td>
                            <td colspan="2"><span>Specific nodes where the transit line will stop</span></td>
                        </tr>
                        <tr>
                            <td><span>Graph visibility</span></td>
                            <td><span class="material-icons color-link">visibility</span></td>
                            <td colspan="2"><span>Turn on/off to show the current line in the graph view</span></td>
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
                <button class="btn" @click="updateTransportNetwork">
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
import Modal from '@/components/Modal.vue';
import RouteCard from '@/components/RouteCard.vue';
import DefaultRouteCreator from '@/components/DefaultRouteCreator.vue';

export default {
  name: 'NewNetwork',
  components: {
    CityGraph,
    Modal,
    RouteCard,
    DefaultRouteCreator
  },
  data() {
    return {
        showDefaultRouteCreatorModal: false,
        showLegendModal: false,
        searchQuery: '',
        network: {
            public_id: null,
            name: null,
            route_set: []
        },
        scene: {
            public_id: '',
            name: null,
            transportmode_set: [],
            city: {
                network_descriptor: {
                    nodes: [],
                    edges: []
                }
            }
        }
    }
  },
  computed: {
    resultQuery() {
      if(this.searchQuery) {
        return this.network.route_set.filter((item)=>{
          return this.searchQuery.toLowerCase().split(' ').every(v => item.route_id.toLowerCase().includes(v))
        });
      } else {
        return this.network.route_set;
      }
    }
  },
  methods: {
    setData(transportNetworkData) {
      this.network = transportNetworkData;
    },
    updateTransportNetwork() {
      console.log("updateTransportNetwork");

      let request = null;
      if (!this.network.public_id) {
        request = transportNetworksAPI.createTransportNetwork(this.scene.public_id, this.network.name, this.network.route_set);
      } else {
        request = transportNetworksAPI.updateTransportNetwork(this.network.public_id, this.network.name, this.network.route_set);
      }
      request.then(response => {
          console.log(response.data);
        this.$router.push({name: 'NetworkDetail', params: {transportNetworkPublicId: response.data.public_id}})
      }).catch(error => {
        console.log(error.response.data);
        let message = this.getErrorMessage(error.response.data);
        this.modalData.message = message;
        this.modalData.showCancelButton = false
        this.modalData.closeButtonName = 'OK'
        this.showWarningModal = true;
      });
    },
    createRoutes(routes){
      routes.forEach(route => {
        this.network.route_set.push(route);
        this.scene = null;
      });
    },
    deleteRoute(route) {
      let routeIndex = this.network.route_set.findIndex(el => el.route_id === route.route_id);
      this.network.route_set.splice(routeIndex, 1);
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
