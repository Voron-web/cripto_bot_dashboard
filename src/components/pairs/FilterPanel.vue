<template>
	<div class="filter-panel">
		<InputMain v-model="filterData.symbolFilter" placeholder="Start entering the name of the pair" label="Symbol filter" />
		<CustomSelect class="custom-select" v-model="filterData.timeframeFilter" label="Timeframes" :options="optionsList" />
		<div class="checkbox-block">
			<CustomCheckbox v-model="filterData.activeFilter">Active only</CustomCheckbox>
			<CustomCheckbox v-model="filterData.dealFilter">With open deal</CustomCheckbox>
		</div>
		<div class="clear-btn" @click="clearFilter">
			<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
				<g id="clear-filter" transform="translate(42.666667, 85.333333)">
					<path
						d="M320,170.666667 C348.289759,170.666667 375.420843,181.90473 395.424723,201.90861 C415.428604,221.91249 426.666667,249.043574 426.666667,277.333333 C426.666667,336.243707 378.910373,384 320,384 C261.089627,384 213.333333,336.243707 213.333333,277.333333 C213.333333,218.42296 261.089627,170.666667 320,170.666667 Z M320,192 C272.871701,192 234.666667,230.205035 234.666667,277.333333 C234.666667,324.461632 272.871701,362.666667 320,362.666667 C367.128299,362.666667 405.333333,324.461632 405.333333,277.333333 C405.333333,230.205035 367.128299,192 320,192 Z M356.543147,225.705237 L371.628096,240.790187 L335.083904,277.333237 L371.628096,313.87648 L356.543147,328.961429 L319.999904,292.417237 L283.456853,328.961429 L268.371904,313.87648 L304.914904,277.333237 L268.371904,240.790187 L283.456853,225.705237 L319.999904,262.248237 L356.543147,225.705237 Z M341.333333,1.42108547e-14 L192,181.999 L192,304 L149.333333,304 L149.333,182 L7.10542736e-15,1.42108547e-14 L341.333333,1.42108547e-14 Z"
						id="Combined-Shape"></path>
				</g>
			</svg>
		</div>
		<div class="add-btn">
			<CustomBtn @btnClick="$emit('clickAddPair')">Add pair</CustomBtn>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			filterData: {
				symbolFilter: "",
				activeFilter: false,
				dealFilter: false,
				timeframeFilter: [],
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
	methods: {
		clearFilter() {
			this.filterData = {
				symbolFilter: "",
				activeFilter: false,
				dealFilter: false,
				timeframeFilter: [],
			};
		},
	},
	watch: {
		filterData: {
			deep: true,
			handler(newVal) {
				this.$emit("updateFilters", newVal);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.filter-panel {
	padding: 20px;
	background: var(--block-color);
	display: grid;
	grid-template-columns: repeat(2, 1fr) 150px 80px;
	gap: 20px;
	align-items: center;
	border-radius: 12px 12px 0 0;
}
.checkbox-block {
	margin-left: 20px;
	margin-top: 24px;
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.clear-btn {
	margin-bottom: 5px;
	width: 50px;
	height: 50px;
	align-self: flex-end;

	& svg {
		fill: var(--primary-color);
		cursor: pointer;
	}
}
.add-btn {
	grid-column-start: 3;
	grid-column-end: 5;
}
</style>
