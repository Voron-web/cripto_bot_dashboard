<template>
	<div class="input__wrapper">
		<label class="input__label">{{ label }}</label>
		<div class="input__block">
			<input
				class="input"
				:class="{ invalid: isInvalid }"
				:type="type ? type : null"
				:max="max ? max : null"
				:min="min ? min : null"
				:value="modelValue"
				@input="validation"
				:placeholder="placeholder" />
		</div>
	</div>
</template>

<script>
export default {
	name: "InputMain",
	props: {
		label: String,
		placeholder: String,
		modelValue: [String, Number],
		type: String,
		max: String,
		min: String,
	},
	data() {
		return {
			isInvalid: false,
		};
	},
	methods: {
		validation(event) {
			if (event.target.value != "" && this.type == "number" && (this.max || this.min)) {
				if (Number(event.target.value) > Number(this.max) || Number(event.target.value) < Number(this.min)) {
					if (Number(event.target.value) > Number(this.max)) {
						event.target.value = this.max;
					} else {
						event.target.value = this.min;
					}
				}
			}
			this.$emit("update:modelValue", event.target.value);
		},
	},
};
</script>

<style lang="scss" scoped>
.input {
	padding: 0 20px;
	height: 100%;
	width: 100%;
	background: var(--block-color);
	border-radius: 14px;
	color: var(--title-color);
	font-family: "Work-sans";
	font-size: 16px;
	font-weight: 500;
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	&::placeholder {
		color: var(--text-color);
		opacity: 0.4;
	}
	&.invalid {
		box-shadow: inset 0 0 10px 3px red;
	}
	&__block {
		display: flex;
		align-items: start;
		justify-content: center;
		height: 54px;
		width: 100%;
		padding: 2px;
		border-radius: 16px;
		background: var(--btn-gradient);
	}
	&__wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&__label {
		font-family: "Work-sans";
		color: var(--text-color);
		font-weight: 600;
		font-size: 16px;
	}
}
</style>
