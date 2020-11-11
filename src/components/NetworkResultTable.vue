<template>
  <div class="NetworkResultTable">
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
                    <th v-if="showNetworkName"><span>Network</span></th>
                    <th v-if="showCostValues"><a @click="sort('optimizationresult|vrc')"><span>𝑉𝑅𝐶<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span v-if="currentSort==='optimizationresult|vrc'" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showCostValues"><a @click="sort('optimizationresult|co')"><span>𝐶𝑂<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span v-if="currentSort==='optimizationresult|co'" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showCostValues"><a @click="sort('optimizationresult|ci')"><span>𝐶𝐼<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span v-if="currentSort==='optimizationresult|ci'" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showCostValues"><a @click="sort('optimizationresult|cu')"><span>𝐶𝑈<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span v-if="currentSort==='optimizationresult|cu'" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showUserValues"><a @click="sort('optimizationresult|tv')"><span>𝑡v<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span v-if="currentSort==='optimizationresult|tv'" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showUserValues"><a @click="sort('optimizationresult|tw')"><span>𝑡w<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span v-if="currentSort==='optimizationresult|tw'" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showUserValues"><a @click="sort('optimizationresult|ta')"><span>𝑡a<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span v-if="currentSort==='optimizationresult|ta'" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showUserValues"><a @click="sort('optimizationresult|t')"><span>𝑇<br>[𝑡𝑟𝑎𝑛𝑠/𝑝𝑎𝑥]</span><span v-if="currentSort==='optimizationresult|t'" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <template  v-if="rows.length > 0 && showModeValues">
                        <template v-for="(optResultPerMode, index) in rows[0].optimizationresultpermode_set">
                            <th v-bind:key="index"><a @click="sort('optimizationresultpermode_set|' + index + '|b')"><span>𝐵<br>{{ optResultPerMode.transport_mode }}</span><span v-if="currentSort==='optimizationresultpermode_set|' + index + '|b'" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                            <th v-bind:key="index+1000"><a @click="sort('optimizationresultpermode_set|' + index + '|k')"><span>𝐾<br>{{ optResultPerMode.transport_mode }}</span><span v-if="currentSort==='optimizationresultpermode_set|' + index + '|k'" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                            <th v-bind:key="index+2000"><a @click="sort('optimizationresultpermode_set|' + index + '|l')"><span>𝑙<br>{{ optResultPerMode.transport_mode }}</span><span v-if="currentSort==='optimizationresultpermode_set|' + index + '|l'" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                        </template>
                    </template>
                </tr>
                <tr v-for="(row, index) in sortedRows" v-bind:key="index">
                    <td v-if="showNetworkName"><router-link :to="{ name: 'NetworkResults', params: { cityPublicId: cityPublicId, scenePublicId: scenePublicId, transportNetworkPublicId: row.public_id }}" alt="Detail">{{ row.name }}</router-link></td>
                    <td v-if="showCostValues"><span v-if="row.optimizationresult">{{ row.optimizationresult.vrc.toLocaleString() }}</span></td>
                    <td v-if="showCostValues"><span v-if="row.optimizationresult">{{ row.optimizationresult.co.toLocaleString() }}</span></td>
                    <td v-if="showCostValues"><span v-if="row.optimizationresult">{{ row.optimizationresult.ci.toLocaleString() }}</span></td>
                    <td v-if="showCostValues"><span v-if="row.optimizationresult">{{ row.optimizationresult.cu.toLocaleString() }}</span></td>
                    <td v-if="showUserValues"><span v-if="row.optimizationresult">{{ row.optimizationresult.tv.toLocaleString() }}</span></td>
                    <td v-if="showUserValues"><span v-if="row.optimizationresult">{{ row.optimizationresult.tw.toLocaleString() }}</span></td>
                    <td v-if="showUserValues"><span v-if="row.optimizationresult">{{ row.optimizationresult.ta.toLocaleString() }}</span></td>
                    <td v-if="showUserValues"><span v-if="row.optimizationresult">{{ row.optimizationresult.t.toLocaleString() }}</span></td>
                    <template v-if="showModeValues">
                        <template v-for="(optResultPerMode, index) in row.optimizationresultpermode_set">
                            <td v-bind:key="index"><span>{{ optResultPerMode.b.toLocaleString() }}</span></td>
                            <td v-bind:key="index+1000"><span>{{ optResultPerMode.k.toLocaleString() }}</span></td>
                            <td v-bind:key="index+2000"><span>{{ optResultPerMode.l.toLocaleString() }}</span></td>
                        </template>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NetworkResultTable',
  props: {
    rows: {
      type: Array,
      required: true
    },
    cityPublicId: {
      type: String,
      required: false,
      default: ''
    },
    scenePublicId: {
      type: String,
      required: false,
      default: ''
    },
    showNetworkName: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
        currentSort: 'name',
        currentSortDir: 'asc',
        showCostValues: true,
        showUserValues: true,
        showModeValues: true,
    }
  },
  computed: {
    sortedRows() {
      return this.rows.slice().sort((a, b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        let aValue = this.currentSort.split('|').reduce((acc, currentValue) => acc[currentValue], a);
        let bValue = this.currentSort.split('|').reduce((acc, currentValue) => acc[currentValue], b);

        if(aValue < bValue) return -1 * modifier;
        if(aValue > bValue) return 1 * modifier;
        return 0;
      });
    }
  },
  methods: {
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>