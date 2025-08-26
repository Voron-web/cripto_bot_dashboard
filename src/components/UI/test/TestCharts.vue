<template>
	<div>
		<ApexCharts height="300px" type="line" :options="chartDealOptions" :series="chartDealSeries" />
	</div>
</template>

<script setup>
import "../../../styles/charts.scss";
import ApexCharts from "vue3-apexcharts";
import getRootColor from "../../../composables/getRootColors";
const props = defineProps({
	data: Object,
});
let colors = getRootColor();

const chartDealOptions = {
	chart: { id: "deals", stacked: false, height: "300px" },
	colors: [colors.primary, colors.secondary],
	title: {
		text: "Profit and Capital Dynamics",
		style: {
			color: colors.text,
			fontSize: "16px",
			fontWeight: "600",
		},
	},
	plotOptions: {
		bar: {
			dataLabels: {
				position: "top",
			},
		},
	},
	dataLabels: {
		enabled: true,
		style: {
			fontSize: "12px",
			color: colors.text,
		},
	},
	stroke: {
		width: 2,
	},
	xaxis: {
		type: "datetime",
		categories: props.data.deals.map((deal) => {
			return deal.sell.time;
			// const date = new Date(deal.sell.time);
			// return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }) + " " + date.toLocaleDateString();
		}),
		labels: {
			style: {
				colors: colors.text,
			},
		},
	},
	yaxis: [
		{
			seriesName: "Ended capital",
			labels: {
				style: {
					colors: colors.text,
				},
			},
		},
		{
			seriesName: "Profit",
			opposite: true,
			labels: {
				style: {
					colors: colors.text,
				},
			},
		},
	],
	legend: {
		position: "top",
		fontWeight: 600,
		labels: {
			colors: colors.text,
		},
	},
	grid: {
		borderColor: colors.border,
		strokeDashArray: 10,
		yaxis: {
			lines: {
				opacity: 0.5,
			},
		},
		row: {
			// colors: "#fff",
			// opacity: 0.5,
		},
	},
};

const chartDealSeries = [
	{ name: "Profit", type: "bar", data: props.data.deals.filter((item) => "profit" in item.sell).map((deal) => deal.sell.profit.toFixed(2)) },
	{ name: "Ended capital", type: "line", data: props.data.deals.filter((item) => "profit" in item.sell).map((deal) => deal.sell.capital.toFixed(2)) },
];
</script>

<style lang="scss" scoped></style>
