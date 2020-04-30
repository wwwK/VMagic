import echarts from 'echarts'

export default class Chart {
	constructor() {
		this.tt = 123;
		this.baseChart = {
			template: '<div>123</div>',
			data() {
				return {
					chartInstance: undefined,
					option: undefined,
					lastIndex: -1,
					lockIndex: -1
				}
			},
			props: {
				chartData: {
					type: Array
				},
				xPath: {
					type: String,
					default: 'name'
				},
				yPath: {
					type: String,
					default: 'value'
				}
			},
			mounted() {

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
						console.warn('无法实例化Chart:' + typeof(this));
					}
				},
				getOption() {},
				setChart() {},
				playChart() {},
				clearTimer() {
					if (this.timer) {
						clearInterval(this.timer);
						this.timer = null;
					}
				}
			},
			watch: {
				chartData: {
					deep: true,
					handler() {
						this.setChart();
					},
				},
			},
			destroyed() {
				this.clearTimer();
				if (this.chartInstance) {
					this.chartInstance.destroy()
				}
			}
		}
	}
}
