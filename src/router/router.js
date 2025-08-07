import { createWebHistory, createRouter } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import PairsTablePage from "../pages/PairsTablePage.vue";
import AuthPage from "../pages/AuthPage.vue";

const routes = [
	{ path: "/", component: MainPage },
	{ path: "/pairs", redirect: "/pairs/table" },
	{ path: "/pairs/table", component: PairsTablePage },
	{ path: "/pairs/history", component: PairsTablePage },
	{ path: "/login", component: AuthPage },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
