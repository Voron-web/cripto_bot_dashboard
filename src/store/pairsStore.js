import axios from "axios";
import { defineStore } from "pinia";
import { getPairList } from "../api/pairAPI";

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
				this.data = await getPairList();
				this.dataIsLoad = true;
			} catch (error) {
				this.fetchError = error.message;
			}
		},
	},
});
