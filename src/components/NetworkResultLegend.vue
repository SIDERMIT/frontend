<template>
  <div class="NetworkResultLegend">
    <Modal v-if="showLegendModal" @close="$emit('close')" :showBase="false">
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
  name: 'NetworkResultTable',
  components: {
    Modal
  },
  props: {
    showLegendModal: {
      type: Boolean,
      default: false,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>