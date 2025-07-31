<template>
	<div class="pair-dialog" @pointerdown="closeDialog">
		<div class="pair-dialog__dialog" @pointerdown.stop="">
			<div class="pair-dialog__title">{{ dialogOptions.title }}</div>
			<div class="pair-dialog__content">
				<PairForm :formOptions="dialogOptions.formOptions" @changeFilters="selectFilter = $event" />
				<div class="pair-dialog__btns">
					<div v-if="dialogOptions.type == 'add'" class="pair-dialog__btn">
						<CustomBtn @click="addPair">Add pair</CustomBtn>
					</div>
					<div v-if="dialogOptions.type == 'edit'" class="pair-dialog__btn">
						<CustomBtn @click="deletePair">Remove pair</CustomBtn>
					</div>
					<div v-if="dialogOptions.type == 'edit'" class="pair-dialog__btn">
						<CustomBtn @click="selectFilter.isActive = !selectFilter.isActive">{{ selectFilter.isActive ? "Deactivate" : "Activate" }}</CustomBtn>
					</div>
					<div v-if="dialogOptions.type == 'edit'" class="pair-dialog__btn">
						<CustomBtn @click="editPair">Apply</CustomBtn>
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
import { usePairsStore } from "../../store/pairsStore";

export default {
	props: {
		dialogOptions: Object,
	},
	data() {
		return {
			selectFilter: {},
		};
	},

	methods: {
		closeDialog() {
			this.$emit("closeDialog");
		},

		async addPair() {
			if (this.validation()) {
				try {
					const response = await useFetch("/addpair", { method: "POST", body: this.selectFilter });

					if (response.symbol == this.selectFilter.symbol.value) {
						this.$emit("openModal", {
							type: "info",
							text: `The pair ${this.selectFilter.symbol.value} was added successfully`,
						});
						usePairsStore().getPairData();
						this.closeDialog();
					} else {
						throw new Error("Error pair added");
					}
				} catch (error) {
					this.$emit("openModal", {
						type: "error",
						text: `An error occurred while adding the pair ${this.selectFilter.symbol.value}. 
							${error}.
							Please try again later`,
					});
				}
			}
		},
		validation() {
			//check for dublicates
			if (
				usePairsStore().data.find((pair) => pair.symbol == this.selectFilter.symbol.value) &&
				usePairsStore().data.find((pair) => pair.options.timeframeBase == this.selectFilter.timeframe.value)
			) {
				this.$emit("openModal", {
					type: "warning",
					text: `The pair ${this.selectFilter.symbol.value} with timeframe ${this.selectFilter.timeframe.title} already exists`,
				});
				return false;
			}
			// check for valid value
			if (
				this.selectFilter.capital == "" ||
				isNaN(Number(this.selectFilter.capital)) ||
				Number(this.selectFilter.capital < 0) ||
				this.selectFilter.capital == null
			) {
				this.invalidModalOpen("capital");
				return false;
			}
			if (
				this.selectFilter.profit == "" ||
				isNaN(Number(this.selectFilter.profit)) ||
				Number(this.selectFilter.profit) < 0 ||
				this.selectFilter.profit == null
			) {
				this.invalidModalOpen("profit");
				return false;
			}
			if (
				this.selectFilter.profit == "" ||
				isNaN(Number(this.selectFilter.profit)) ||
				Number(this.selectFilter.profit) < 0 ||
				Number(this.selectFilter.profit) > 100 ||
				this.selectFilter.profit == null
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
		gap: 20px;
	}
	&__btn {
		width: 150px;
	}
	.form {
	}
}
</style>
