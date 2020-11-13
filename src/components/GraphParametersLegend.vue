<template>
  <div class="GraphParametersLegend">
    <Modal v-if="show" @close="$emit('close')" :showBase="false">
        <template slot="title">
            <h2>Terminology</h2>
        </template>
        <template slot="content">
            <p>The parameters 𝑛, 𝑃, 𝐿 and 𝑔 are required to build the city, the asymmetries are optional</p>
            <div class="table">
                <table>
                    <tbody>
                        <tr>
                            <th><span>Symbol</span></th>
                            <th><span>Unit</span></th>
                            <th><span>Description</span></th>
                        </tr>
                        <tr>
                            <td><span>𝑛</span></td>
                            <td>&nbsp;</td>
                            <td><span>Number of zones</span></td>
                        </tr>
                        <tr>
                            <td><span>𝑃</span></td>
                            <td>[𝑘𝑚]</td>
                            <td><span>Total width represented by each arc</span></td>
                        </tr>
                        <tr>
                            <td><span>𝐿</span></td>
                            <td>[𝑘𝑚]</td>
                            <td><span>Distance from SC to the geometrical city center C</span></td>
                        </tr>
                        <tr>
                            <td><span>𝑔</span></td>
                            <td>&nbsp;</td>
                            <td><span>Ratio between the distances P-SC and SC- CBD</span></td>
                        </tr>
                        <tr>
                            <td><span>𝜂</span></td>
                            <td>&nbsp;</td>
                            <td><span>CBD eccentricity ratio, value in range [0-1]</span></td>
                        </tr>
                        <tr>
                            <td><span>𝜂 zone</span></td>
                            <td>&nbsp;</td>
                            <td><span>CBD eccentricity direction zone</span></td>
                        </tr>
                        <tr>
                            <td><span>angles</span></td>
                            <td>vector of construction angles of the zones (one component for zone). For instance: x<sub>1</sub>,....,x<sub>n</sub></td>
                            <td><span>Angle in degrees with range [0°,360°] measured from x+ axis counterclockwise</span></td>
                        </tr>
                        <tr>
                            <td><span>G<sub>i</sub></span></td>
                            <td>List with asymmetry ratio for each zone with values >=0. For instance: 1,0.5,1.5</td>
                            <td><span>Asymmetry parameter of distance from subcenters to (0,0) of Cartesian plane</span></td>
                        </tr>
                        <tr>
                            <td><span>H<sub>i</sub></span></td>
                            <td>List with asymmetry ratio for each zone with values >=0. For instance: 2,0.5,1.3</td>
                            <td><span>Asymmetry parameter of distance from peripheries to (0,0) of Cartesian plane</span></td>
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
  name: 'GraphParametersLegend',
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