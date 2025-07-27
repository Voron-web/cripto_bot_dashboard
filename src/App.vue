<script>
import MainSidebar from "./components/aside/MainSidebar.vue";
import "./style.css";
import "@/assets/fonts/Mona/stylesheet.css";
import "@/assets/fonts/Work/stylesheet.css";

export default {
	components: {
		MainSidebar,
	},
};
</script>

<template>
	<div class="main">
		<MainSidebar></MainSidebar>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<style scoped>
.main {
	width: 100%;
	height: 100%;
	display: flex;
}
.content {
	padding: 20px;
	flex-grow: 1;
}
</style>
