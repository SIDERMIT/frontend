<template>
  <div class="NewScene">
    <div class="header">          
        <h1>Add new scene</h1>
    </div>
    <section class="scene-definition">
        <div>
            <div class="def-box">
                <h2>Name your scene</h2>
                <input v-model="scene.name" v-bind:class="{ error: (scene.name === null || scene.name === '') }"  type="text" placeholder="Cant be empty"/>
            </div>
            <div>
                <h2>Define transport user</h2>
                <div class="subtitle">
                    <div class="grid">
                        <h4>User settings</h4>
                        <a class="icon-link" @click="showUserLegendModal = true"><span class="material-icons">help</span></a>
                    </div>
                </div>
                <div class="table">
                    <table>
                        <tbody>
                            <tr>
                                <th><span>𝑣𝑎<br>[𝑘𝑚/h]</span></th>
                                <th><span>𝑝𝑣<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑝𝑤<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑝𝑎<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑝𝑡<br>[𝐸𝐼𝑉]</span></th>
                                <th><span>𝑠𝑝𝑣<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑠𝑝𝑤<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑠𝑝𝑎<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑠𝑝𝑡<br>[𝐸𝐼𝑉]</span></th>
                            </tr>
                            <tr>
                                <td><input v-model="scene.passenger.va" v-bind:class="{ error: (scene.passenger.va === null || scene.passenger.va === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.pv" v-bind:class="{ error: (scene.passenger.pv === null || scene.passenger.pv === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.pw" v-bind:class="{ error: (scene.passenger.pw === null || scene.passenger.pw === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.pa" v-bind:class="{ error: (scene.passenger.pa === null || scene.passenger.pa === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.pt" v-bind:class="{ error: (scene.passenger.pt === null || scene.passenger.pt === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.spv" v-bind:class="{ error: (scene.passenger.spv === null || scene.passenger.spv === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.spw" v-bind:class="{ error: (scene.passenger.spw === null || scene.passenger.spw === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.spa" v-bind:class="{ error: (scene.passenger.spa === null || scene.passenger.spa === '') }" type="text" placeholder="-"></td>
                                <td><input v-model="scene.passenger.spt" v-bind:class="{ error: (scene.passenger.spt === null || scene.passenger.spt === '') }" type="text" placeholder="-"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="ckecher">
                    </div>
                </div>
            </div>
        </div>
        <div class="graph-container"></div>
    </section>
    <section class="scene-modes">
        <h2>Define transportation modes</h2>
        <div class="subtitle">
            <div class="grid">
                <h4>Add or remove all transportation modes that the city will have</h4>
                <a class="icon-link" @click="showTransportModeLegendModal = true" ><span class="material-icons">help</span></a>
            </div>
        </div>
        <div class="table">
            <table>
                <tbody>
                    <tr>
                        <th>&nbsp;</th>
                        <th><span>Mode</span></th>
                        <th><span>𝐶𝑜<br>[$/h−𝑣𝑒h]</span></th>
                        <th><span>𝐶1<br>[$/h−𝑝𝑎𝑥]</span></th>
                        <th><span>𝐶2<br>[$/h−𝑘𝑚]</span></th>
                        <th><span>𝜈<br>[𝑘𝑚/h]</span></th>
                        <th><span>B&A<br>Sequential</span></th>
                        <th><span>𝑡<br>[𝑠/𝑝𝑎𝑥]</span></th>
                        <th><span>𝑓ini<br>[veh/hr]</span></th>
                        <th><span>𝑓𝑚𝑎𝑥<br>[𝑣𝑒h/h]</span></th>
                        <th><span>𝐾𝑚𝑎𝑥<br>[𝑝𝑎𝑥/𝑣𝑒h]</span></th>
                        <th><span>𝜃</span></th>
                        <th><span>𝑡𝑎𝑡<br>[𝑚𝑖𝑛]</span></th>
                        <th><span>𝐷</span></th>
                    </tr>
                    <tr v-for="(tm, index) in scene.transport_modes" v-bind:key="index">
                        <td><button class="btn icon" @click="showDeleteModal(tm.name, index, tm.public_id)" alt="delete"><span class="material-icons">delete</span></button></td>
                        <td><input v-model="tm.name" v-bind:class="{ error: (tm.name === null || tm.name === '') }" type="text" placeholder="-"></td>
                        <td><input v-model="tm.co" v-bind:class="{ error: (tm.co === null || tm.co === '') }" type="text" placeholder="-"></td>
                        <td><input v-model="tm.c1" v-bind:class="{ error: (tm.c1 === null || tm.c1 === '') }" type="text" placeholder="-"></td>
                        <td><input v-model="tm.c2" v-bind:class="{ error: (tm.c2 === null || tm.c2 === '') }" type="text" placeholder="-"></td>
                        <td><input v-model="tm.v" v-bind:class="{ error: (tm.v === null || tm.v === '') }" type="text" placeholder="-"></td>
                        <td>
                            <label class="switch">
                                <input v-model="tm.b_a" type="checkbox">
                                <div class="switch-body">
                                </div>
                            </label>
                        </td>
                        <td><input v-model="tm.t" v-bind:class="{ error: (tm.t === null || tm.t === '') }" type="text" placeholder="-"></td>
                        <td><input v-model="tm.f_ini" v-bind:class="{ error: (tm.f_ini === null || tm.f_ini === '') }" type="text" placeholder="-"></td>
                        <td><input v-model="tm.f_max" v-bind:class="{ error: (tm.f_max === null || tm.f_max === '') }" type="text" placeholder="-"></td>
                        <td><input v-model="tm.k_max" v-bind:class="{ error: (tm.k_max === null || tm.k_max === '') }" type="text" placeholder="-"></td>
                        <td><input v-model="tm.theta" v-bind:class="{ error: (tm.theta === null || tm.theta === '') }" type="text" placeholder="-"></td>
                        <td><input v-model="tm.tat" v-bind:class="{ error: (tm.tat === null || tm.tat === '') }" type="text" placeholder="-"></td>
                        <td><input v-model="tm.d" v-bind:class="{ error: (tm.d === null || tm.d=== '') }" type="text" placeholder="-"></td>
                    </tr>
                </tbody>
            </table>
            <div class="checker">
                <div></div>
                <button class="btn" @click="addMode"><span class="material-icons">add</span><span>Add mode</span></button>
            </div>
        </div>
    </section>
    <footer>
        <div class="container full grid">
            <div class="left-content">
            </div>
            <div class="right-content">
                <button class="btn" @click="createScene">
                    <span>Save and continue</span>
                    <span class="material-icons">chevron_right</span>
                </button>
            </div>
        </div>
    </footer>
    <Modal v-if="showUserLegendModal" @close="showUserLegendModal = false" :showBase="false">
        <template slot="title">user legend</template>
        <template slot="content"></template>
    </Modal>
    <Modal v-if="showTransportModeLegendModal" @close="showTransportModeLegendModal = false" :showBase="false">
        <template slot="title">transport mode legend</template>
        <template slot="content"></template>
    </Modal>
    <Modal v-if="showDeleteConfirmationModal" @cancel="showDeleteConfirmationModal = false" @close="showDeleteConfirmationModal = false" @ok="deleteTransportMode" :showCancelButton="true">
        <template slot="title">
            <div class="icon"><span class="material-icons">warning</span></div>
            <div><h4>Warning</h4></div>
        </template>
        <p slot="content">Are you sure you want to delete transport mode "{{ deleteModalData.name }}"</p>
        <template slot="close-button-name">Proceed</template>
    </Modal>
    <Modal v-if="showWarningModal" @close="showWarningModal = false" :showCancelButton="modalData.showCancelButton" :isWarning="true">
        <template slot="title">
            <div class="icon"><span class="material-icons">warning</span></div>
            <div><h4>Warning</h4></div>
        </template>
        <p slot="content" v-html="modalData.message"></p>
        <template slot="close-button-name">{{ modalData.closeButtonName }}</template>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import scenesAPI from '@/api/scenes.api';

