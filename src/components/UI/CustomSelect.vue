<template>
	<div class="select__wrapper">
		<label v-if="label" class="select__label">{{ label }}</label>
		<div class="multiselect__wrapper">
			<multiselect
				:modelValue="modelValue"
				:options="options"
				:multiple="multiple"
				:close-on-select="true"
				:searchable="searchable"
				:showLabels="false"
				:max="multiple ? 5 : null"
				label="title"
				track-by="value"
				:placeholder="placeholder"
				@update:modelValue="$emit('update:modelValue', $event)" />
		</div>
	</div>
	<!-- <p>Выбрано: {{ modelValue }}</p> -->
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
	name: "CustomSelect",
	components: { Multiselect },
	props: {
		label: String,
		placeholder: String,
		options: { type: Array, default: [] },
		modelValue: [Array, Object],
		searchable: { type: Boolean, default: false },
		multiple: { type: Boolean, default: true },
	},
	data() {
		return {
			selectedValues: [],
		};
	},
};
</script>

<style lang="scss">
.select {
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
.multiselect {
	height: 100%;
	width: 100%;
	&__wrapper {
		position: relative;
		padding: 2px;
		background: var(--btn-gradient);
		height: 54px;
		border-radius: 16px;
		// z-index: 51;
	}
	&__tags {
		padding-top: 15px;
		padding-left: 15px;
		height: 100%;
		background: var(--block-color);
		border: none;
		border-radius: 14px;
		& input {
			background: var(--block-color);
			color: var(--text-color);
		}
	}
	&__tag {
		background: var(--primary-color);
	}
	&__tag-icon {
		&::after {
			color: var(--accent-color);
		}
	}
	&--active:not(.multiselect--above) .multiselect__tags {
		border-radius: 14px;
	}
	&__placeholder {
		margin: 0;
		font-family: "Work-sans";
		color: var(--text-color);
		opacity: 0.4;
		font-size: 16px;
	}
	&__select {
		height: 100%;
		&::before {
			border-color: var(--primary-color) transparent transparent;
		}
	}
	&__single {
		font-family: "Work-sans";
		background: var(--block-color);
		color: var(--title-color);
		font-weight: 500;
	}
	&__option {
		max-width: 100%;
		color: var(--text-color);
		white-space: initial;
		&--highlight {
			background: var(--accent-color);
			&.multiselect__option--selected {
				background: var(--accent-color);
			}
		}
		&--selected {
			background: var(--block-color);
			color: var(--title-color);
		}
	}
	&__content {
		max-width: 100%;
	}
	&__content-wrapper {
		top: calc(100% + 5px);
		border-radius: 14px;
		background: var(--block-color);
		border: 2px solid var(--primary-color);
		box-shadow: 0 0 28px 0px #010511;
		&::-webkit-scrollbar {
			width: 5px;
		}
		&::-webkit-scrollbar-track {
			background: transparent;
			margin: 10px 0;
		}
		&::-webkit-scrollbar-thumb {
			background: var(--secondary-color);
			border-radius: 3px;
		}
	}
}
</style>
