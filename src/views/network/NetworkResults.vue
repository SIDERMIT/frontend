<template>
  <div class="NetworkResults">
    <div class="header">          
        <h1>Optimization results</h1>
        <p>{{ network.name }}</p>
    </div>
    <section>
        <div class="grid title">
            <h2>Overall optimization results</h2>
            <a class="icon-link" @click="showLegendModal=true"><span class="material-icons">help</span></a>
        </div>
    </section>
    <section>
        <NetworkResultTable :rows="[network]" :showNetworkName="false"></NetworkResultTable>
    </section>
    <section>
        <div class="grid-results">
                <div class="title grid full">
                    <div class="grid">
                        <h2>Result details</h2>
                        <a class="icon-link" @click="showDetailLegendModal=true"><span class="material-icons">help</span></a>
                    </div>
                    <button class="btn neuro" @click="setViewAll" v-bind:class="{active: viewAll}"><span class="material-icons">visibility</span><span>View all</span></button>
                </div>
                <div class="graph-view">
                    <div class="search"><input v-model="searchQuery" type="search" placeholder="filter by ROUTE ID ..."></div>
                    <div class="graph-container"><CityGraph :network="scene.city.network_descriptor" :edgeWeights="edgeWeights" :routes="graphRoutes" :showNodeId="true"></CityGraph></div>
                </div>
                <div class="table">
                    <table class="result-details">
                        <thead>
                            <tr>
                                <th><span>Line ID</span></th>
                                <th><a><span>F<br>[𝑣𝑒h/h]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝑓<br>[𝑣𝑒h/h]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝐾<br>[𝑝𝑎𝑥/𝑣𝑒h]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝐵<br>[𝑣𝑒h]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝑡𝑐<br>[𝑚𝑖𝑛]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝐶𝑜<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝜆𝑚𝑖𝑛</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <template v-for="(route, index) in resultQuery">
                            <RouteResultCard :route="route" :showInGraphI="routeVisibility[route.route]['showInGraphI']" :showInGraphR="routeVisibility[route.route]['showInGraphR']" @update-visibility="updateVisibility" v-bind:key="index"></RouteResultCard>
                        </template>
                    </table>
                </div>
        </div>
    </section>
    <footer>
        <div class="container full grid">
            <div class="left-content">
                <p class="info">{{ resultPerRoute.length }} transit lines</p>
            </div>
            <div class="right-content">
                <router-link :to="{ name: 'SceneDetail', params: { cityPublicId: scene.city.public_id, scenePublicId: scene.public_id }}" class="btn">
                    <span class="material-icons">chevron_left</span>
                    <span>Back</span>
                </router-link>
                <button class="btn" @click="downloadData">
                    <span>Download data</span>
                    <span class="material-icons">get_app</span>
                </button>
            </div>
        </div>
    </footer>
    <Modal v-if="showDetailLegendModal" @close="showDetailLegendModal = false" :showBase="false">
        <template slot="title">
            <h2>Terminology</h2>
        </template>
        <template slot="content">
            <div class="table">
                <table>
                    <tbody>
                        <tr>
                            <th><span>Symbol</span></th>
                            <th><span>Unit</span></th>
                            <th><span>Description</span></th>
                        </tr>
                        <tr>
                            <td><span>F</span></td>
                            <td>[𝑣𝑒h/h]</td>
                            <td><span>frequency</span></td>
                        </tr>
                        <tr>
                            <td><span>𝑓</span></td>
                            <td>[𝑣𝑒h/h]</td>
                            <td><span>frequency per line, related with D parameter in transport mode associate to route</span></td>
                        </tr>
                        <tr>
                            <td><span>𝐾</span></td>
                            <td>[𝑝𝑎𝑥/𝑣𝑒h]</td>
                            <td><span>Design boarding size</span></td>
                        </tr>
                        <tr>
                            <td><span>𝐵</span></td>
                            <td>[𝑣𝑒h]</td>
                            <td><span>Vehicle fleet</span></td>
                        </tr>
                        <tr>
                            <td><span>𝑡𝑐</span></td>
                            <td>[𝑚𝑖𝑛]</td>
                            <td><span>Cycle time</span></td>
                        </tr>
                        <tr>
                            <td><span>𝐶O</span></td>
                            <td><span>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span></td>
                            <td><span>Cost of operation</span></td>
                        </tr>
                        <tr>
                            <td><span>𝜆𝑚𝑖𝑛</span></td>
                            <td><span>[%]</span></td>
                            <td><span>minimum boarding fee</span></td>
                        </tr>
                        <tr>
                            <td><span>[𝜆]</span></td>
                            <td>[%]</td>
                            <td><span>Boarding fee</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
    </Modal>
    <NetworkResultLegend :showLegendModal="showLegendModal" @close="showLegendModal=false"></NetworkResultLegend>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import NetworkResultTable from '@/components/NetworkResultTable.vue';
