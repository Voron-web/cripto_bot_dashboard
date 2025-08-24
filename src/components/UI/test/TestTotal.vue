<template>
	<div class="page__block result__content">
		<div class="result__total-block result__block">
			<div class="result__title">Total Capital</div>
			<ApexCharts width="300" type="radialBar" :options="chartTotalOptions" :series="chartTotalSeries" />
		</div>
		<div class="result__table">
			<div class="result__block">
				<div class="result__title">Number of Trades</div>
				<div class="result__value">
					{{ data?.tradeNum }}
				</div>
			</div>
			<div class="result__block">
				<div class="result__title">Profit</div>
				<div class="result__value">
					{{ data?.fullProfit?.toFixed(2) }}
					<span>USDT</span>
				</div>
			</div>
			<div class="result__block">
				<div class="result__title">ROI</div>
				<div class="result__value">
					{{ ((data?.fullProfit / data?.params?.startMoney) * 100).toFixed(2) }}
					<span>%</span>
				</div>
			</div>

			<div class="result__block">
				<div class="result__title">Average Trade Profit</div>
				<div class="result__value">
					{{ ((data?.fullProfit / (data?.params?.startMoney * data?.tradeNum)) * 100).toFixed(2) }}
					<span>% by deal</span>
				</div>
			</div>
			<div class="result__block">
				<div class="result__title">Net profit</div>
				<div class="result__value">
					{{ data?.profit?.toFixed(2) }}
					<span>USDT</span>
				</div>
			</div>
			<div class="result__block">
				<div class="result__title">Reinvested Capital</div>
				<div class="result__value">
					{{ data?.capital?.toFixed(2) }}
					<span>USDT</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ApexCharts from "vue3-apexcharts";

const props = defineProps({
	data: Object,
});

// const chartTotalSeries = ref([]);
const chartTotalSeries = [100 - (Number(props.data.fullProfit) / Number(props.data.params.startMoney)) * 100];
const colors = {};

const chartTotalOptions = {
	chart: { id: "total" },
	plotOptions: {
		radialBar: {
			hollow: {
				margin: 15,
				size: "70%",
			},
			startAngle: -90,
			endAngle: 90,
			track: { startAngle: -90, endAngle: 90 },
			dataLabels: {
				name: { show: false },
				value: {
					formatter: function (val) {
						const res = Number(props.data.fullProfit) + Number(props.data.params.startMoney);
						return res.toFixed(2);
					},
					offsetY: 35,
					fontSize: "40px",
					fontWeight: "900",
					fontFamily: "Mona-Sans",
					show: true,
				},
			},
		},
	},
	states: {
		hover: { filter: { type: "none" } }, // отключаем фильтры при hover
		active: { filter: { type: "none" } },
	},
};
onMounted(() => {
	const root = document.documentElement;
	colors.value = getComputedStyle(root).getPropertyValue("--value-color");
	colors.primary = getComputedStyle(root).getPropertyValue("--primary-color");
	colors.title = getComputedStyle(root).getPropertyValue("--title-color");

	chartTotalOptions.plotOptions.radialBar.track.background = colors.value;
	chartTotalOptions.plotOptions.radialBar.dataLabels.value.color = colors.title;
	chartTotalOptions.colors = [colors.primary];
});
</script>

<style lang="scss" scoped>
.result {
	&__content {
		display: flex;
		flex-direction: row-reverse;
	}
	&__title {
		text-align: start;
		font-size: 16px;
		font-weight: 500;
		color: var(--text-color);
	}
	&__value {
		line-height: 1.5;
		text-align: start;
		color: var(--title-color);
		font-size: 40px;
		font-weight: 900;
		& span {
			font-size: 20px;
			font-weight: 300;
		}
	}
	&__table {
		flex-grow: 1;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 30px;
	}
	&__total-block {
		& .result__title {
			text-align: center;
		}
	}
}
</style>
