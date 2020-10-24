<template>
  <div class="UserLegend">
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
                                <td><span>𝑣𝑎</span></td>
                                <td>[𝑘𝑚/h]</td>
                                <td><span>Walking speed</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑝𝑣</span></td>
                                <td>[𝑈𝑆$/h]</td>
                                <td><span>Value of in-vehicle time savings</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑝𝑤</span></td>
                                <td>[𝑈𝑆$/h]</td>
                                <td><span>Value of waiting time savings</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑝𝑎</span></td>
                                <td>[𝑈𝑆$/h]</td>
                                <td><span>Value of access time savings</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑝𝑡</span></td>
                                <td>[𝐸𝐼𝑉]</td>
                                <td><span>Pure transfer penalty</span></td>
                            </tr>
                            <tr>
                                <td><span>social 𝑝𝑣</span></td>
                                <td>[𝑈𝑆$/h]</td>
                                <td><span>Subjective value of in- vehicle time savings</span></td>
                            </tr>
                            <tr>
                                <td><span>social 𝑝𝑤</span></td>
                                <td>[𝑈𝑆$/h]</td>
                                <td><span>Subjective value of waiting time savings</span></td>
                            </tr>
                            <tr>
                                <td><span>𝑠ocial 𝑝𝑎</span></td>
                                <td>[𝑈𝑆$/h]</td>
                                <td><span>Subjective value of access time savings</span></td>
                            </tr>
                            <tr>
                                <td><span>social 𝑝𝑡</span></td>
                                <td>[𝐸𝐼𝑉]</td>
                                <td><span>Subjective pure transfer penalty</span></td>
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
  name: 'UserLegend',
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