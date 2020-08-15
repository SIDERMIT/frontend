<template>
    <div class="CityDetail">
        <div class="header">
            <h1>{{ city.name }}</h1>
            <span class="p-min">Created at {{ getLocalDate(city.created_at) }}</span>
        </div>
        <section class="city-details">
            <div class="graph-container">
                <CityGraph :network="city.network_descriptor"></CityGraph>
            </div>
            <div>
                <h2>City parameters</h2>
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
                                <td><span>{{ city.n }}</span></td>
                                <td><span>{{ city.p }}</span></td>
                                <td><span>{{ city.l }}</span></td>
                                <td><span>{{ city.g }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button class="btn" @click="showMatrixModal = true"><span class="material-icons">chevron_right</span><span>View matrix</span></button>
            </div>
        </section>
        <section>
            <h2>Stages</h2>
            <div class="subtitle">
                <h4>Transport modes and users settings for the city</h4>
            </div>
            <template v-if="city.scene_set.length == 0">
                <div class="empty-box">
                    <p>There is no defined stages for this project. start by creating a new one</p>
                    <router-link :to="{ name: 'NewScene'}" class="btn">
                        <span>Add new stage</span>
                        <span class="material-icons">add</span>
                    </router-link>
                </div>
            </template>
            <template v-else>
                <div class="table">
                    <ul class="stages-list">
                        <li v-for="scene in city.scene_set" v-bind:key="scene.public_id">
                            <a class="name" href="#link-to-stage-detail">
                                <h4>{{ scene.name }}</h4>
                                <span class="p-min">{{ scene.transportmode_set.length }} transport modes, {{ scene.transportnetwork_set.length }} transport networks </span>
                            </a>
                            <div class="grid min">
                                <router-link :to="{ name: 'SceneDetail', params: { scenePublicId: scene.public_id }}" class="btn icon" tag="button" alt="Edit"><span class="material-icons">edit</span></router-link>
                                <button class="btn icon" alt="Duplicate" @click="duplicateScene(scene.public_id)" disabled><span class="material-icons">file_copy</span></button>
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
                <div class="right-content">
                    <a class="btn red">
                        <span class="material-icons">edit</span>
                        <span>Edit city</span>
                    </a>
                    <router-link :to="{ name: 'NewScene'}" class="btn">
                        <span>Add new stage</span>
                        <span class="material-icons">add</span>
                    </router-link>
                </div>
            </div>
        </footer>
        <Modal v-if="showMatrixModal" @close="showMatrixModal = false" :showBase="false">
            <template slot="title">
                <div><h4>OD Matrix</h4></div>
            </template>
            <template slot="content">
                {{ city.demand_matrix }}
            </template>
        </Modal>
        <Modal v-if="deleteModal.showModal" @close="deleteModal.showModal = false" @cancel="deleteModal.showModal = false" @ok="deleteScene" :isWarning="true" :showCancelButton="true">
            <template slot="title">
                <div><h4>Delete Scene</h4></div>
            </template>
            <template slot="content">{{ deleteModal.content }}</template>
        </Modal>
    </div>
</template>

<script>
import citiesAPI from '@/api/cities.api';
import scenesAPI from '@/api/scenes.api';
import dateMixin from '@/mixins/dateMixin.js'
import CityGraph from '@/components/CityGraph'
import Modal from '@/components/Modal.vue'

export default {
  name: 'CityDetail',
  mixins: [dateMixin],
  components: {
    Modal,
    CityGraph
  },
  data() {
    return {
      showMatrixModal: false,
      deleteModal: {
        showModal: false,
        content: '',
        scene: null
      },
      city: {
          scene_set: [],
          network_descriptor: {
              nodes: [],
              edges: []
          }
      }
    }
  },
  methods: {
    setData(city) {
      this.city = city;
    },
    confirmSceneDelete(scene) {
        this.deleteModal.content = `Are you sure you want to delete scene "${scene.name}"?`;
        this.deleteModal.showModal = true;
        this.deleteModal.scene = scene;
    },
    deleteScene() {
        scenesAPI.deleteScene(this.deleteModal.scene.public_id).then(response => {
            console.log(response);
            this.city.scene_set = this.city.scene_set.filter(scene => {
                return scene.public_id != this.deleteModal.scene.public_id;
            });
        });
    },
    duplicateScene(publicId) {
        scenesAPI.duplicateScene(publicId).then(response => {
            this.city.scene_set.push(response.data)
        });
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
