<template>
    <div class="NewCityStep2">
        <div class="header">
            <h1>Demand definition</h1>
        </div>
        <section class="definitions">
            <div>
                <div class="subtitle">
                    <h2>Define symmetric demand by parameters</h2>
                </div>
                <div class="subtitle">
                    <div class="grid center">
                        <h4>Enter parameters (pick hour model)</h4>
                        <a class="icon-link" @click="showLegendModal = true"><span class="material-icons">help</span></a>
                    </div>
                </div>
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
                                <td><input v-model="city.n" :disabled="true" type="text" placeholder="-"/></td>
                                <td><input v-model="city.y" :disabled="!enableParameters" v-bind:class="{ error: (city.y === null || city.y === '') && enableParameters }" type="text" placeholder="-"/></td>
                                <td><input v-model="city.a" :disabled="!enableParameters" v-bind:class="{ error: (city.a === null || city.a === '') && enableParameters }" type="text" placeholder="-"/></td>
                                <td><input v-model="city.alpha" :disabled="!enableParameters" v-bind:class="{ error: (city.alpha === null || city.alpha === '') && enableParameters }" type="text" placeholder="-"/></td>
                                <td><input v-model="city.beta" :disabled="!enableParameters" v-bind:class="{ error: (city.beta === null || city.beta === '') && enableParameters }" type="text" placeholder="-"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Checker v-if="parameterValidator.show" :isError="parameterValidator.isError" :message="parameterValidator.message" />
                <div class="flex flex-end" v-if="!enableParameters">
                    <button class="btn"><span class="material-icons">edit</span><span>Edit parameters</span></button>
                </div>
                <button class="btn full main" @click="buildMatrix" :disabled="!enableParameters">{{ city.demand_matrix===null?'Render':'Update' }} OD matrix</button>
            </div>
            <div class="graph-container"><CityGraph :network="city.network_descriptor"></CityGraph></div>
        </section>
        <section>
            <div class="subtitle grid">
                <h2>OD Matrix</h2>
                <button class="btn" @click="showImportModal = true"><span class="material-icons">publish</span><span>Import CSV file</span></button>
            </div>
            <div class="empty-box" v-if="city.demand_matrix === null">
                <p>You have not generated your matrix yet, you can import data from csv file.</p>
                <button class="btn" @click="showImportModal = true">
                    <span class="material-icons">publish</span>
                    <span>Import CSV file</span>
                </button>
            </div>
            <div class="table" v-else>
                <table>
                    <tbody>
                        <tr>
                            <th>&nbsp;</th>
                            <th v-for="header in city.demand_matrix_header" v-bind:key="header"><span>{{ header}}</span></th>
                        </tr>
                        <tr v-for="(row, i) in city.demand_matrix" v-bind:key="i">
                            <th><span>{{ city.demand_matrix_header[i] }}</span></th>
                            <td v-for="(col, j) in row" v-bind:key="`${i}-${j}`" >
                                <input type="number" v-model="city.demand_matrix[i][j]" placeholder="-">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        <footer>
            <div class="container full grid">
                <div class="left-content">
                </div>
                <div class="right-content" v-if="city.public_id !== null">
                    <router-link :to="{ name: 'EditCity', params: {cityPublicId: city.public_id}}" class="btn">
                        <span class="material-icons">chevron_left</span>
                        <span>Back</span>
                    </router-link>
                    <a class="btn" @click="updateCity">
                        <span>Save city</span>
                        <span class="material-icons">check</span>
                    </a>
                </div>
            </div>
        </footer>
        <Modal v-if="showLegendModal" @close="showLegendModal = false" :showBase="false">
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
                                <td><span>𝑛</span></td>
                                <td>&nbsp;</td>
                                <td><span>Number of zones</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑌</span></td>
                                <td>[𝑝𝑎𝑥/h]</td>
                                <td><span>Total patronage</span></td>
                            </tr>
                            <tr>
                                <td><span>a</span></td>
                                <td>&nbsp;</td>
                                <td><span>Trips proportion that depart from the peripheries</span></td>
                            </tr>
                            <tr>
                                <td><span>𝛼</span></td>
                                <td>&nbsp;</td>
                                <td><span>Trips proportion from P that go to the CBD</span></td>
                            </tr>
                            <tr>
                                <td><span>𝛽</span></td>
                                <td>&nbsp;</td>
                                <td><span>Trips proportion from P to own SC</span></td>
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
        <Modal v-if="showImportModal" @close="showImportModal = false">
            <template slot="title">
                <h2>Import demand matrix file</h2>
            </template>
            <template slot="content">
                <p>The file must have this setup:</p>
                <code>*nodes n_of_nodes</code>
                <p>Then, after each row must have the next fields, separate by space:</p>
                <code>[id] [name] [x] [y] [type] [zone_id] [width]</code>
            </template>

            <template slot="base">                    
                <FileReader @load="importMatrixFile($event)"></FileReader>
            </template>
        </Modal>
    </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import CityGraph from '@/components/CityGraph.vue';
