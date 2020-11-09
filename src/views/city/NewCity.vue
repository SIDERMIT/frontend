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
                            <th><span>𝜂</span></th>
                            <th><span>𝜂 zone</span></th>
                            <th><span>angles</span></th>
                            <th><span>G<sub>i</sub></span></th>
                            <th><span>H<sub>i</sub></span></th>
                        </tr>
                        <tr>
                            <td><input v-model="newCity.n" :disabled="!enableParameters" v-bind:class="{ error: (newCity.n === null || newCity.n === '') && enableParameters }" type="text" ref="nInput" placeholder="-" /></td>
                            <td><input v-model="newCity.p" :disabled="!enableParameters" v-bind:class="{ error: (newCity.p === null || newCity.p === '') && enableParameters }" type="text"  placeholder="-"/></td>
                            <td><input v-model="newCity.l" :disabled="!enableParameters" v-bind:class="{ error: (newCity.l === null || newCity.l === '') && enableParameters }" type="text"  placeholder="-"/></td>
                            <td><input v-model="newCity.g" :disabled="!enableParameters" v-bind:class="{ error: (newCity.g === null || newCity.g === '') && enableParameters }" type="text"  placeholder="-"/></td>
                            <td><input v-model="newCity.etha" :disabled="!enableParameters" v-bind:class="{ error: (newCity.etha === null || newCity.etha === '') && enableParameters }" type="text"  placeholder="-"/></td>
                            <td><input v-model="newCity.etha_zone" :disabled="!enableParameters" v-bind:class="{ error: (newCity.etha_zone === null || newCity.etha_zone === '') && enableParameters }" type="text"  placeholder="-"/></td>
                            <td><input v-model="newCity.angles" :disabled="!enableParameters" v-bind:class="{ error: (newCity.angles === null || newCity.angles === '') && enableParameters }" type="text"  placeholder="-"/></td>
                            <td><input v-model="newCity.gi" :disabled="!enableParameters" v-bind:class="{ error: (newCity.gi === null || newCity.gi === '') && enableParameters }" type="text"  placeholder="-"/></td>
                            <td><input v-model="newCity.hi" :disabled="!enableParameters" v-bind:class="{ error: (newCity.hi === null || newCity.hi === '') && enableParameters }" type="text"  placeholder="-"/></td>
                        </tr>
                    </tbody>
                </table>
                <Checker v-if="parameterValidator.show" :isError="parameterValidator.isError" :message="parameterValidator.message" />
            </div>
            <div class="flex flex-end" v-if="!enableParameters">
                <button class="btn" @click="showEditParameterModal = true"><span class="material-icons">publish</span><span>Edit parameters</span></button>
            </div>
            <button class="btn full main" @click="buildGraph" :disabled="!enableParameters" >{{ showEditorAndGraph?'Update':'Build' }} graph</button>
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
                    <router-link class="btn" :to="{name: 'Dashboard'}">
                        <span>Cancel</span>
                        <span class="material-icons">chevron_left</span>
                    </router-link>
                    <button class="btn" @click="updateCity">
                        <span>{{ nextButtonName }}</span>
                        <span class="material-icons">chevron_right</span>
                    </button>
                </div>
            </div>
        </footer>
        <GraphParametersLegend :show="showLegendModal" @close="showLegendModal=false"></GraphParametersLegend>
        <Modal v-if="showWarningModal" @close="showWarningModal = false" :showCancelButton="modalData.showCancelButton" :modalClasses="['warning']">
            <template slot="title">
                <div class="icon"><span class="material-icons">warning</span></div>
                <div><h4>Warning</h4></div>
            </template>
            <p slot="content" v-html="modalData.message"></p>
            <template slot="close-button-name">{{ modalData.closeButtonName }}</template>
        </Modal>
        <Modal v-if="showEditParameterModal" @cancel="showEditParameterModal = false" @close="showEditParameterModal = false" @ok="editParameterAction" :showCancelButton="true" :modalClasses="['warning']">
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
import GraphParametersLegend from '@/components/GraphParametersLegend.vue';
import { debounce } from "debounce";

export default {
  name: 'NewCity',
  mixins: [errorMessageMixin],
  components: {
    Modal,
    FileReader,
    CityGraph,
    Checker,
    GraphParametersLegend
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
              etha: null,
              etha_zone: null,
              angles: null,
              gi: null,
              hi: null,
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
          let etha = this.newCity.etha === ''? null:this.newCity.etha;
          let etha_zone = this.newCity.etha_zone === ''? null:this.newCity.etha_zone;
          let angles = this.newCity.angles === ''? null:this.newCity.angles;
          let gi = this.newCity.gi === ''? null:this.newCity.gi;
          let hi = this.newCity.hi === ''? null:this.newCity.hi;

          // create graph file from parameters
          citiesAPI.getPajekFile(n, p, l, g, etha, etha_zone, angles, gi, hi)
          .then(response => {
            this.newCity.graph = response.data.pajek;
            this.newCity.network_descriptor = response.data.network;
            this.showEditorAndGraph = true;
            this.parameterValidator.message = 'Table correctly defined';
            this.parameterValidator.show = true;
            this.parameterValidator.isError = false;
          }).catch(error => {
              let message = error.response.data.detail;
              this.parameterValidator.message = message;
              this.parameterValidator.show = true;
              this.parameterValidator.isError = true;
          });
      },
      updateCity() {
        let request = null;
        let etha = this.newCity.etha === ''? null:this.newCity.etha;
        let etha_zone = this.newCity.etha_zone === ''? null:this.newCity.etha_zone;
        let angles = this.newCity.angles === ''? null:this.newCity.angles;
        let gi = this.newCity.gi === ''? null:this.newCity.gi;
        let hi = this.newCity.hi === ''? null:this.newCity.hi;
        
        if (this.isNew) {
            request = citiesAPI.createCity(this.newCity.name, this.newCity.n, this.newCity.p, this.newCity.l, this.newCity.g, etha, etha_zone, angles, gi, hi, this.newCity.graph);
        } else {
            let data = {
                name: this.newCity.name, 
                n: this.newCity.n, 
                p: this.newCity.p, 
                l: this.newCity.l, 
                g: this.newCity.g, 
                etha: etha,
                etha_zone: etha_zone,
                angles: angles,
                gi: gi,
                hi: hi,
                graph: this.newCity.graph, 
                step: 'step1'
            };
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
            this.newCity.etha = response.data.etha;
            this.newCity.etha_zone = response.data.etha_zone;
            this.newCity.angles = response.data.angles;
            this.newCity.gi = response.data.gi;
            this.newCity.hi = response.data.hi;
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
            this.newCity.etha = response.data.etha;
            this.newCity.etha_zone = response.data.etha_zone;
            this.newCity.angles = response.data.angles;
            this.newCity.gi = response.data.gi;
            this.newCity.hi = response.data.hi;
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