import NetworkResultLegend from '@/components/NetworkResultLegend.vue';
import RouteResultCard from '@/components/RouteResultCard.vue';
import CityGraph from '@/components/CityGraph.vue';
import transportNetworksAPI from '@/api/transportNetworks.api';
import scenesAPI from '@/api/scenes.api';
import axios from 'axios';
import FileSaver from 'file-saver';

export default {
  name: 'NetworkResults',
  components: {
    Modal,
    NetworkResultTable,
    NetworkResultLegend,
    RouteResultCard,
    CityGraph
  },
  data() {
      return {
          showLegendModal: false,
          showDetailLegendModal: false,
          viewAll: false,
          searchQuery: '',
          network: {
              name: ''
          },
          resultPerRoute: [],
          routeVisibility: {},
          scene: {
              city: {
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
        return this.resultPerRoute.filter((item)=>{
          return this.searchQuery.toLowerCase().split(' ').every(v => item.route.toLowerCase().includes(v))
        });
      } else {
        return this.resultPerRoute;
      }
    }
  },
  methods: {
      setData(networkData, sceneData) {
        this.network = networkData.opt_result;
        this.resultPerRoute = networkData.opt_result_per_route;
        this.scene = sceneData;
        this.resultPerRoute.forEach(el => {
          this.$set(this.routeVisibility, el.route, {
            showInGraphI: false,
            showInGraphR: false
          });
        });
        this.setEdgeWeigths();
      },
      setEdgeWeigths() {
        this.scene.city.network_descriptor.edges.forEach(el => {
            if (Object.keys(this.edgeWeights).indexOf(el.source.toString()) < 0) {
                this.$set(this.edgeWeights, el.source, {});
            }
            if (Object.keys(this.edgeWeights[el.source]).indexOf(el.target.toString()) < 0) {
                this.$set(this.edgeWeights[el.source], el.target, {value: 1, routesNumber: 0, hasRoutes: false});
            }
        });
        
        let maxValue = 0;
        this.resultPerRoute.forEach(route => {
            route.optimizationresultperroutedetail_set.forEach(el => {
                this.edgeWeights[el.origin_node][el.destination_node].value += 1;
                this.edgeWeights[el.origin_node][el.destination_node].routesNumber += 1;
                this.edgeWeights[el.origin_node][el.destination_node].hasRoutes = true;
                maxValue = Math.max(maxValue, this.edgeWeights[el.origin_node][el.destination_node].value);
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
      addOrRemoveGraphRouteObj(route, oldShowInGraphValue, newShowInGraphValue, direction) {
        let routeName = route.route + '-' + direction;
        let CurrentRoutePosition = this.graphRoutes.findIndex(el => el.name === routeName);

        if (oldShowInGraphValue && !newShowInGraphValue) {
            // remove
            this.graphRoutes.splice(CurrentRoutePosition, 1);
        } else if (!oldShowInGraphValue && newShowInGraphValue && CurrentRoutePosition == -1) {
            // add
            let currentNodes = new Set();
            let graphRoute = {
                name: routeName,
                nodes: [],
                links: []
            };
            route.optimizationresultperroutedetail_set.forEach(el => {
                if (el.direction === direction) {
                    if (!currentNodes.has(el.origin_node)) {
                        let index = this.scene.city.network_descriptor.nodes.findIndex(node => node.id === el.origin_node);
                        let id =this.scene.city.network_descriptor.nodes[index].id;
                        let x  = this.scene.city.network_descriptor.nodes[index].x;
                        let y = this.scene.city.network_descriptor.nodes[index].y;
                        graphRoute.nodes.push({
                            name: id,
                            value: [x, y, id, id]
                        });
                        currentNodes.add(el.origin_node);
                    }
                    if (!currentNodes.has(el.destination_node)) {
                        let index = this.scene.city.network_descriptor.nodes.findIndex(node => node.id === el.destination_node);
                        let id =this.scene.city.network_descriptor.nodes[index].id;
                        let x  = this.scene.city.network_descriptor.nodes[index].x;
                        let y = this.scene.city.network_descriptor.nodes[index].y;
                        graphRoute.nodes.push({
                            name: id,
                            value: [x, y, id, id]
                        });
                        currentNodes.add(el.destination_node);
                    }
                    graphRoute.links.push({
                        source: el.origin_node.toString(), 
                        target: el.destination_node.toString()
                    });
                }
            });
            this.graphRoutes.push(graphRoute);
        }
      },
      updateVisibility(route, showInGraphI, showInGraphR) {
        this.addOrRemoveGraphRouteObj(route, this.routeVisibility[route.route].showInGraphI, showInGraphI, 'i');
        this.addOrRemoveGraphRouteObj(route, this.routeVisibility[route.route].showInGraphR, showInGraphR, 'r');

        this.routeVisibility[route.route]['showInGraphI'] = showInGraphI;
        this.routeVisibility[route.route]['showInGraphR'] = showInGraphR;
        if (!showInGraphI || !showInGraphR) {
          this.viewAll = false;
        }
      },
      setViewAll() {
        let value = true;
        if (this.viewAll) {
            value = false;
        }

        this.resultPerRoute.forEach(route => {
            this.addOrRemoveGraphRouteObj(route, this.routeVisibility[route.route].showInGraphI, value, 'i');
            this.addOrRemoveGraphRouteObj(route, this.routeVisibility[route.route].showInGraphR, value, 'r');
        });
        Object.keys(this.routeVisibility).forEach(key => {
            this.routeVisibility[key]['showInGraphI'] = value;
            this.routeVisibility[key]['showInGraphR'] = value;
        });
        this.viewAll = value;
      },
      downloadData() {
        let header = ['Line ID', 'F [veh/h]', 'f [veh/h]', 'K [pax/veh]', 'B [veh]', 'tc [min]', 'Co [US$/h-pax]', 'lambda-min', 'direction', 'origin-node', 'destination-node', 'lambda'];
        let data = this.resultPerRoute.map(row => {
            let rows = '';
            let fileRow = [row.route, row.frequency, row.frequency_per_line, row.k, row.b, row.tc, row.co, row.lambda_min];
            row.optimizationresultperroutedetail_set.forEach(el => {
                rows += '\n' + [].concat(fileRow, [el.direction, el.origin_node, el.destination_node, el.lambda_value]).join(',');
            });
            return rows;
        }).reduce((previous, current) => {
            return previous += current;
        }, header);
        let blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "result-data.csv");
      }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.transportNetworkPublicId) {
        axios.all([
            transportNetworksAPI.getResults(to.params.transportNetworkPublicId),
            scenesAPI.getScene(to.params.scenePublicId)    
        ]).then(axios.spread((transportNetworkresponse, sceneResponse) => {
            next(vm => vm.setData(transportNetworkresponse.data, sceneResponse.data));
        }));
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.transportNetworkPublicId) {
        axios.all([
            transportNetworksAPI.getResults(to.params.transportNetworkPublicId),
            scenesAPI.getScene(to.params.scenePublicId)    
        ]).then(axios.spread((transportNetworkresponse, sceneResponse) => {
            this.setData(transportNetworkresponse.data, sceneResponse.data); 
            next();
        }));
    }
  }
}
</script>
