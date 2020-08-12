<template>
  <v-chart :options="graphOptions" />
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/graph'

export default {
  name: 'CityGraph',
  components: {
    'v-chart': ECharts
  },
  props: {
    network: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      graphOptions: this.baseChartOption()
    }
  },
  methods: {
    baseChartOption() {
      let nodes = this.network.nodes;
      let edges = this.network.edges;
      let data = [];

      nodes.forEach(node => {
          data.push({
            label: {
              show: true,
              position: 'bottom'
            },
            emphasis: {
              label: {
                show: true
              }
            },
            itemStyle: {
              color: 'black'
            },
            symbolSize: 8,
            name: node.name,
            value: [node.x, node.y, node.name, node.id],
          });
      });

      let links = edges.map(function(edge){
        return {
          source: edge.source,
          target: edge.target,
        }
      });

      let options = {
        visualMap: {
          show: false,
          min: 0,
          max: 100,
          dimension: 1
        },
        grid: {
          left: 0,
          bottom: 10,
          containLabel: true,
          top: 10,
          right: 10
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'value',
          scale: true,
          show: false
        },
        series: []
      }

      options.series.push({
        name: 'serie1',
        type: 'graph',
        coordinateSystem: 'cartesian2d',
        data: data,
        links: links,
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 5,
        legendHoverLink: false,
        lineStyle: {
            color: 'red'
        },
        itemStyle: {
            borderWidth: 3,
            borderColor: 'green'
        },
        label: {
            color: '#333',
        },
        symbolSize: 10,
        animationDelay: function (idx) {
            return idx * 10;
        }
      });
      return options;
    }
  }
}
</script>

