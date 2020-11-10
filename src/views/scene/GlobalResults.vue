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
        <NetworkResultTable :rows="rows" :cityPublicId="scene.city.public_id" :scenePublicId="scene.public_id" ></NetworkResultTable>
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
    <NetworkResultLegend :showLegendModal="showLegendModal" @close="showLegendModal=false"></NetworkResultLegend>
  </div>
</template>

<script>
import NetworkResultTable from '@/components/NetworkResultTable.vue';
import NetworkResultLegend from '@/components/NetworkResultLegend.vue';
import scenesAPI from '@/api/scenes.api';
import FileSaver from 'file-saver';

export default {
  name: 'GlobalResults',
  components: {
    NetworkResultTable,
    NetworkResultLegend
  },
  data() {
      return {
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
        let header = ['Network', 'VRC', 'CO', 'CI', 'CU', 'tv', 'tw', 'ta', 'T'];
        let data = this.rows.map((row, index) => {
            let modes = row.optimizationresultpermode_set.reduce((previous, current) => {
                if (index === 0){
                    header = header.concat(['B-' + current.transport_mode , 'K-' + current.transport_mode, 'l-' + current.transport_mode])
                }
                return previous.concat([current.b, current.k, current.l]);
            }, []);
            return [row.name, row.optimizationresult.vrc, row.optimizationresult.co, row.optimizationresult.ci, row.optimizationresult.cu, 
            row.optimizationresult.tv, row.optimizationresult.tw, row.optimizationresult.ta, row.optimizationresult.t].concat(modes);
        }).reduce((previous, current) => {
            return previous += '\n' + current.join(',');
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
