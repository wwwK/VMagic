<template>
	<div class="aside-menu scroll">
		<el-menu text-color="#DDD" active-text-color="#FF9326" router>
			<el-menu-item v-for="route in $router.options.routes" :key="route.path" :index="route.path">
				<i class="el-icon-s-platform"></i>
				<label>{{ route.name }}</label>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script></script>

<style lang="scss" scoped>
.aside-menu {
	position: relative;
	width: 100%;
	height: 100%;
	
	.el-aside {
		border-right: 1px solid rgba(221, 221, 221, 0.4);

		.el-menu {
			height: 100%;
			border: none;
			background: transparent;

			li {
				text-align: left;
				height: 40px;
				line-height: 40px;
				font-size: 20px;
			}

			.el-menu-item:focus,
			.el-menu-item:hover {
				background-color: rgba(255, 255, 255, 0.2);
			}

			.el-menu-item:hover {
				color: #fff !important;
			}
		}
	}
}
</style>
