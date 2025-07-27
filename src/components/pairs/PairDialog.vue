<template>
	<div class="pair-dialog" @click="closeDialog">
		<div class="pair-dialog__dialog" @click.stop>
			<div class="pair-dialog__content">
				<div class="pair-dialog__title">{{ dialogOptions.title }}</div>
				<div class="pair-dialog__form form">
					<div class="form__symbol">
						<CustomSelect
							:searchable="true"
							:multiple="false"
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
					<div class="form__capital">
						<InputMain :label="dialogOptions.type == 'add' ? 'Base capital (USDT)' : 'Capital (USDT)'" v-model="selectData.capital" />
					</div>
					<div class="form__timeframe">
						<CustomSelect
							:searchable="false"
							:multiple="false"
							label="Timeframe"
							placeholder="Select timeframe"
							v-model="selectData.timeframe"
							:options="optionsList" />
					</div>
					<div class="form__profit"></div>
					<div class="form__options"></div>
				</div>
				<div class="pair-dialog__btns"></div>
			</div>
			<div class="pair-dialog__close" @click="closeDialog">
				<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000">
					<g>
						<path
							d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path>
					</g>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
import { useFetch } from "../../composables/useFetch";
import CustomSelect from "../UI/CustomSelect.vue";
import { convertTimeframe } from "../../composables/convertTimeframe";

export default {
	props: {
		dialogOptions: Object,
	},
	data() {
		return {
			symbolList: [],
			isLoading: false,
			selectData: {
				symbol: this.dialogOptions.symbol ? [{ title: this.dialogOptions.symbol, value: this.dialogOptions.symbol }] : null,
				capital: this.dialogOptions.capital ? String(this.dialogOptions.capital) : null,
				timeframe: this.dialogOptions.timeframe
					? [{ title: this.dialogOptions.timeframe, value: convertTimeframe(this.dialogOptions.timeframe, "toValue") }]
					: null,
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
		this.symbolList = await useFetch("/pairslist");
	},
	methods: {
		closeDialog() {
			this.$emit("closeDialog");
		},
	},
};
</script>

<style lang="scss" scoped>
.pair-dialog {
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	backdrop-filter: blur(5px);
	background: #00000050;
	&__dialog {
		padding: 20px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 50%;
		width: 800px;
		border-radius: 12px;
		background: var(--block-color);
		color: var(--text-color);
	}

	&__content {
	}

	&__title {
		font-family: "Mona-sans";
		color: var(--title-color);
		font-size: 20px;
		font-weight: 600;
	}

	&__form {
	}
	&__close {
		position: absolute;
		right: 10px;
		top: 10px;
		z-index: 2;

		width: 35px;
		& svg {
			cursor: pointer;
			fill: var(--primary-color);
		}
	}
}
</style>
