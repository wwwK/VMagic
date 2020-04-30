<template>
	<div class="aside-main">
		<el-container>
			<el-header></el-header>
			<el-container>
				<el-aside></el-aside>
				<el-main><router-view></router-view></el-main>
			</el-container>
			<el-footer></el-footer>
		</el-container>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.aside-main {
	width: 100%;
	height: 100%;
	.el-container {
		width: 100%;
		height: 100%;
	}
}
</style>