import citiesAPI from '@/api/cities.api';
import FileReader from '@/components/FileReader.vue';
import Checker from '@/components/Checker.vue';

export default {
  name: 'NewCityStep2',
  components: {
    Modal,
    FileReader,
    CityGraph,
    Checker
  },
  data() {
    return {
        showImportModal: false,
        showWarningModal: false,
        showLegendModal: false,
        enableParameters: true,
        parameterValidator: {
            show: false,
            message: '',
            isError: false,
        },
        modalData: {
            showCancelButton: true,
            closeButtonName: 'Save',
            message: ''
        },
        city: {
            n: null,
            y: null,
            a: null,
            alpha: null,
            beta: null,
            demand_matrix: null,
            network_descriptor: {
                nodes: [],
                edges: []
            },
            public_id: null,
            demand_matrix_header: []
        }
    }
  },
  methods: {
    setData(city) {
      this.city = city;
    },
    updateCity() {
        let data = {
            y: this.city.y,
            a: this.city.a,
            alpha: this.city.alpha,
            beta: this.city.beta,
            demand_matrix: this.city.demand_matrix,
            step: 'step2'
        }
        citiesAPI.updateCity(this.city.public_id, data)
        .then(response => {
            this.$router.push({name: 'CityDetail', params: {cityPublicId: response.data.public_id}})
        }).catch(error => {
            let data = error.response.data;
            let message = '<b>Please correct the following error(s):</b><br /><br />';
            for (let key in data) {
                message += `<b>${key}:</b><ul>`;
                data[key].forEach(el => {
                   message += `<li>${el}</li>`; 
                });
                message += '</ul>'
            }
            this.modalData.message = message;
            this.modalData.showCancelButton = false
            this.modalData.closeButtonName = 'OK'
            this.showWarningModal = true;
        });
    },
    buildMatrix(){
        let y = this.city.y;
        let a = this.city.a;
        let alpha = this.city.alpha;
        let beta = this.city.beta;

        // create matrix file from parameters
        citiesAPI.getMatrixFile(this.city.public_id, y, a, alpha, beta)
        .then(response => {
            this.city.demand_matrix = response.data.demand_matrix;
            this.city.demand_matrix_header = response.data.demand_matrix_header;
            this.parameterValidator.message = 'Matrix correctly defined';
            this.parameterValidator.show = true;
            this.parameterValidator.isError = false;
        }).catch(error => {
            let message = error.response.data.detail;
            this.parameterValidator.message = message;
            this.parameterValidator.show = true;
            this.parameterValidator.isError = true;
        });
    },
    importMatrixFile(fileContent) {
        this.city.y = null;
        this.city.a = null;
        this.city.alpha = null;
        this.city.beta = null;
        this.city.demand_matrix = fileContent;
        this.showImportModal = false
        this.showEditorAndGraph = true;
        this.enableParameters = false;
    }
  },
  beforeRouteEnter (to, from, next) {
    citiesAPI.getCity(to.params.cityPublicId).then(response => (next(vm => vm.setData(response.data))));
  },
  beforeRouteUpdate(to, from, next) {
    this.city = {};
    citiesAPI.getCity(to.params.cityPublicId).then(response => {
      this.setData(response.data); 
      next();
    });
  }
}
</script>
