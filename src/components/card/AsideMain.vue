<template>
	<div class="aside-main">
		<el-container>
			<el-header></el-header>
			<el-container>
				<el-aside>
					<AsideMenu></AsideMenu>
				</el-aside>
				<el-main><router-view></router-view></el-main>
			</el-container>
			<el-footer height="30px"></el-footer>
		</el-container>
	</div>
</template>

<script>
	import AsideMenu from './AsideMenu.vue';
export default {
	data() {
		return {
			key: 1
		}
	},
	components:{
		AsideMenu
	}
	
};
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