export default {
  name: 'NewScene',
  components: {
    Modal
  },
  data() {
      return {
          showWarningModal: false,
          showUserLegendModal: false,
          showTransportModeLegendModal: false,
          showDeleteConfirmationModal: false,
          modalData: {
            showCancelButton: true,
            closeButtonName: 'Ok',
            message: ''
          },
          deleteModalData: {
              index: null,
              name: null,
              publicId: null
          },
          scene: {
              name: null,
              passenger: {
                va: null,
                pv: null,
                pw: null,
                pa: null,
                pt: null,
                spw: null,
                spa: null,
                spt: null,
                spv: null
              },
              transport_modes: [],
              public_id: null
          }
      }
  },
  methods: {
      showDeleteModal(name, index, publicId) {
          this.showDeleteConfirmationModal = true;
          this.deleteModalData.name = name;
          this.deleteModalData.index = index;
          this.deleteModalData.publicId = publicId;
      },
      deleteTransportMode() {
          this.scene.transport_modes.splice(this.deleteModalData.index, 1)
      },
      addMode() {
        this.scene.transport_modes.push({
            name: null,
            public_id: null,
            b_a: false,
            co: null,
            c1: null,
            c2: null,
            v: null,
            t: null,
            f_ini: null,
            f_max: null,
            k_max: null,
            theta: null,
            tat: null,
            d: null,
        });
      },
      createScene() {
        let data = JSON.parse(JSON.stringify(this.scene));
        data.city_public_id = this.$router.currentRoute.params.cityPublicId;
        scenesAPI.createScene(data).
        then(response => {
            this.$router.push({name: 'SceneDetail', params: {scenePublicId: response.data.public_id}})
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
      }
  }
}
</script>
