<template>
    <div class="NewCity step1">
        <div class="header">          
            <h1>{{ pageTitle }}</h1>
        </div>
        <section class="step1-definition">
            <div class="grid input-name">
                <h2>Name your city</h2>
                <input v-model="newCity.name" v-bind:class="{ error: newCity.name === null || newCity.name === '' }" type="text" placeholder="Can't be empty"/>
            </div>
            <h2>Definition of city by parameters</h2>
            <div class="grid center subtitle">
                <div class="grid center">
                    <h4>Enter parameters</h4>
                    <a class="icon-link" @click="showLegendModal = true"><span class="material-icons">help</span></a>
                </div>
                <div>
                    <button class="btn" @click="showImportModal = true"><span class="material-icons">publish</span><span>Import pajek file</span></button>
                </div>
            </div>
            <div class="table">
                <div class="table-title">
                    <h4>Simetric city's parameters</h4>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th><span>𝑛</span></th>
                            <th><span>𝑃[𝑘𝑚]</span></th>
                            <th><span>𝐿[𝑘𝑚]</span></th>
                            <th><span>𝑔</span></th>
                        </tr>
                        <tr>
                            <td><input v-model="newCity.n" :disabled="!enableParameters" v-bind:class="{ error: (newCity.n === null || newCity.n === '') && enableParameters }" type="text" ref="nInput" placeholder="-" /></td>
                            <td><input v-model="newCity.p" :disabled="!enableParameters" v-bind:class="{ error: (newCity.p === null || newCity.p === '') && enableParameters }" type="text"  placeholder="-"/></td>
                            <td><input v-model="newCity.l" :disabled="!enableParameters" v-bind:class="{ error: (newCity.l === null || newCity.l === '') && enableParameters }" type="text"  placeholder="-"/></td>
                            <td><input v-model="newCity.g" :disabled="!enableParameters" v-bind:class="{ error: (newCity.g === null || newCity.g === '') && enableParameters }" type="text"  placeholder="-"/></td>
                        </tr>
                    </tbody>
                </table>
                <Checker v-if="parameterValidator.show" :isError="parameterValidator.isError" :message="parameterValidator.message" />
            </div>
            <div class="flex flex-end" v-if="!enableParameters">
                <button class="btn" @click="showEditParameterModal = true"><span class="material-icons">publish</span><span>Edit parameters</span></button>
            </div>
            <button class="btn full main" @click="buildGraph" :disabled="!enableParameters" >Build graph</button>
        </section>
        <section class="step1-graph-editor" v-if="showEditorAndGraph">
            <h2>Definition of the city by nodes and arcs</h2>
            <h4>Editor</h4>
            <div class="grid g2">
                <div><textarea class="editor-container" v-model="newCity.graph" @input="pajekChange" /></div>
                <div class="graph-container"><CityGraph :network="newCity.network_descriptor"></CityGraph></div>
            </div>
            <div class="checker">
                <Checker v-if="graphValidator.show" :isError="graphValidator.isError" :message="graphValidator.message" />
                <button class="btn" @click="downloadPajekFile"><span class="material-icons">get_app</span><span>Download pajek</span></button>
            </div>
        </section>
        <footer>
            <div class="container full grid">
                <div class="left-content">
                </div>
                <div class="right-content">
                    <button class="btn" @click="updateCity">
                        <span>{{ nextButtonName }}</span>
                        <span class="material-icons">chevron_right</span>
                    </button>
                </div>
            </div>
        </footer>
        <Modal v-if="showLegendModal" @close="showLegendModal = false" :showBase="false">
            <template slot="title">
                <h2>Terminology</h2>
            </template>
            <template slot="content">
                <p>The parameters 𝑛, 𝑃, 𝐿 and 𝑔 are required to build the city, the asymmetries are optional</p>
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
                            <tr>
                                <td><span>𝑃</span></td>
                                <td>[𝑘𝑚]</td>
                                <td><span>Total width represented by each arc</span></td>
                            </tr>
                            <tr>
                                <td><span>𝐿</span></td>
                                <td>[𝑘𝑚]</td>
                                <td><span>Distance from SC to the geometrical city center C</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑔</span></td>
                                <td>&nbsp;</td>
                                <td><span>Ratio between the distances P-SC and SC- CBD</span></td>
                            </tr>
                            <tr>
                                <td><span>𝜂</span></td>
                                <td>&nbsp;</td>
                                <td><span>Eccentricity of the CBD</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
        </Modal>
        <Modal v-if="showWarningModal" @close="showWarningModal = false" :showCancelButton="modalData.showCancelButton" :modalClasses="['warning']">
            <template slot="title">
                <div class="icon"><span class="material-icons">warning</span></div>
                <div><h4>Warning</h4></div>
            </template>
            <p slot="content" v-html="modalData.message"></p>
            <template slot="close-button-name">{{ modalData.closeButtonName }}</template>
        </Modal>
        <Modal v-if="showEditParameterModal" @cancel="showEditParameterModal = false" @close="showEditParameterModal = false" @ok="editParameterAction" :showCancelButton="true">
            <template slot="title">
                <div class="icon"><span class="material-icons">warning</span></div>
                <div><h4>Warning</h4></div>
            </template>
            <p slot="content">Editing city parameters will delete previous data. Do you want to continue?</p>
            <template slot="close-button-name">Proceed</template>
        </Modal>
        <Modal v-if="showImportModal" @close="showImportModal = false">
            <template slot="title">
                <h2>Import pajek file</h2>
            </template>
            <template slot="content">
                <p>The file must have this setup:</p>
                <code>*nodes n_of_nodes</code>
                <p>Then, after each row must have the next fields, separate by space:</p>
                <code>[id] [name] [x] [y] [type] [zone_id] [width]</code>
            </template>

            <template slot="base">                    
                <FileReader @load="importPajekFile($event)"></FileReader>
            </template>
        </Modal>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import CityGraph from '@/components/CityGraph.vue';
