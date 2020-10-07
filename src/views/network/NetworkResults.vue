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
                    <button class="btn neuro"><span class="material-icons">visibility</span><span>View all</span></button>
                </div>
                <div class="graph-view">
                    <div class="search"><input type="search"></div>
                    <div class="graph-container"><CityGraph :network="scene.city.network_descriptor" :showNodeId="true"></CityGraph></div>
                </div>
                <div class="table">
                    <table class="result-details">
                        <thead>
                            <tr>
                                <th><span>Route ID</span></th>
                                <th><a><span>𝑓<br>[𝑣𝑒h/h]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝐾<br>[𝑝𝑎𝑥/𝑣𝑒h]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝐵<br>[𝑣𝑒h]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝑡𝑐<br>[𝑚𝑖𝑛]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝐶𝑜<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝜆𝑚𝑖𝑛</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <template v-for="(route, index) in resultPerRoute">
                            <RouteResultCard :route="route" v-bind:key="index"></RouteResultCard>
                        </template>
                    </table>
                </div>
        </div>
    </section>
    <footer>
        <div class="container full grid">
            <div class="left-content">
                <p class="info">300 registered services</p>
            </div>
            <div class="right-content">
                <button class="btn">
                    <span class="material-icons">chevron_left</span>
                    <span>Back</span>
                </button>
                <button class="btn">
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
                            <td><span>𝑓</span></td>
                            <td>[𝑣𝑒h/h]</td>
                            <td><span>frequency</span></td>
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
                            <td><span>𝐶𝑜</span></td>
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
          network: {
              name: ''
          },
          resultPerRoute: [],
          scene: {
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
      setData(networkData, sceneData) {
          this.network = networkData.opt_result;
          this.resultPerRoute = networkData.opt_result_per_route;
          this.scene = sceneData;
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
