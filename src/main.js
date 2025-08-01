import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import uiComponents from "./components/UI";
import commonComponents from "./components/common";

const pinia = createPinia();

const app = createApp(App);
uiComponents.forEach((component) => {
	app.component(component.name, component);
});
commonComponents.forEach((component) => {
	app.component(component.name, component);
});
app.use(router);
app.use(pinia);
app.mount("#app");
