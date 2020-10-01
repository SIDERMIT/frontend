<template>
  <div class="GlobalResults">
    <div class="header">          
        <h1>Overall optimization results</h1>
        <p>Scene 1</p>
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
                <button class="btn neuro">Cost</button>
                <button class="btn neuro active">Users</button>
                <button class="btn neuro">Modes</button>
            </div>
        </div>
        <div class="table">
            <table class="fixed">
                <tbody>
                    <tr>
                        <th><span>Network</span></th>
                        <th><a><span>𝑉𝑅𝐶<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐶𝑂<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐶𝐼<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐶𝑈<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑡v<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑡w<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑡a<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑇<br>[𝑡𝑟𝑎𝑛𝑠/𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐵<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐾<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑙<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐵<br>metro1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐾<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑙<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐵<br>metro1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐾<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑙<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐵<br>metro1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                    </tr>
                    <tr>
                        <td><a href="#">Network 1</a></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                    </tr>
                    <tr>
                        <td><a href="#">Network 2</a></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <footer>
        <div class="container full grid">
            <div class="left-content">
                <p class="info">5 processed networks, 2 networks with errors</p>
            </div>
            <div class="right-content">
                <button class="btn">
                    <span class="material-icons">chevron_left</span>
                    <span>Back</span>
                </button>
                <button class="btn">
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

export default {
  name: 'GlobalResults',
  components: {
    Modal,
  },
  data() {
      return {
        showLegendModal: false
      } 
  }
}
</script>
