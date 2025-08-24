<template>
	<div class="content__wrapper test__screen">
		<div class="page__title">BackTest pair</div>
		<div class="page__block">
			<div class="block__title">Test params</div>
			<PairForm :form-options="pairformSetting" @changeFilters="setTestParam" />
			<CustomBtn class="test__btn" @btnClick="startNewTest">Start test</CustomBtn>
		</div>
		<div v-if="dataIsLoad && !loadProcess" class="test__content">
			<div class="test__result-wrapper">
				<div class="test__result">
					<div class="block__title block__title_out">Results Overview</div>
					<div class="page__block">
						<TestTotal :data="testResult" />
					</div>
				</div>
				<div class="test__charts">
					<div class="block__title block__title_out">Test charts</div>
					<div class="page__block">
						<TestCharts :data="testResult" />
					</div>
				</div>
			</div>
			<div class="test__deals">
				<div class="block__title block__title_out">Deals list</div>
				<div class="deal__list">
					<div v-if="testResult.deals" v-for="deal in testResult.deals" class="page__block">
						<TestDealInfo :deal="deal" :pairName="testResult.params.symbol"></TestDealInfo>
					</div>
				</div>
			</div>
		</div>
		<div class="test__await">
			<div v-if="!dataIsLoad && !loadProcess" class="test__message">{{ message }}</div>
			<MainPreloader v-if="loadProcess" />
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import PairForm from "../components/common/PairForm.vue";
import CustomBtn from "../components/UI/CustomBtn.vue";
import TestDealInfo from "../components/UI/test/TestDealInfo.vue";
import TestTotal from "../components/UI/test/TestTotal.vue";
import TestCharts from "../components/UI/test/TestCharts.vue";
import { useFetch } from "../api/useFetch";

import MainPreloader from "../components/UI/MainPreloader.vue";

let loadProcess = ref(false);
let dataIsLoad = ref(false);
let message = 'Set the parameters and click "Start test" to see test results ';
const testParam = { trendTf: "240" };
const testResult = ref({});
const pairformSetting = ref({
	setting: {
		decimalsInput: false,
		symbolMultiselect: false,
		timeframeMultiselect: false,
		checkboxIsActive: false,
		capitalTitle: "Started capital",
	},
	preSelect: {
		symbol: "BTCUSDT",
		timeframe: "1h",
		capital: 1000,
	},
});

function setTestParam(formData) {
	const { symbol, capital, timeframe, profit, checkRsi, checkMacdZone, checkMacdRiseBuy, checkMacdRiseSell, date } = formData;

	testParam.symbol = symbol.value;
	testParam.interval = timeframe.value;
	testParam.startTime = date[0];
	testParam.endTime = date[1];
	testParam.checkMacdZone = checkMacdZone;
	testParam.checkRsi = checkRsi;
	testParam.checkMacdRiseBuy = checkMacdRiseBuy;
	testParam.checkMacdRiseSell = checkMacdRiseSell;
	testParam.percentProfit = profit;
	testParam.startMoney = capital;
}

async function startNewTest() {
	loadProcess.value = true;
	try {
		testResult.value = await useFetch("/pairtest", {
			params: testParam,
		});
		dataIsLoad.value = true;
	} catch (error) {
		dataIsLoad = false;
		message = `Error: ${error}. Try again later`;
	}
	loadProcess.value = false;
}
</script>

<style lang="scss" scoped>
::v-deep(.form) {
	grid-template-columns: repeat(3, 1fr);
	row-gap: 20px;
}
::v-deep(.form__date) {
	margin-top: 28px;
	grid-column-start: 3;
	grid-row-start: 1;
}
::v-deep(.form__capital) {
	grid-column-start: 2;
}
::v-deep(.form__profit) {
	grid-column-start: 1;
	grid-row-start: 2;
}
::v-deep(.form__options) {
	grid-column-start: 3;
	grid-row-start: 2;
}
.test {
	&__screen {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	&__content {
		margin-top: 50px;
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 20px;
	}
	&__deal-item {
		color: var(--text-color);
	}
	&__btn {
		width: 150px;
		margin-top: 20px;
	}

	&__result {
		height: fit-content;
	}
	&__await {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&__message {
		color: var(--text-color);
		opacity: 0.4;
	}
	&__charts {
		margin-top: 30px;
	}
}
.deal {
	&__list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
}
</style>
