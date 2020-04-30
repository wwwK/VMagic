const routes = [{
		path: '/',
		component: () => import('../views/Home.vue'),
	},
	{
		name: 'ECharts',
		path: '/ChartView',
		component: () => import('../views/ChartView.vue'),
		children: [{
			name: '折线图',
			path: 'LineChart',
			component: () =>
				import('../components/chart/LineChart.vue'),
		}],
	}
];

export default routes;
