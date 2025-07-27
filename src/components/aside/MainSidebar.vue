<template>
	<div class="sidebar__wrapper">
		<div class="sidebar">
			<MainLogo></MainLogo>
			<SidebarMenu></SidebarMenu>

			<!-- <div class="sidebar__menu">
				<div class="sidebar__menu-item">
					<div></div>
					<div>Main</div>
				</div>
				<div class="sidebar__menu-item">
					<div></div>
					<div>Dashboard</div>
				</div>
				<div class="sidebar__menu-item">
					<div></div>
					<div>Pair setting</div>
				</div>
				<div class="sidebar__menu-item">
					<div></div>
					<div>Strategy test</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
import SidebarMenu from "@/components/aside/SidebarMenu.vue";
import MainLogo from "@/components/UI/MainLogo.vue";

export default {
	name: "MainSidebar",
	components: {
		MainLogo,
		SidebarMenu,
	},
};
</script>

<style lang="scss" scoped>
.sidebar {
	padding: 20px;
	width: 100%;
	box-shadow: 0 0 28px 0px #010511;
	&__wrapper {
		width: 100%;
		height: 100%;
		padding: 20px;
		flex: 0 0 400px;
	}
	&__menu {
		margin-top: 50px;
	}
}
</style>
