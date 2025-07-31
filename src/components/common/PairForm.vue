<template>
	<div class="form">
		<div v-if="setting.symbolSelect" class="form__symbol">
			<CustomSelect
				:searchable="setting.symbolSearchable"
				:multiple="setting.symbolMultiselect"
				label="Symbol"
				placeholder="Select symbol"
				v-model="selectData.symbol"
				:options="
					symbolList.map((pair) => {
						return {
							title: pair.symbol,
							value: pair.symbol,
						};
					})
				" />
		</div>

		<div v-if="setting.timeframeSelect" class="form__timeframe">
			<CustomSelect
				:searchable="setting.timeframeSearchable"
				:multiple="setting.timeframeMultiselect"
				label="Timeframe"
				placeholder="Select timeframe"
				v-model="selectData.timeframe"
				:options="optionsList" />
		</div>
		<div class="form__capital">
			<InputMain type="number" min="1" :label="formOptions.setting.capitalTitle" v-model="selectData.capital" />
		</div>
		<div class="form__profit">
			<InputMain type="number" min="0" max="100" label="Profit (%)" v-model="selectData.profit" />
		</div>
		<div class="form__decimals">
			<InputMain type="number" min="0" label="Decimals" v-model="selectData.decimals" />
			<p class="form__warning">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g>
						<path
							d="M12 15H12.01M12 12V9M4.98207 19H19.0179C20.5615 19 21.5233 17.3256 20.7455 15.9923L13.7276 3.96153C12.9558 2.63852 11.0442 2.63852 10.2724 3.96153L3.25452 15.9923C2.47675 17.3256 3.43849 19 4.98207 19Z"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"></path>
					</g>
				</svg>
				Do not change unless necessary
			</p>
		</div>
		<div class="form__options">
			<CustomCheckbox v-model="selectData.checkRsi">RSI filter</CustomCheckbox>
			<CustomCheckbox v-model="selectData.checkMacdZone">MACD zone filter</CustomCheckbox>
			<CustomCheckbox v-if="setting.checkboxIsActive" v-model="selectData.isActive">Set to Active to start trading now</CustomCheckbox>
		</div>
		<div v-if="setting.indicatorIsActive" class="form__indicator" :class="{ 'active': selectData.isActive }">
			{{ selectData.isActive ? "Active" : "Inactive" }}
		</div>
	</div>
</template>

<script>
import CustomSelect from "../UI/CustomSelect.vue";
import { convertTimeframe } from "../../composables/convertTimeframe";
import { useFetch } from "../../composables/useFetch";

export default {
	name: "PairForm",
	props: {
		formOptions: Object,
	},
	data() {
		return {
			symbolList: [],
			isLoading: false,
			setting: {
				symbolSelect: this.formOptions.setting.symbolSelect != null ? this.formOptions.setting.symbolSelect : true,
				symbolSearchable: this.formOptions.setting.symbolSearchable != null ? this.formOptions.setting.symbolSearchable : true,
				symbolMultiselect: this.formOptions.setting.symbolMultiselect != null ? this.formOptions.setting.symbolMultiselect : true,
				timeframeSelect: this.formOptions.setting.timeframeSelect != null ? this.formOptions.setting.timeframeSelect : true,
				timeframeSearchable: this.formOptions.setting.timeframeSearchable != null ? this.formOptions.setting.timeframeSearchable : true,
				timeframeMultiselect: this.formOptions.setting.timeframeMultiselect != null ? this.formOptions.setting.timeframeMultiselect : true,
				capitalTitle: this.formOptions.setting.capitalTitle != null ? this.formOptions.setting.capitalTitle : true,
				checkboxIsActive: this.formOptions.setting.checkboxIsActive != null ? this.formOptions.setting.checkboxIsActive : true,
				indicatorIsActive: this.formOptions.setting.indicatorIsActive != null ? this.formOptions.setting.indicatorIsActive : false,
			},
			selectData: {
				symbol:
					this.formOptions.preSelect.symbol != null ? { title: this.formOptions.preSelect.symbol, value: this.formOptions.preSelect.symbol } : null,
				capital: this.formOptions.preSelect.capital != null ? String(this.formOptions.preSelect.capital) : 0,
				timeframe:
					this.formOptions.preSelect.timeframe != null
						? { title: this.formOptions.preSelect.timeframe, value: convertTimeframe(this.formOptions.preSelect.timeframe, "toValue") }
						: null,
				profit: this.formOptions.preSelect.profit != null ? String(this.formOptions.preSelect.profit) : 0,
				checkRsi: this.formOptions.preSelect.checkRsi != null ? this.formOptions.preSelect.checkRsi : true,
				checkMacdZone: this.formOptions.preSelect.checkMacdZone != null ? this.formOptions.preSelect.checkMacdZone : true,
				isActive: this.formOptions.preSelect.isActive != null ? this.formOptions.preSelect.isActive : true,
				decimals: null,
			},
			optionsList: [
				{ title: "1m", value: "1" },
				{ title: "3m", value: "3" },
				{ title: "5m", value: "5" },
				{ title: "15m", value: "15" },
				{ title: "30m", value: "30" },
				{ title: "1h", value: "60" },
				{ title: "4h", value: "240" },
				{ title: "1d", value: "D" },
			],
		};
	},
	components: { CustomSelect },
	async mounted() {
		if (this.setting.symbolSelect) {
			this.symbolList = await useFetch("/pairslist");
		}
		this.setDecimals();
		this.$emit("changeFilters", this.selectData);
	},
	methods: {
		setDecimals() {
			if (this.formOptions.preSelect.decimals != null) {
				this.selectData.decimals = this.formOptions.preSelect.decimals;
			} else if (this.symbolList.length != 0) {
				this.selectData.decimals = this.symbolList.find((pair) => pair.symbol == this.selectData.symbol.title).decimals;
			} else {
				this.selectData.decimals = 0;
			}
		},
	},
	watch: {
		selectData: {
			deep: true,
			handler(newVal) {
				this.$emit("changeFilters", newVal);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.form {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 40px;
	&__warning {
		display: flex;
		align-items: center;
		gap: 5px;

		margin-top: 5px;
		margin-left: 20px;
		& svg {
			margin-top: 2px;
			height: 18px;
			stroke: var(--text-color);
		}
	}
	&__options {
		grid-column-start: 1;
		margin-left: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	&__indicator {
		display: flex;
		border-radius: 12px;
		border: 3px solid #555;
		background: #555;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 150px;
		color: #aaa;
		font-size: 16px;
		font-family: "Mona-sans";
		font-weight: 600;
		&.active {
			border-color: #81f364;
			background: #3e9c26;
			color: #81f364;
			opacity: 1;
		}
	}
}
</style>
