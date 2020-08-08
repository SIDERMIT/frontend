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
import 'echarts/lib/chart/graph'

export default {
  name: 'CityGraph',
  components: {
    'v-chart': ECharts
  },
  props: {
  },
  data() {
    return {
      graphOptions: this.baseChartOption()
    }
  },
  methods: {
    baseChartOption() {
      let data = [];
      let links = [];

      for (let i = 0; i <= 10; i++) {
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
            name: i,
            value: i,
            x: i,
            y: i
          });
      }

      links = data.map(function(item, idx){
        return {
          source: idx,
          target: idx+1
        }
      });
      links.pop();

      let options = {
        visualMap: {
          show: false,
          min: 0,
          max: 100,
          dimension: 1
        },
        grid: {
          left: 15,
          bottom: 15,
          containLabel: false,
          top: 15,
          right: 15
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
        name: '',
        type: 'graph',
        coordinateSystem: 'cartesian2d',
        data: data,
        links: links,
        edgeSymbol: ['none', 'none'],
        edgeSymbolSize: 5,
        legendHoverLink: false,
        lineStyle: {
            color: 'red'
        },
        itemStyle: {
            borderWidth: 1,
            borderColor: 'yellow'
        },
        label: {
            color: '#333',
            position: 'right'
        },
        symbolSize: 2,
        animationDelay: function (idx) {
            return idx * 100;
        }
      });
      return options;
    }
  }
}
</script>

