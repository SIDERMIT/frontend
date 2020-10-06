<template>
  <div class="GlobalResults">
    <div class="header">          
        <h1>Overall optimization results</h1>
        <p>{{ scene.name }}</p>
    </div>
    <section>
        <div class="grid title">
            <h2>Processed networks</h2>
            <a class="icon-link" @click="showLegendModal=true"><span class="material-icons">help</span></a>
        </div>
    </section>
    <section>
        <div class="grid title">
            <h4>Filter columns</h4>
            <div class="btn-filter">
                <button class="btn neuro" @click="showCostValues = !showCostValues" v-bind:class="{active: showCostValues}">Cost</button>
                <button class="btn neuro" @click="showUserValues = !showUserValues" v-bind:class="{active: showUserValues}">Users</button>
                <button class="btn neuro" @click="showModeValues = !showModeValues" v-bind:class="{active: showModeValues}">Modes</button>
            </div>
        </div>
        <div class="table">
            <table class="fixed">
                <tbody>
                    <tr>
                        <th><span>Network</span></th>
                        <th v-if="showCostValues"><a><span>𝑉𝑅𝐶<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th v-if="showCostValues"><a><span>𝐶𝑂<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th v-if="showCostValues"><a><span>𝐶𝐼<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th v-if="showCostValues"><a><span>𝐶𝑈<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th v-if="showUserValues"><a><span>𝑡v<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th v-if="showUserValues"><a><span>𝑡w<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th v-if="showUserValues"><a><span>𝑡a<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th v-if="showUserValues"><a><span>𝑇<br>[𝑡𝑟𝑎𝑛𝑠/𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <template  v-if="rows.length > 0 && showModeValues">
                            <template v-for="(optResultPerMode, index) in rows[0].optimizationresultpermode_set">
                                <th v-bind:key="index"><a><span>𝐵<br>{{ optResultPerMode.transport_mode }}</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th v-bind:key="index"><a><span>𝐾<br>{{ optResultPerMode.transport_mode }}</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th v-bind:key="index"><a><span>𝑙<br>{{ optResultPerMode.transport_mode }}</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                            </template>
                        </template>
                    </tr>
                    <tr v-for="(row, index) in rows" v-bind:key="index">
                        <td><router-link :to="{ name: 'NetworkDetail', params: { cityPublicId: scene.city.public_id, scenePublicId: scene.public_id, transportNetworkPublicId: row.public_id }}" class="btn icon" alt="Detail">{{ row.name }}</router-link></td>
                        <td v-if="showCostValues"><span>{{ row.vrc }}</span></td>
                        <td v-if="showCostValues"><span>{{ row.co }}</span></td>
                        <td v-if="showCostValues"><span>{{ row.ci }}</span></td>
                        <td v-if="showCostValues"><span>{{ row.cu }}</span></td>
                        <td v-if="showUserValues"><span>{{ row.tv }}</span></td>
                        <td v-if="showUserValues"><span>{{ row.tw }}</span></td>
                        <td v-if="showUserValues"><span>{{ row.ta }}</span></td>
                        <td v-if="showUserValues"><span>{{ row.t }}</span></td>
                        <template v-if="showModeValues">
                            <template v-for="(optResultPerMode, index) in row.optimizationresultpermode_set">
                                <td v-bind:key="index"><span>{{ optResultPerMode.b }}</span></td>
                                <td v-bind:key="index"><span>{{ optResultPerMode.k }}</span></td>
                                <td v-bind:key="index"><span>{{ optResultPerMode.l }}</span></td>
                            </template>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <footer>
        <div class="container full grid">
            <div class="left-content">
                <p class="info">{{ rows.length }} processed networks, {{ rowsWithError }} networks with errors</p>
            </div>
            <div class="right-content">
                <router-link v-if="scene.public_id !== null" class="btn" :to="{ name: 'SceneDetail', params: { scenePublicId: scene.public_id } }">
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
                                <td><span>𝑉𝑅𝐶</span></td>
                                <td>[𝑈𝑆$/h − 𝑝𝑎𝑥]</td>
                                <td><span>Total cost</span></td>
                            </tr>
                            <tr>
                                <td><span>𝐶𝑂</span></td>
                                <td>[𝑈𝑆$/h − 𝑝𝑎𝑥]</td>
                                <td><span>Operators cost</span></td>
                            </tr>
                            <tr>
                                <td><span>𝐶𝐼</span></td>
                                <td>[𝑈𝑆$/h − 𝑝𝑎𝑥]</td>
                                <td><span>Infrastructure cost</span></td>
                            </tr>
                            <tr>
                                <td><span>𝐶𝑈</span></td>
                                <td>[𝑈𝑆$/h − 𝑝𝑎𝑥]</td>
                                <td><span>Users cost</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑡v</span></td>
                                <td><span>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span></td>
                                <td><span>Travel time</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑡w</span></td>
                                <td><span>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span></td>
                                <td><span>Regularity arrivals</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑡𝑎</span></td>
                                <td>[𝑡𝑟𝑎𝑛𝑠/𝑝𝑎𝑥]</td>
                                <td><span>Transfers</span></td>
                            </tr>
                            <tr>
                                <td><span>𝐵</span></td>
                                <td>[𝑣𝑒h]</td>
                                <td><span>Vehicle fleet</span></td>
                            </tr>
                            <tr>
                                <td><span>𝐾</span></td>
                                <td>[𝑝𝑎𝑥/𝑣𝑒h]</td>
                                <td><span>Design boarding size</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑙</span></td>
                                <td>[𝑙𝑖𝑛𝑒]</td>
                                <td><span>Number of lines</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import scenesAPI from '@/api/scenes.api';
import FileSaver from 'file-saver';

export default {
  name: 'GlobalResults',
  components: {
    Modal,
  },
  data() {
      return {
        showCostValues: true,
        showUserValues: true,
        showModeValues: true,
        showLegendModal: false,
        scene: {
            name: '',
            public_id: null
        },
        rows: [],
        rowsWithError: 0
      } 
  },
  methods: {
    setData(data){
        this.scene = data.scene;
        this.rows = data.rows.filter(el => {
            if (el.optimization_error_message !== null) {
                this.rowsWithError += 1;
            }
            return el.optimizationresult !== null;
        });
    },
    downloadData() {
        let header = ['Network', '𝑉𝑅𝐶', '𝐶𝑂', '𝐶𝐼', '𝐶𝑈', '𝑡v', '𝑡w', '𝑡a', '𝑇'];
        let data = this.rows.map((row, index) => {
            let modes = row.optimizationresultpermode_set.reduce((previous, current) => {
                if (index === 0){
                    header.concat(['B-' + current.transport_mode , 'K-' + current.transport_mode, 'l-' + current.transport_mode])
                }
                return previous.concat([current.b, current.k, current.l]);
            }, []);
            return [row.name, row.vrc, row.co, row.ci, row.cu, row.tv, row.tw, row.ta, row.t].concat(modes);
        }).reduce((previous, current) => {
            return previous += current.join(',') + '\n';
        }, header);
        let blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "result-data.csv");
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.scenePublicId) {
        scenesAPI.getGlobalResults(to.params.scenePublicId).then(response => {
            next(vm => vm.setData(response.data));
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.scenePublicId) {
        scenesAPI.getGlobalResults(to.params.scenePublicId).then(response => {
            this.setData(response.data); 
            next();
        });
    }
  }
}
</script>
