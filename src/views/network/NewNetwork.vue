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
                    <input v-model="searchQuery" type="search" placeholder="search by Line ID ..."/>
                    <button class="btn neuro" :disabled="network.route_set.length === 0" @click="setViewAll" v-bind:class="{active: viewAll}">
                        <span class="material-icons">visibility</span>
                        <span>View all</span>
                    </button>
                </div>

                <div class="empty-box" v-if="network.route_set.length === 0">
                    <p>There is not defined route in this network. You can add a new one or create predefined tours</p>
                    <div class="grid">
                        <button class="btn" @click="addEmptyRoute">
                            <span class="material-icons">add</span>
                            <span>Add transit line</span>
                        </button>
                        <button class="btn" @click="showDefaultRouteCreatorModal=true">
                            <span>Add generic transit lines</span>
                            <span class="material-icons">format_list_bulleted</span>
                        </button>
                    </div>
                </div>
                <div class="linebox-container" v-else>
                    <template v-for="(route, index) in resultQuery">
                        <RouteCard :route="route" :transportModeSet="scene.transportmode_set" :showInGraphI="routeVisibility[route.id]['showInGraphI']" :showInGraphR="routeVisibility[route.id]['showInGraphR']" :checkerMessage="checkerMessages[index]" @update-visibility="updateVisibility" @erase-route="deleteRoute" @node-sequence-change="nodeSequenceChange" v-bind:key="index"/>
                    </template>
                </div>
            </div>
            <div class="graph-container">
                <CityGraph :network="scene.city.network_descriptor" :edgeWeights="edgeWeights" :routes="graphRoutes" :showNodeId="true"></CityGraph>
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
                            <td colspan="2"><span>Name for the specific transit line</span></td>
                        </tr>
                        <tr>
                            <td><span>Mode</span></td>
                            <td><span>Select</span></td>
                            <td colspan="2"><span>Select one of the predefined modes</span></td>
                        </tr>
                        <tr>
                            <td><span>Dir</span></td>
                            <td><span>I o R</span></td>
                            <td colspan="2"><span>I to "in route" direction, R to "return" direction</span></td>
                        </tr>
                        <tr>
                            <td><span>Node sequence</span></td>
                            <td><span>List[Number]</span></td>
                            <td colspan="2"><span>Specific nodes id separated by "," where the transit line will travel</span></td>
                        </tr>
                        <tr>
                            <td><span>Stop sequence</span></td>
                            <td><span>List[Number]</span></td>
                            <td colspan="2"><span>Specific nodes id separated by "," where the transit line will stop</span></td>
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
                <button class="btn" @click="addEmptyRoute">
                    <span class="material-icons">add</span>
                    <span>Add new transit line</span>
                </button>                
                <button class="btn" @click="showDefaultRouteCreatorModal=true">
                    <span>Add generic transit lines</span>
                    <span class="material-icons">format_list_bulleted</span>
                </button>
                <p class="info"><span class="num">{{ network.route_set.length }}</span> transit lines</p>
            </div>
            <div class="right-content">
                <router-link v-if="scene.city.public_id" :to="{ name: 'SceneDetail', params: {cityPublicId: scene.city.public_id, scenePublicId: scene.public_id}}" class="btn">
                    <span class="material-icons">chevron_left</span>
                    <span>Back</span>
                </router-link>
                <button class="btn" @click="updateTransportNetwork">
                    <span>Save Network</span>
                    <span class="material-icons">chevron_right</span>
                </button>
            </div>
        </div>
    </footer>
    <Modal v-if="showWarningModal" @close="showWarningModal = false" :showCancelButton="false" :modalClasses="['warning']">
        <template slot="title">
            <div class="icon"><span class="material-icons">warning</span></div>
            <div><h4>Warning</h4></div>
        </template>
        <p slot="content" v-html="warningModalMessage"></p>
        <template slot="close-button-name">OK</template>
    </Modal>
  </div>
</template>

<script>
import transportNetworksAPI from '@/api/transportNetworks.api';
import CityGraph from '@/components/CityGraph.vue';
import scenesAPI from '@/api/scenes.api';
import Modal from '@/components/Modal.vue';
import RouteCard from '@/components/RouteCard.vue';
import DefaultRouteCreator from '@/components/DefaultRouteCreator.vue';
import axios from 'axios';
import errorMessageMixin from '@/mixins/errorMessageMixin.js'

