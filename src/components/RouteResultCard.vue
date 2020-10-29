<template>
  <tbody class="collapse-row" v-bind:class="{active: !collapse}">
    <tr class="main-row">
      <td><span :data-name="computedRoute.route" class="tooltip">{{ computedRoute.route }}</span></td>
      <td><span>{{ computedRoute.frequency.toLocaleString() }}</span></td>
      <td><span>{{ computedRoute.frequency_per_line.toLocaleString() }}</span></td>
      <td><span>{{ computedRoute.k.toLocaleString() }}</span></td>
      <td><span>{{ computedRoute.b.toLocaleString() }}</span></td>
      <td><span>{{ computedRoute.tc.toLocaleString() }}</span></td>
      <td><span>{{ computedRoute.co.toLocaleString() }}</span></td>
      <td><span>{{ computedRoute.lambda_min.toLocaleString() }}</span></td>
      <td>
        <div class="grid g2 min">
          <button class="btn icon flat" :alt="showInGraphI && showInGraphR ? 'hide': ((showInGraphI && !showInGraphR) || (!showInGraphI && showInGraphR))? 'hide':'show'" v-bind:class="{active: !collapse}" @click="setVisibility"><span class="material-icons">{{ showInGraphI && showInGraphR ? "visibility": ((showInGraphI && !showInGraphR) || (!showInGraphI && showInGraphR))? "vignette":"visibility_off" }}</span></button>
          <button class="btn icon flat" :alt="collapse?'open':'close'"><span class="material-icons" @click="collapse = !collapse">{{collapse?'arrow_drop_down':'arrow_drop_up'}}</span></button>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <table class="subtable">
          <thead>
            <tr>
              <th colspan="3">
                <div class="grid">
                  <span>Inbound</span>
                  <button class="btn icon flat" @click="$emit('update-visibility', route, !showInGraphI, showInGraphR)" v-bind:class="{active: showInGraphI}"><span class="material-icons">{{showInGraphI?'visibility':'visibility_off'}}</span></button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><span>Node I</span></th>
              <th><span>Node j</span></th>
              <th><span>𝜆</span></th>
            </tr>
            <tr v-for="(measure, index) in computedRoute.directionI" v-bind:key="index">
              <td><span>{{ measure.origin_node }}</span></td>
              <td><span>{{ measure.destination_node }}</span></td>
              <td><span>{{ measure.lambda_value.toLocaleString() }}</span></td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        <table class="subtable">
          <thead>
            <tr>
              <th colspan="3">
                <div class="grid">
                  <span>Outbound</span>
                  <button class="btn icon flat" @click="$emit('update-visibility', route, showInGraphI, !showInGraphR)" v-bind:class="{active: showInGraphR}"><span class="material-icons">{{showInGraphR?'visibility':'visibility_off'}}</span></button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><span>Node I</span></th>
              <th><span>Node j</span></th>
              <th><span>𝜆</span></th>
            </tr>
            <tr v-for="(measure, index) in computedRoute.directionR" v-bind:key="index">
              <td><span>{{ measure.origin_node }}</span></td>
              <td><span>{{ measure.destination_node }}</span></td>
              <td><span>{{ measure.lambda_value.toLocaleString() }}</span></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'RouteResultCard',
  props: {
    route: {
      type: Object,
      required: true
    },
    showInGraphI: {
      type: Boolean,
      required: true,
      default: false
    },
    showInGraphR: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
        collapse: true,
    }
  },
  computed: {
    computedRoute() {
      let directionI = [];
      let directionR = [];
      this.route.optimizationresultperroutedetail_set.forEach((el) => {
        if (el.direction === 'i') {
          directionI.push(el);
        } else if (el.direction === 'r') {
          directionR.push(el);
        }
      });

      let newRoute = JSON.parse(JSON.stringify(this.route));
      delete newRoute.optimizationresultperroutedetail_set;
      newRoute.directionI = directionI;
      newRoute.directionR = directionR;

      return newRoute;
    }
  },
  methods: {
    setVisibility() {
      if ((this.showInGraphI && this.showInGraphR) || ((this.showInGraphI && !this.showInGraphR) || (!this.showInGraphI && this.showInGraphR))) {
        this.$emit('update-visibility', this.route, false, false);
      } else if (!this.showInGraphI && !this.showInGraphR) {
        this.$emit('update-visibility', this.route, true, true);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>