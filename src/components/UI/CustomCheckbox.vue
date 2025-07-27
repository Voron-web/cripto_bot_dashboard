<template>
	<div class="checkbox" @click="changeCheckbox">
		<input type="checkbox" :checked="modelValue" />
		<div class="checkbox__frame">
			<div class="checkbox__block">
				<svg v-if="modelValue" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 5L8 15l-5-4"></path>
					</g>
				</svg>
			</div>
		</div>
		<label>{{ label }}</label>
	</div>
</template>

<script>
export default {
	name: "CustomCheckbox",
	props: {
		modelValue: Boolean,
		label: String,
	},
	data() {
		return {
			checked: this.isChecked,
		};
	},
	methods: {
		changeCheckbox(event) {
			this.$emit("update:modelValue", !this.modelValue);
		},
	},
};
</script>

<style lang="scss" scoped>
.checkbox {
	position: relative;
	display: flex;
	align-items: center;
	gap: 10px;
	&__frame {
		width: 20px;
		aspect-ratio: 1/1;
		background: var(--btn-gradient);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
	}
	&__block {
		width: calc(100% - 4px);
		height: calc(100% - 4px);
		background: var(--block-color);
		border-radius: 4px;
	}
	& svg {
		width: 100%;
		height: 100%;
		stroke: var(--primary-color);
	}
	& input {
		visibility: hidden;
		position: absolute;
		z-index: -5;
	}
	& label {
		font-family: "Work-sans";
		color: var(--text-color);
		font-weight: 500;
	}
}
</style>
