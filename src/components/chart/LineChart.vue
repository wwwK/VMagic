<template>
  <div class="chart-container"></div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {
      chartInstance: null,
      option: null,
      timer: null,
      lockIndex: -1,
      lastIndex: -1,
    };
  },
  props: {
    /* autoPlay: {
      type: Boolean,
      default: false
    } */
    isArea: {
      type: Boolean,
      default: false,
    },
    symbol: {
      type: Boolean,
      default: false,
    },
    smooth: {
      type: Boolean,
      default: false,
    },
    xPath: {
      type: String,
      default: 'name',
    },
    yPath: {
      type: String,
      default: 'value',
    },
    lineStyle: {
      type: Object,
    },
    areaStyle: {
      type: Object,
    },
    chartData: {
      type: Array,
    },
  },
  mounted() {
    this.getOption();
    this.initChart();
    this.setChart();
  },
  methods: {
    initChart() {
      let chartDom = this.$el;
      let domClass = chartDom.getAttribute('class');
      if (!domClass.includes('chart-container')) {
        chartDom = chartDom.getElementsByClassName('chart-container')[0];
      }
      if (chartDom) {
        this.chartInstance = echarts.init(chartDom);
      } else {
        console.warn('无法实例化LineChart');
      }
    },
    getOption() {
      if (!this.option) {
        let option = {
          tooltip: {
            trigger: 'axis',
            formatter: (params) => {
              let showHtm = '';
              showHtm =
                '时间：' +
                params[0].name +
                '<br>' +
                '项目数量：' +
                params[0].value +
                '个';

              return showHtm;
            },
            textStyle: {
              color: '#fff',
              align: 'left',
            },
          },
          grid: {
            top: '15%',
            bottom: '15%',
          },

          animationEasing: 'linear',
          animationDelay: 100,
          // animationDuration: 1000,
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(187,187,187,0.3)',
              },
            },
            axisLabel: {
              color: '#525252',
            },
            data: [],
          },
          yAxis: {
            type: 'value',

            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(187,187,187,0.3)',
              },
            },
            axisLabel: {
              color: '#525252',
            },
            splitLine: {
              show: false,
            },

            splitArea: {
              show: true,
              itemStyle: {
                color: ['rgba(187,187,187,0)', 'rgba(187,187,187,0.1)'],
              },
            },
          },
          series: [
            {
              type: 'line',
              symbol: 'emptyCircle',
              smooth: false,
              data: [],
            },
          ],
        };
        if (this.isArea) {
          if (this.areaStyle) {
            option.series[0]['areaStyle'] = this.areaStyle;
          } else {
            option.series[0]['areaStyle'] = {};
          }
        }
        if (!this.symbol) {
          option.series[0].symbol = 'none';
        }
        if (this.lineStyle) {
          option.series[0]['lineStyle'] = this.lineStyle;
        }
        option.series[0].smooth = this.smooth;
        this.option = option;
      }
    },
    setChart() {
      if (this.chartData) {
        this.clearTimer();
        this.option.xAxis.data = this.chartData.map((c) => c[this.xPath]);
        this.option.series[0].data = this.chartData.map((c) => c[this.yPath]);
        if (this.chartInstance) {
          // this.chartInstance.clear();
          this.chartInstance.setOption(this.option);
        }
      } else {
        this.chartInstance.clear();
      }
    },
    // refreshData() {},
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.setChart();
      },
    },
  },
};
</script>

<style lang="scss" scope>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
