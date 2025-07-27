import axios from "axios";
import { defineStore } from "pinia";

export const usePairsStore = defineStore("pairs", {
	state: () => {
		return {
			data: null,
			dataIsLoad: false,
			fetchError: null,
		};
	},
	actions: {
		async getPairData() {
			this.dataIsLoad = false;
			this.fetchError = null;

			try {
				const res = await axios.get("http://localhost:3000/api/pairs");
				this.data = res.data;
				this.dataIsLoad = true;
			} catch (error) {
				this.fetchError = error.message;
			}
		},
	},
});
