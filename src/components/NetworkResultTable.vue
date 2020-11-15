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
                    <th v-if="showCostValues"><a @click="sort(1)"><span>𝑉𝑅𝐶<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span v-if="currentSort===1" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showCostValues"><a @click="sort(2)"><span>𝐶𝑂<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span v-if="currentSort===2" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showCostValues"><a @click="sort(3)"><span>𝐶𝐼<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span v-if="currentSort===3" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showCostValues"><a @click="sort(4)"><span>𝐶𝑈<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span v-if="currentSort===4" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showUserValues"><a @click="sort(5)"><span>𝑡v<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span v-if="currentSort===5" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showUserValues"><a @click="sort(6)"><span>𝑡w<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span v-if="currentSort===6" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showUserValues"><a @click="sort(7)"><span>𝑡a<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span v-if="currentSort===7" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <th v-if="showUserValues"><a @click="sort(8)"><span>𝑇<br>[𝑡𝑟𝑎𝑛𝑠/𝑝𝑎𝑥]</span><span v-if="currentSort===8" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                    <template  v-if="showModeValues">
                        <template v-for="(transportMode,index) in transportModes">
                          <th v-bind:key="index"><a @click="sort(9 + 3 * index)"><span>𝐵<br>{{ transportMode }}</span><span v-if="currentSort===9 + 3 * index" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                          <th v-bind:key="index+1000"><a @click="sort(9 + 3 * index + 1)"><span>𝐾<br>{{ transportMode }}</span><span v-if="currentSort===9 + 3 * index + 1" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                          <th v-bind:key="index+2000"><a @click="sort(9 + 3 * index + 2)"><span>𝑙<br>{{ transportMode }}</span><span v-if="currentSort===9 + 3 * index + 2" class="btn-filter-column material-icons">{{currentSortDir==='asc'?'expand_more':'expand_less'}}</span></a></th>
                        </template>
                    </template>
                </tr>
                <tr v-for="(row, index) in sortedRows" v-bind:key="index">
                    <td v-if="showNetworkName"><router-link :to="{ name: 'NetworkResults', params: { cityPublicId: cityPublicId, scenePublicId: scenePublicId, transportNetworkPublicId: row[0] }}" alt="Detail">{{ row[1] }}</router-link></td>
                    <td v-if="showCostValues"><span>{{ row[2].toLocaleString() }}</span></td>
                    <td v-if="showCostValues"><span>{{ row[3].toLocaleString() }}</span></td>
                    <td v-if="showCostValues"><span>{{ row[4].toLocaleString() }}</span></td>
                    <td v-if="showCostValues"><span>{{ row[5].toLocaleString() }}</span></td>
                    <td v-if="showUserValues"><span>{{ row[6].toLocaleString() }}</span></td>
                    <td v-if="showUserValues"><span>{{ row[7].toLocaleString() }}</span></td>
                    <td v-if="showUserValues"><span>{{ row[8].toLocaleString() }}</span></td>
                    <td v-if="showUserValues"><span>{{ row[9].toLocaleString() }}</span></td>
                    <template v-if="showModeValues">
                        <template v-for="n in (10 + transportModes.length*3)">
                            <td v-if="n>10" v-bind:key="n"><span>{{ row[n-1]?row[n-1].toLocaleString():null }}</span></td>
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
        showModeValues: true
    }
  },
  computed: {
    sortedRows() {
      return this.processedRows.slice().sort((a, b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        let aValue = a[this.currentSort]?a[this.currentSort]:10000000;
        let bValue = b[this.currentSort]?b[this.currentSort]:10000000;

        if(aValue < bValue) return -1 * modifier;
        if(aValue > bValue) return 1 * modifier;
        return 0;
      });
    },
    transportModes() {
      let transportModeNames = new Set();
      this.rows.forEach(el => {
        if (el.optimizationresultpermode_set) {
          el.optimizationresultpermode_set.forEach(t => {
            transportModeNames.add(t.transport_mode);
          });
        }
      });
      return Array.from(transportModeNames);
    },
    processedRows() {
      let newRows = [];
      this.rows.forEach(row => {
        if (row.optimizationresult) {
          let newRow = [
            row.public_id,
            row.name, 
            row.optimizationresult.vrc, 
            row.optimizationresult.co, 
            row.optimizationresult.ci, 
            row.optimizationresult.cu, 
            row.optimizationresult.tv, 
            row.optimizationresult.tw, 
            row.optimizationresult.ta, 
            row.optimizationresult.t
          ];
          this.transportModes.forEach(() => {
            newRow.concat([null, null, null]);
          });
          
          row.optimizationresultpermode_set.forEach(el => {
            let index = this.transportModes.indexOf(el.transport_mode);
            newRow[10 + 3 * index] = el.b
            newRow[10 + 3 * index + 1] = el.k
            newRow[10 + 3 * index + 2] = el.l
          });
          newRows.push(newRow);
        }
      });

      return newRows;
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