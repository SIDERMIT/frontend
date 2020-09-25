<template>
  <div class="TransportModeLegend">
    <Modal v-if="show" @close="$emit('close')" :showBase="false">
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
                                <td><span>𝐶𝑜</span></td>
                                <td>[$/h − 𝑣𝑒h]</td>
                                <td><span>Unitary cost per vehicle per period of time</span></td>
                            </tr>
                            <tr>
                                <td><span>𝐶1</span></td>
                                <td>[$/h − 𝑝𝑎𝑥]</td>
                                <td><span>Unitary cost per seat per period of time</span></td>
                            </tr>
                            <tr>
                                <td><span>𝐶2</span></td>
                                <td>[$/h − 𝑘𝑚]</td>
                                <td><span>Unitary cost per km per period of time</span></td>
                            </tr>
                            <tr>
                                <td><span>𝜈</span></td>
                                <td>[𝑘𝑚/h]</td>
                                <td><span>Cruise speed</span></td>
                            </tr>
                            <tr>
                                <td><span>B&A</span></td>
                                <td>Sequential</td>
                                <td><span>Boarding and alighting way</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑡</span></td>
                                <td>[𝑠/𝑝𝑎𝑥]</td>
                                <td><span>Boarding and alighting time</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑓𝑚𝑎𝑥</span></td>
                                <td>[𝑣𝑒h/h]</td>
                                <td><span>Maximum frequency</span></td>
                            </tr>
                            <tr>
                                <td><span>𝐾𝑚𝑎𝑥</span></td>
                                <td>[𝑝𝑎𝑥/𝑣𝑒h]</td>
                                <td><span>Maximum vehicle size</span></td>
                            </tr>
                            <tr>
                                <td><span>𝜃</span></td>
                                <td>&nbsp;</td>
                                <td><span>Regularity arrivals</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑡𝑎𝑡</span></td>
                                <td>[𝑚𝑖𝑛]</td>
                                <td><span>Technological access time</span></td>
                            </tr>
                            <tr>
                                <td><span>𝐷</span></td>
                                <td>&nbsp;</td>
                                <td><span>Parallel lines</span></td>
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
  name: 'TransportModeLegend',
  components: {
    Modal
  },
  props: {
    show: {
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