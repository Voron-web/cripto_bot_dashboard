<template>
	<div class="input__wrapper">
		<label class="input__label">{{ label }}</label>
		<div class="input__block">
			<input class="input" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" />
		</div>
	</div>
</template>

<script>
export default {
	name: "InputMain",
	props: {
		label: String,
		placeholder: String,
		modelValue: String,
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
	color: var(--text-color);
	font-family: "Work-sans";
	font-size: 16px;
	&::placeholder {
		color: var(--text-color);
		opacity: 0.4;
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
