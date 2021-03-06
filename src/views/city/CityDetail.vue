<template>
    <div class="CityDetail">
        <div class="header">
            <h1>{{ city.name }}</h1>
            <span class="p-min">Created {{ getLocalDate(city.created_at) }}</span>
        </div>
        <section class="city-details">
            <div class="graph-container">
                <CityGraph :network="city.network_descriptor"></CityGraph>
            </div>
            <div>
                <div class="grid title">
                    <h2>City parameters</h2>
                    <a class="icon-link" @click="showGraphLegendModal=true"><span class="material-icons">help</span></a>
                </div>
                <div class="table multi">
                    <table>
                        <thead>
                            <tr>
                                <th colspan="4"><h4>Symmetric parameters</h4></th>
                                <th colspan="5"><h4>Asymmetric parameters</h4></th>
                            </tr> 
                        </thead>
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
                                <td><span>{{ city.n ? city.n : '-' }}</span></td>
                                <td><span>{{ city.p ? city.p : '-'  }}</span></td>
                                <td><span>{{ city.l ? city.l : '-'  }}</span></td>
                                <td><span>{{ city.g ? city.g : '-'  }}</span></td>
                                <td><span>{{ city.etha !== null ? city.etha : '-'  }}</span></td>
                                <td><span>{{ city.etha_zone ? city.etha_zone : '-'  }}</span></td>
                                <td><span>{{ city.angles ? city.angles : '-'  }}</span></td>
                                <td><span>{{ city.gi ? city.gi : '-'  }}</span></td>
                                <td><span>{{ city.hi ? city.hi : '-'  }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button class="btn" @click="showMatrixModal = true"><span class="material-icons">chevron_right</span><span>View matrix</span></button>
            </div>
        </section>
        <section>
            <h2>Scenarios</h2>
            <div class="subtitle"><h4>Transport modes and users settings for the city</h4></div>
            <template v-if="city.scene_set.length == 0">
                <div class="empty-box">
                    <p>There are no scenes for this project. Start by creating a new one</p>
                    <router-link :to="{ name: 'NewScene'}" class="btn">
                        <span>Add new scene</span>
                        <span class="material-icons">add</span>
                    </router-link>
                </div>
            </template>
            <template v-else>
                <div class="table full">
                    <ul class="scenes-list">
                        <li v-for="scene in city.scene_set" v-bind:key="scene.public_id">
                            <router-link class="name" :to="{ name: 'SceneDetail', params: { scenePublicId: scene.public_id } }">
                                <h4>{{ scene.name }}</h4>
                                <span class="p-min">{{ scene.transportmode_set.length }} transport modes, {{ scene.transportnetwork_set.length }} transport networks</span>
                            </router-link>
                            <div class="grid min">
                                <router-link :to="{ name: 'SceneDetail', params: { scenePublicId: scene.public_id }}" class="btn icon" tag="button" alt="Edit"><span class="material-icons">edit</span></router-link>
                                <button class="btn icon" alt="Duplicate" @click="confirmSceneDuplicate(scene)"><span class="material-icons">file_copy</span></button>
                                <button class="btn icon" alt="Delete" @click="confirmSceneDelete(scene)"><span class="material-icons">delete</span></button>
                            </div>
                        </li>
                    </ul>
                </div>
            </template>
        </section>
        <footer>
            <div class="container full grid">
                <div class="left-content">
                </div>
                <div class="right-content" v-if="city.public_id !== null">
                    <router-link :to="{ name: 'EditCity', params: { cityPublicId: city.public_id }}" class="btn red">
                        <span class="material-icons">edit</span>
                        <span>Edit city</span>
                    </router-link>
                    <router-link :to="{ name: 'NewScene'}" class="btn">
                        <span>Add new scene</span>
                        <span class="material-icons">add</span>
                    </router-link>
                </div>
            </div>
        </footer>
        <GraphParametersLegend :show="showGraphLegendModal" @close="showGraphLegendModal=false"></GraphParametersLegend>
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
                                    <td><input disabled="true" type="text" :value="city.n"/></td>
                                    <td><input disabled="true" type="text" :value="city.y"/></td>
                                    <td><input disabled="true" type="text" :value="city.a"/></td>
                                    <td><input disabled="true" type="text" :value="city.alpha"/></td>
                                    <td><input disabled="true" type="text" :value="city.beta"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <CityDemand :matrixData="city.demand_matrix" :header="city.demand_matrix_header"></CityDemand>
            </template>
        </Modal>
        <Modal v-if="modalData.showModal" @close="modalData.showModal = false" @cancel="modalData.showModal = false" @ok="processSceneAction" :modalClasses="['warning']" :showCancelButton="true">
            <template slot="title">
                <div><h4>{{ modalData.title }}</h4></div>
            </template>
            <template slot="content">{{ modalData.content }}</template>
        </Modal>
    </div>
</template>

<script>
import citiesAPI from '@/api/cities.api';
import scenesAPI from '@/api/scenes.api';
import dateMixin from '@/mixins/dateMixin.js';
import CityGraph from '@/components/CityGraph';
import CityDemand from '@/components/CityDemand';
import GraphParametersLegend from '@/components/GraphParametersLegend.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'CityDetail',
  mixins: [dateMixin],
  components: {
    Modal,
    CityGraph,
    CityDemand,
    GraphParametersLegend
  },
  data() {
    return {
      showMatrixModal: false,
      showGraphLegendModal: false,
      modalData: {
        title: '',
        showModal: false,
        content: '',
        scene: null,
        action: ''
      },
      city: {
          scene_set: [],
          network_descriptor: {
              nodes: [],
              edges: []
          },
          demand_matrix_header: [],
          demand_matrix: [],
          public_id: null
      }
    }
  },
  methods: {
    setData(city) {
      this.city = city;
    },
    confirmSceneDelete(scene) {
        this.modalData.title = 'Delete Scene';
        this.modalData.content = `Are you sure you want to delete scene "${scene.name}"?`;
        this.modalData.showModal = true;
        this.modalData.scene = scene;
        this.modalData.action = 'delete';
    },
    confirmSceneDuplicate(scene) {
        this.modalData.title = 'Duplicate Scene';
        this.modalData.content = `Are you sure you want to duplicate scene "${scene.name}"?`;
        this.modalData.showModal = true;
        this.modalData.scene = scene;
        this.modalData.action = 'duplicate';
    },
    processSceneAction() {
        switch(this.modalData.action) {
            case 'delete':
                scenesAPI.deleteScene(this.modalData.scene.public_id).then(response => {
                    console.log(response.data);
                    this.city.scene_set = this.city.scene_set.filter(scene => {
                        return scene.public_id != this.modalData.scene.public_id;
                    });
                });
                break;
            case 'duplicate':
                scenesAPI.duplicateScene(this.modalData.scene.public_id).then(response => {
                    this.city.scene_set.push(response.data)
                });
                break;
        }        
    }
  },
  beforeRouteEnter (to, from, next) {
    citiesAPI.getCity(to.params.cityPublicId).then(response => {
        let city = response.data;
        if (city.demand_matrix === null) {
            next({name:'NewCityStep2', params: {cityPublicId: city.public_id}});
        } else {
            next(vm => vm.setData(city));
        }
    });
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
