<template>
  <v-chart :options="getOptions()" :autoresize="true" />
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.echarts {
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
    },
    symbolSize: {
      type: Number,
      default: 15
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    showNodeId: {
      type: Boolean,
      default: false
    },
    edgeWeights: {
      type: Object,
      required: false,
      default: () => { 
        return {};
      }
    },
    routes: {
      type: Array,
      required: false,
      default: () => {
        return [];
      }
    },
    disableInteractions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    getOptions() {
      let nodes = this.network.nodes;
      let edges = this.network.edges;
      let data = [];
      let edgeWeights = this.edgeWeights;

      let disableInteractions = this.disableInteractions;
      if (this.routes.length) {
          disableInteractions = true;
      }

      nodes.forEach(node => {
          let nodeName = this.showNodeId?node.name + " (" + node.id + ")":node.name;
          let nodeAttributes = {
            label: {
              show: this.showLabel,
              position: 'bottom'
            },
            emphasis: {
              label: {
                show: true
              }
            },
            itemStyle: {
              color: '#D6951B',
              borderWidth: 0,
            },
            symbolSize: this.symbolSize,
            name: nodeName,
            value: [node.x, node.y, node.name, node.id],
          };

          if (disableInteractions) {
            delete nodeAttributes.emphasis;
          }

          if (node.type == 'cbd') {
            nodeAttributes.itemStyle = {
                color: '#2A3C4D',
                borderWidth: 0,
            }
          } else if (node.type == 'periphery') {
            nodeAttributes.itemStyle = {
                color: '#D06318',
                borderWidth: 2,
                borderColor:'#D06318',
            }
          } else if (node.type == 'subcenter') {
            nodeAttributes.itemStyle = {
                color: '#D6951B',
                borderWidth: 2,
                borderColor:'#D6951B',
            }
          } 

          data.push(nodeAttributes);
      });

      let links = edges.map(function(edge){
        let attrs = {};
        if (edgeWeights[edge.source] && edgeWeights[edge.source][edge.target]) {
          attrs = {
            lineStyle: {
              width: edgeWeights[edge.source][edge.target].hasRoutes?edgeWeights[edge.source][edge.target].value:2,
              color: edgeWeights[edge.source][edge.target].hasRoutes?'#B5BBBF':'#CACECF',
              type: edgeWeights[edge.source][edge.target].hasRoutes?'solid':'dotted'
            },
            emphasis: {
              label: {
                show: true,
                formatter: () => edgeWeights[edge.source][edge.target].routesNumber + ' lines',
                color: 'black'
              },
              lineStyle: {
                color: edgeWeights[edge.source][edge.target].hasRoutes?'#B5BBBF':'#CACECF',
              }
            }
          }
        }
        return {...attrs, ...{
          source: edge.source,
          target: edge.target,
        }}
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
        name: 'serie1',
        type: 'graph',
        coordinateSystem: 'cartesian2d',
        focusNodeAdjacency: !disableInteractions,
        hoverAnimation: !disableInteractions,
        data: data,
        links: links,
        edgeSymbol:'none',
        lineStyle: {
            color: '#CACECE',
            width:2,
        },
        itemStyle: {
            borderWidth: 0,
            color:'#D06318',
        },
        label: {
            color: '#151C24',
            fontWeight:'bold',
        },
        symbolSize: 10,
        animationDelay: function (idx) {
            return idx * 10;
        }
      });

      this.routes.forEach(route => {
        options.series.push({
          name: route.name,
          type: 'graph',
          coordinateSystem: 'cartesian2d',
          focusNodeAdjacency: true,
          data: route.nodes.map(el => {
            return {...el, ...{itemStyle: {label: {}}}}
          }),
          links: route.links,
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: 10,
          legendHoverLink: false,
          hoverAnimation: false,
          lineStyle: {
            color: '#0072D5',
            curveness: 0.2,
            width: 4,
            opacity: 1
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: '#0072D5',
            color:'rgba(255,255,255,0)',
            emphasis: {
              label: {
                show: false
              }
            }
          },
          label: {
              color: '#151C24',
              fontWeight:'bold'
          },
          symbolSize: 16,
          animationDelay: function (idx) {
            return idx * 10;
          }
        });
      });

      return options;
    }
  }
}
</script>