import citiesAPI from '@/api/cities.api';
import FileSaver from 'file-saver';
import FileReader from '@/components/FileReader.vue';
import errorMessageMixin from '@/mixins/errorMessageMixin.js';
import Checker from '@/components/Checker.vue';
import { debounce } from "debounce";

export default {
  name: 'NewCity',
  mixins: [errorMessageMixin],
  components: {
    Modal,
    FileReader,
    CityGraph,
    Checker
  },
  data() {
      return {
          pageTitle: 'Add new city',
          nextButtonName: 'Next',
          isNew: true,
          enableParameters: true,
          showEditParameterModal: false,
          showWarningModal: false,
          showLegendModal: false,
          showImportModal: false,
          parameterValidator: {
            show: false,
            message: '',
            isError: false,
          },
          graphValidator: {
            show: false,
            message: '',
            isError: false
          },
          modalData: {
            showCancelButton: true,
            closeButtonName: 'Save',
            message: ''
          },
          showEditorAndGraph: false,
          newCity: {
              name: null, 
              n: null,
              p: null,
              l: null,
              g: null,
              graph: null,
              network_descriptor: {
                  nodes: [],
                  edges: []
              }
          }
      }
  },
  methods: {
      buildGraph() {
          let n = this.newCity.n;
          let p = this.newCity.p;
          let l = this.newCity.l;
          let g = this.newCity.g;

          // create graph file from parameters
          citiesAPI.getPajekFile(n, p, l, g)
          .then(response => {
            this.newCity.graph = response.data.pajek;
            this.newCity.network_descriptor = response.data.network;
            this.showEditorAndGraph = true;
            this.parameterValidator.message = 'Table correctly defined';
            this.parameterValidator.show = true;
            this.parameterValidator.icon = 'check';
          }).catch(error => {
              let message = error.response.data.detail;
              this.parameterValidator.message = message;
              this.parameterValidator.show = true;
              this.parameterValidator.icon = 'warning';
          });
      },
      updateCity() {
        let request = null;
        if (this.isNew) {
            request = citiesAPI.createCity(this.newCity.name, this.newCity.n, this.newCity.p, this.newCity.l, this.newCity.g, this.newCity.graph);
        } else {
            let data = {name: this.newCity.name, n: this.newCity.n, p: this.newCity.p, l: this.newCity.l, g: this.newCity.g, graph: this.newCity.graph, step: 'step1'}
            request = citiesAPI.updateCity(this.newCity.public_id, data);
        }
        
        request.then(response => {
            this.$router.push({name: 'NewCityStep2', params: {cityPublicId: response.data.public_id}})
        }).catch(error => {
            let message = this.getErrorMessage(error.response.data);
            this.modalData.message = message;
            this.modalData.showCancelButton = false
            this.modalData.closeButtonName = 'OK'
            this.showWarningModal = true;
        });
      },
      downloadPajekFile() {
        let blob = new Blob([this.newCity.graph], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "city-graph.net");
      },
      importPajekFile(fileContent) {
          citiesAPI.getGraphFromPajekFile(fileContent).then(response => {
            this.newCity.n = response.data.n;
            this.newCity.p = response.data.p;
            this.newCity.l = response.data.l;
            this.newCity.g = response.data.g;
            this.newCity.graph = fileContent;
            this.newCity.network_descriptor = response.data.network;
            this.showImportModal = false
            this.showEditorAndGraph = true;
            this.enableParameters = false;
          }).catch(error => {
            this.graphValidator.show = true;
            this.graphValidator.isError = true;
            this.graphValidator.message = error.response.data.detail;
          });
      },
      pajekChange: debounce(function() {
          citiesAPI.getGraphFromPajekFile(this.newCity.graph).then(response => {
            this.newCity.n = response.data.n;
            this.newCity.p = response.data.p;
            this.newCity.l = response.data.l;
            this.newCity.g = response.data.g;
            this.enableParameters = false;
            this.newCity.network_descriptor = response.data.network;
            
            this.graphValidator.show = true;
            this.graphValidator.isError = false;
            this.graphValidator.message = 'File correctly defined';
          }).catch(error => {
            this.graphValidator.show = true;
            this.graphValidator.isError = true;
            this.graphValidator.message = error.response.data.detail;
          });
      }, 300),
      editParameterAction() {
        this.enableParameters = true
        this.showEditorAndGraph = false;
        this.newCity.graph = null;
        this.showEditParameterModal = false;
        this.$nextTick(() => {
            this.$refs.nInput.focus();
        });
      },
      setData(city) {
        this.pageTitle = 'Edit city';
        this.nextButtonName = 'Save and continue';
        this.isNew = false;
        this.newCity = city;
        if (this.newCity.n === null) {
            this.enableParameters = false
        }
        this.showEditorAndGraph = true;
      }
  }, 
  beforeRouteEnter (to, from, next) {
    if (to.params.cityPublicId) {
      citiesAPI.getCity(to.params.cityPublicId).then(response => (next(vm => vm.setData(response.data))));
    } else {
        next();
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.cityPublicId) {
      this.newCity = {};
      citiesAPI.getCity(to.params.cityPublicId).then(response => {
        this.setData(response.data); 
        next();
      });
    } else {
        next();
    }
  }
}
</script>
