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
                    <td v-if="showNetworkName"><router-link :to="{ name: 'NetworkDetail', params: { cityPublicId: cityPublicId, scenePublicId: scenePublicId, transportNetworkPublicId: row.public_id }}" class="btn icon" alt="Detail">{{ row.name }}</router-link></td>
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
        showCostValues: true,
        showUserValues: true,
        showModeValues: true,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>