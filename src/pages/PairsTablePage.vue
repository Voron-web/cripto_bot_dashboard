<template>
	<div class="content__wrapper table__wrapper">
		<div class="title">Pairs list</div>
		<div class="table">
			<div class="table__control"><FilterPanel @updateFilters="filterOption = $event" @clickAddPair="openDialog('add')" /></div>
			<div class="table__content">
				<TablePairs :data="getFiltredData(filterOption)"></TablePairs>
			</div>
		</div>
	</div>
	<PairDialog v-if="dialogIsOpen" :dialogOptions @closeDialog="closeDialog" @openModal="openModal" />
	<ModalWindow v-if="modalIsOpen" :type="modalType" @closeModal="closeModal">{{ modalText }}</ModalWindow>
</template>

<script>
import FilterPanel from "@/components/pairs/FilterPanel.vue";
import TablePairs from "@/components/pairs/TablePairs.vue";
import PairDialog from "@/components/pairs/PairDialog.vue";

import { usePairsStore } from "@/store/pairsStore";
import { mapActions, mapState } from "pinia";

export default {
	data() {
		return {
			filterOption: {
				symbolFilter: "",
				activeFilter: false,
				dealFilter: false,
				timeframeFilter: [],
			},
			dialogIsOpen: false,
			dialogOptions: {},
			modalIsOpen: false,
			modalType: "",
			modalText: "",
		};
	},
	components: { TablePairs, FilterPanel, PairDialog },
	methods: {
		...mapActions(usePairsStore, ["getPairData"]),
		getFiltredData(filter) {
			if (!Array.isArray(this.data)) return []; // <-- защита от ошибки

			const filtredData = this.data.filter((pair) => {
				let symbolIsInclude = true;
				let timeframeIsInclude = true;
				let activeFilterTrue = true;
				let dealFilterTrue = true;
				if (filter.symbolFilter != "") {
					symbolIsInclude = pair.symbol.toLowerCase().includes(filter.symbolFilter.toLowerCase());
				}
				if (filter.timeframeFilter.length != 0) {
					timeframeIsInclude = filter.timeframeFilter.map((el) => String(el.value)).includes(String(pair.options.timeframeBase));
				}
				if (filter.activeFilter) {
					activeFilterTrue = pair.isActive == true;
				}
				if (filter.dealFilter) {
					dealFilterTrue = pair.isDealOpen == true;
				}
				return symbolIsInclude && timeframeIsInclude && activeFilterTrue && dealFilterTrue;
			});
			return filtredData;
		},
		closeDialog() {
			this.dialogIsOpen = false;
			this.dialogOptions = {};
		},
		openDialog(type, data = null) {
			if (type == "add") {
				this.dialogOptions = {
					type: type,
					title: "Add new pair",
					symbol: "BTCUSDT",
					capital: 100,
					timeframe: "1h",
					profit: 50,
				};
			}
			this.dialogIsOpen = true;
		},
		closeModal() {
			this.modalIsOpen = false;
			this.modalType = "";
			this.modalText = "";
		},
		openModal(data) {
			this.modalType = data.type;
			this.modalText = data.text;
			this.modalIsOpen = true;
		},
	},
	computed: { ...mapState(usePairsStore, ["data", "dataIsLoad", "fetchError"]) },
	mounted() {
		this.getPairData();
		console.log(this.data);
	},
};
</script>

<style lang="scss" scoped>
.title {
	margin-bottom: 50px;
	color: var(--title-color);
	font-family: "Mona-Sans";
	font-size: 20px;
	font-weight: 600;
}
.table {
	border-radius: 12px;
	border: var(--border-block);

	&__control {
		border-bottom: var(--border-block);
	}
}
</style>
