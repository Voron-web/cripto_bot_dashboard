<template>
	<div class="pair-dialog" @pointerdown="closeDialog">
		<div class="pair-dialog__dialog" @pointerdown.stop="">
			<div class="pair-dialog__title">{{ dialogOptions.title }}</div>
			<div class="pair-dialog__content">
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

					<div class="form__timeframe">
						<CustomSelect
							:searchable="false"
							:multiple="false"
							label="Timeframe"
							placeholder="Select timeframe"
							v-model="selectData.timeframe"
							:options="optionsList" />
					</div>
					<div class="form__capital">
						<InputMain
							type="number"
							min="1"
							:label="dialogOptions.type == 'add' ? 'Base capital (USDT)' : 'Capital (USDT)'"
							v-model="selectData.capital" />
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
						<CustomCheckbox v-model="selectData.isActive">Set to Active to start trading now</CustomCheckbox>
					</div>
				</div>
				<div class="pair-dialog__btns">
					<div class="pair-dialog__btn">
						<CustomBtn @click="addPair">Add pair</CustomBtn>
					</div>
				</div>
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
import { usePairsStore } from "../../store/pairsStore";

export default {
	props: {
		dialogOptions: Object,
	},
	data() {
		return {
			symbolList: [],
			isLoading: false,
			selectData: {
				symbol: this.dialogOptions.symbol ? { title: this.dialogOptions.symbol, value: this.dialogOptions.symbol } : null,
				capital: this.dialogOptions.capital ? String(this.dialogOptions.capital) : null,
				timeframe: this.dialogOptions.timeframe
					? { title: this.dialogOptions.timeframe, value: convertTimeframe(this.dialogOptions.timeframe, "toValue") }
					: null,
				profit: this.dialogOptions.profit ? String(this.dialogOptions.profit) : null,
				checkRsi: this.dialogOptions.checkRsi ? String(this.dialogOptions.checkRsi) : true,
				checkMacdZone: this.dialogOptions.checkMacdZone ? String(this.dialogOptions.checkMacdZone) : true,
				isActive: this.dialogOptions.isActive ? String(this.dialogOptions.isActive) : true,
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
		this.symbolList = await useFetch("/pairslist");
		this.setDecimals();
	},
	methods: {
		closeDialog() {
			this.$emit("closeDialog");
		},
		setDecimals() {
			if (this.symbolList) {
				this.selectData.decimals = this.symbolList.find((pair) => pair.symbol == this.selectData.symbol.title).decimals;
			} else {
				this.selectData.decimals = 0;
			}
		},
		async addPair() {
			if (this.validation()) {
				try {
					const response = await useFetch("/addpair", { method: "POST", body: this.selectData });

					if (response.symbol == this.selectData.symbol.value) {
						this.$emit("openModal", {
							type: "info",
							text: `The pair ${this.selectData.symbol.value} was added successfully`,
						});
						usePairsStore().getPairData();
						this.closeDialog();
					} else {
						throw new Error("Error pair added");
					}
				} catch (error) {
					this.$emit("openModal", {
						type: "error",
						text: `An error occurred while adding the pair ${this.selectData.symbol.value}. 
							${error}.
							Please try again later`,
					});
				}
			}
		},
		validation() {
			//check for dublicates
			if (
				usePairsStore().data.find((pair) => pair.symbol == this.selectData.symbol.value) &&
				usePairsStore().data.find((pair) => pair.options.timeframeBase == this.selectData.timeframe.value)
			) {
				this.$emit("openModal", {
					type: "warning",
					text: `The pair ${this.selectData.symbol.value} with timeframe ${this.selectData.timeframe.title} already exists`,
				});
				return false;
			}
			// check for valid value
			if (
				this.selectData.capital == "" ||
				isNaN(Number(this.selectData.capital)) ||
				Number(this.selectData.capital < 0) ||
				this.selectData.capital == null
			) {
				this.invalidModalOpen("capital");
				return false;
			}
			if (
				this.selectData.profit == "" ||
				isNaN(Number(this.selectData.profit)) ||
				Number(this.selectData.profit) < 0 ||
				this.selectData.profit == null
			) {
				this.invalidModalOpen("profit");
				return false;
			}
			if (
				this.selectData.profit == "" ||
				isNaN(Number(this.selectData.profit)) ||
				Number(this.selectData.profit) < 0 ||
				Number(this.selectData.profit) > 100 ||
				this.selectData.profit == null
			) {
				this.invalidModalOpen("profit");
				return false;
			}
			return true;
		},
		invalidModalOpen(value) {
			this.$emit("openModal", {
				type: "warning",
				text: `The value ${value} is invalid`,
			});
		},
	},
	watch: {
		"selectData.symbol"(newVal, oldVal) {
			this.setDecimals();
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
		width: 800px;
		border-radius: 12px;
		background: var(--block-color);
		color: var(--text-color);
		border: var(--border-block);
	}

	&__content {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	&__title {
		font-family: "Mona-sans";
		color: var(--title-color);
		font-size: 20px;
		font-weight: 600;
	}

	&__form {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 40px;
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
	&__btns {
		margin-top: 50px;
		width: 100%;
		display: flex;
		justify-content: end;
		gap: 10px;
	}
	&__btn {
		width: 150px;
	}
	.form {
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
	}
}
</style>
