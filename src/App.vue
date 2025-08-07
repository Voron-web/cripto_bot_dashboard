<template>
	<div class="main">
		<MainSidebar v-if="!isAuthPage"></MainSidebar>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import MainSidebar from "./components/aside/MainSidebar.vue";
import "./style.css";
import "@/assets/fonts/Mona/stylesheet.css";
import "@/assets/fonts/Work/stylesheet.css";

export default {
	components: {
		MainSidebar,
	},
	computed: {
		isAuthPage() {
			const authRouters = ["/login"];
			return authRouters.includes(this.$route.path);
		},
	},
};
</script>

<style scoped>
.main {
	width: 100%;
	height: 100%;
	display: flex;
}
.content {
	/* padding: 20px; */
	flex-grow: 1;
}
</style>