export default {
  name: 'NewNetwork',
  mixins: [errorMessageMixin],
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
        showWarningModal: false,
        viewAll: false,
        warningModalMessage: '',
        checkerMessages: [],
        routeVisibility: {},
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
                public_id: '',
                network_descriptor: {
                    nodes: [],
                    edges: []
                }
            }
        },
        edgeWeights: {},
        graphRoutes: []
    }
  },
  computed: {
    resultQuery() {
      if(this.searchQuery) {
        return this.network.route_set.filter((item)=>{
          return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.network.route_set;
      }
    }
  },
  methods: {
    setData(transportNetworkData, sceneData) {
        if (transportNetworkData){
            this.network = transportNetworkData;
            this.network.route_set.forEach((el, index) => {
                el.id = this.network.route_set.length - index;
                this.checkerMessages.push(null);
                this.$set(this.routeVisibility, el.id, {
                    showInGraphI: false,
                    showInGraphR: false
                });
            });
        }
        
        this.scene = sceneData;
        this.scene.city.network_descriptor.edges.forEach(el => {
            if (Object.keys(this.edgeWeights).indexOf(el.source.toString()) < 0) {
                this.$set(this.edgeWeights, el.source, {});
            }
            if (Object.keys(this.edgeWeights[el.source]).indexOf(el.target.toString()) < 0) {
                this.$set(this.edgeWeights[el.source], el.target, {value: 1, routesNumber: 0, hasRoutes: false});
            }
        });
        this.setEdgeWeigths();
    },
    setEdgeWeigths() {
        // reset data
        Object.keys(this.edgeWeights).forEach(source => {
            Object.keys(this.edgeWeights[source]).forEach(dest => {
                this.edgeWeights[source][dest].value = 1;
                this.edgeWeights[source][dest].routesNumber = 0;
                this.edgeWeights[source][dest].hasRoutes = false;
            });
        });

        let maxValue = 1;
        this.network.route_set.forEach(route => {
            ['nodes_sequence_i', 'nodes_sequence_r'].forEach(attr => {
                if (route[attr]) {
                    let nodes = route[attr].split(',');
                    if (nodes.length > 1) {
                        for (let i=0;i<nodes.length-1;i++) {
                            if (nodes[i] in this.edgeWeights && nodes[i+1] in this.edgeWeights[nodes[i]]) {
                                this.edgeWeights[nodes[i]][nodes[i+1]].value += 1;
                                this.edgeWeights[nodes[i]][nodes[i+1]].routesNumber += 1;
                                this.edgeWeights[nodes[i]][nodes[i+1]].hasRoutes = true;
                                maxValue = Math.max(maxValue, this.edgeWeights[nodes[i]][nodes[i+1]].value);
                            }
                        }
                    }
                }
            });
        });

        // normalize data
        Object.keys(this.edgeWeights).forEach(source => {
            Object.keys(this.edgeWeights[source]).forEach(dest => {
                let normalizedValue = Math.max(1, this.edgeWeights[source][dest].value / maxValue * 10);
                this.edgeWeights[source][dest].value = normalizedValue;
            });
        });
    },
    nodeSequenceChange(route) {
        this.setEdgeWeigths();
        
        if (this.routeVisibility[route.id].showInGraphI){
            this.addOrRemoveGraphRouteObj(route, true, false, 'direction_1');
            this.addOrRemoveGraphRouteObj(route, false, true, 'direction_1');
        }
        if (this.routeVisibility[route.id].showInGraphR) {
            this.addOrRemoveGraphRouteObj(route, true, false, 'direction_2');
            this.addOrRemoveGraphRouteObj(route, false, true, 'direction_2');
        }
    },
    addOrRemoveGraphRouteObj(route, oldShowInGraphValue, newShowInGraphValue, direction) {
        let CurrentRoutePosition = this.graphRoutes.findIndex(el => el.id === route.id && el.direction === direction);
        if (oldShowInGraphValue && !newShowInGraphValue) {
            // remove
            this.graphRoutes.splice(CurrentRoutePosition, 1);
        } else if (!oldShowInGraphValue && newShowInGraphValue && CurrentRoutePosition == -1) {
            // add
            let routeName = route.name + '-' + direction;
            let currentNodes = new Set();
            let graphRoute = {
                name: routeName,
                nodes: [],
                links: [],
                id: route.id,
                direction: direction
            };
            let attr = direction === 'direction_1'?'nodes_sequence_i':'nodes_sequence_r';
            if (route[attr]) {
                let nodes = route[attr].split(',');
                if (nodes.length > 1) {
                    for (let i=0;i<nodes.length-1;i++) {
                        [nodes[i], nodes[i+1]].forEach(nodeId => {
                            if (!currentNodes.has(nodeId)) {
                                let index = this.scene.city.network_descriptor.nodes.findIndex(node => node.id === Number(nodeId));
                                let id =this.scene.city.network_descriptor.nodes[index].id;
                                let x  = this.scene.city.network_descriptor.nodes[index].x;
                                let y = this.scene.city.network_descriptor.nodes[index].y;
                                graphRoute.nodes.push({
                                    name: id,
                                    value: [x, y, id, id]
                                });
                                currentNodes.add(nodeId);
                            }
                        });
                        graphRoute.links.push({
                            source: nodes[i].toString(), 
                            target: nodes[i+1].toString()
                        });
                    }
                }
            }
            this.graphRoutes.push(graphRoute);
        }
    },
    updateTransportNetwork() {
      let request = null;
      if (!this.network.public_id) {
        request = transportNetworksAPI.createTransportNetwork(this.scene.public_id, this.network.name, this.network.route_set);
      } else {
        request = transportNetworksAPI.updateTransportNetwork(this.network.public_id, this.network.name, this.network.route_set);
      }

      request.then(() => {
        this.$router.push({name: 'SceneDetail', params: {cityPublicId: this.scene.city.public_id, scenePublicId: this.scene.public_id}})
      }).catch((error) => {
        if (Object.prototype.hasOwnProperty.call(error.response.data, 'route_set')) {
            error.response.data.route_set.forEach((el, index) => {
                if (Object.keys(el).length === 0) {
                    this.$set(this.checkerMessages, index, null);
                } else {
                    let dictUserFrendlyKey = {
                        name: "Line ID",
                        nodes_sequence_i: "Node sequence I",
                        nodes_sequence_r: "Node sequence R",
                        stops_sequence_i: "Stop sequence I",
                        stops_sequence_r: "Stop sequence R",
                        transport_mode_public_id: "Mode"
                    }
                    let key = Object.keys(el)[0];
                    let firstMessage = dictUserFrendlyKey[key] + ": " + el[key];
                    this.$set(this.checkerMessages, index, firstMessage);
                }
            });
        } else {
            let message = this.getErrorMessage(error.response.data);
            this.warningModalMessage = message;
            this.showWarningModal = true;
        }
      });
    },
    createRoutes(routes){
      routes.forEach(route => {
        route.id = this.network.route_set.length > 0 ? this.network.route_set[0].id + 1: 1;
        this.network.route_set.unshift(route);
        this.checkerMessages.unshift(null);
        this.$set(this.routeVisibility, route.id, {
            showInGraphI: false,
            showInGraphR: false
        });
      });
      this.setEdgeWeigths();
    },
    deleteRoute(route) {
      let routeIndex = this.network.route_set.findIndex(el => el.id === route.id);
      this.network.route_set.splice(routeIndex, 1);
      this.checkerMessages.splice(routeIndex, 1);

      this.addOrRemoveGraphRouteObj(route, true, false, 'direction_1');
      this.addOrRemoveGraphRouteObj(route, true, false, 'direction_2');
      delete this.routeVisibility[route.id];
      this.setEdgeWeigths();
    },
    addEmptyRoute(){
        let emptyRoute = {
            id: this.network.route_set.length > 0 ? this.network.route_set[0].id + 1: 1,
            name: null,
            transport_mode_public_id: null,
            nodes_sequence_i: null,
            nodes_sequence_r: null,
            stops_sequence_i: null,
            stops_sequence_r: null,
            type: 1,
            collapse: false
        };
        this.network.route_set.unshift(emptyRoute);
        this.checkerMessages.unshift(null);
        this.$set(this.routeVisibility, emptyRoute.id, {
            showInGraphI: false,
            showInGraphR: false
        });
    },
    updateVisibility(route, showInGraphI, showInGraphR) {
        this.addOrRemoveGraphRouteObj(route, this.routeVisibility[route.id].showInGraphI, showInGraphI, 'direction_1');
        this.addOrRemoveGraphRouteObj(route, this.routeVisibility[route.id].showInGraphR, showInGraphR, 'direction_2');

        this.routeVisibility[route.id].showInGraphI = showInGraphI;
        this.routeVisibility[route.id].showInGraphR = showInGraphR;
        if (!showInGraphI || !showInGraphR) {
            this.viewAll = false;
        }
    },
    setViewAll() {
        let value = true;
        if (this.viewAll) {
            value = false;
        }

        this.network.route_set.forEach(route => {
            this.addOrRemoveGraphRouteObj(route, this.routeVisibility[route.id].showInGraphI, value, 'direction_1');
            this.addOrRemoveGraphRouteObj(route, this.routeVisibility[route.id].showInGraphR, value, 'direction_2');
        });

        Object.keys(this.routeVisibility).forEach(key => {
            this.routeVisibility[Number(key)].showInGraphI = value;
            this.routeVisibility[Number(key)].showInGraphR = value;
        });
        this.viewAll = value;
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.transportNetworkPublicId) {
        axios.all([
            transportNetworksAPI.getTransportNetwork(to.params.transportNetworkPublicId),
            scenesAPI.getScene(to.params.scenePublicId)    
        ]).then(axios.spread((transportNetworkresponse, sceneResponse) => {
            next(vm => vm.setData(transportNetworkresponse.data, sceneResponse.data));
        }));
    } else {
        scenesAPI.getScene(to.params.scenePublicId).then(response => {
            next(vm => {
                vm.setData(null, response.data);
                vm.setEdgeWeigths();
            });
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.transportNetworkPublicId) {
        axios.all([
            transportNetworksAPI.getTransportNetwork(to.params.transportNetworkPublicId),
            scenesAPI.getScene(to.params.scenePublicId)    
        ]).then(axios.spread((transportNetworkresponse, sceneResponse) => {
            this.setData(transportNetworkresponse.data, sceneResponse.data);
            next();
        }));
    } else {
        scenesAPI.getScene(to.params.scenePublicId).then(response => {
            this.setData(null, response.data);
            this.setEdgeWeigths();
            next();
        });
    }
  }
}
</script>
