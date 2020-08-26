<template>
  <div class="CityDemand">
    <div class="table">
      <table class="fixed">
        <tbody>
          <tr>
            <th>&nbsp;</th>
            <th v-for="title in header" v-bind:key="title"><span>{{ title}}</span></th>
          </tr>
          <tr v-for="(row, i) in matrixData" v-bind:key="i">
            <th><span>{{ header[i] }}</span></th>
            <td v-for="(col, j) in row" v-bind:key="`${i}-${j}`" >
              <input type="text" :value="matrixData[i][j]" readonly>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CityDemand',
  props: {
    matrixData: {
      type: Array,
      required: true
    },
    header: {
      type: Array,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
