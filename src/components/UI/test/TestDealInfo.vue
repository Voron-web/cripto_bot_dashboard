<template>
	<div class="test__deal-item">
		<div class="deal__block">
			<div class="deal__header">
				<div class="deal__title">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226.777 226.777" xml:space="preserve">
						<g>
							<path
								d="M135.715,122.244c-2.614-1.31-8.437-3.074-15.368-3.533c-6.934-0.458-15.828,0-15.828,0v30.02c0,0,9.287,0.198,15.503-0.26 c6.21-0.458,12.621-2.027,15.826-3.795c3.203-1.766,7.063-4.513,7.063-11.379C142.911,126.428,138.332,123.552,135.715,122.244z"></path>
							<path
								d="M116.16,104.779c5.104-0.197,10.532-1.373,14.453-3.532c3.925-2.158,6.148-5.557,6.02-10.66 c-0.134-5.102-3.532-9.418-9.287-11.186c-5.757-1.766-9.613-1.897-13.998-1.962c-4.382-0.064-8.83,0.328-8.83,0.328v27.012 C104.519,104.779,111.059,104.976,116.16,104.779z"></path>
							<path
								d="M113.413,0C50.777,0,0,50.776,0,113.413c0,62.636,50.777,113.413,113.413,113.413s113.411-50.777,113.411-113.413 C226.824,50.776,176.049,0,113.413,0z M159.591,156.777c-8.44,5.887-17.465,6.935-21.455,7.456 c-1.969,0.259-5.342,0.532-8.959,0.744v22.738h-13.998v-22.37c-2.615,0-6.361,0-10.66,0v22.37H90.522v-22.37 c-13.852,0-27.535,0-27.535,0l2.877-16.812c0,0,5.559,0,8.371,0c2.814,0,3.989-0.261,5.166-1.372 c1.177-1.113,1.439-2.812,1.439-4.188c0-1.373,0-54.286,0-57.916c0-3.628-0.295-4.61-1.963-6.473 c-1.668-1.867-5.591-2.112-7.8-2.112c-2.207,0-8.091,0-8.091,0V61.939c0,0,13.246,0,27.535,0V39.505h13.996v22.434 c3.889,0,7.537,0,10.66,0V39.505h13.998v22.703c10.435,0.647,18.203,2.635,24.983,7.645c8.766,6.475,8.306,17.724,8.11,20.406 c-0.195,2.682-1.372,7.85-3.729,11.183c-2.352,3.337-8.108,6.673-8.108,6.673s6.801,1.438,11.578,5.036 c4.771,3.598,8.307,9.941,8.106,19.229C169.923,141.668,168.027,150.891,159.591,156.777z"></path>
						</g>
					</svg>
					<span>Buy</span>
				</div>
				<p class="deal__time">{{ new Date(deal.buy.time).toUTCString() }}</p>
			</div>
			<div class="deal__row">
				<div class="deal__name">Started capital:</div>
				<div class="deal__line"></div>
				<p class="deal__value">{{ deal.buy.capital.toFixed(2) }} USDT</p>
			</div>
			<div class="deal__row">
				<div class="deal__name">Price:</div>
				<div class="deal__line"></div>

				<p class="deal__value">{{ deal.buy.price.toFixed(2) }} USDT</p>
			</div>
			<div class="deal__row">
				<div class="deal__name">Amount:</div>
				<div class="deal__line"></div>

				<p class="deal__value">{{ deal.buy.amount.toFixed(2) }} {{ pairName.split("USDT")[0] }}</p>
			</div>
		</div>
		<!-- <div class="deal__separator"></div> -->
		<div v-if="deal.sell.time" class="deal__block">
			<div class="deal__header">
				<div class="deal__title">
					<svg
						version="1.1"
						id="Layer_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 226.777 226.777"
						enable-background="new 0 0 226.777 226.777"
						xml:space="preserve"
						fill="#000000">
						<g id="SVGRepo_iconCarrier">
							<g>
								<path
									d="M127.329,100.328v16.979c-4.464,0.224-9.133,0.347-13.94,0.347c-5.223,0-10.278-0.143-15.087-0.411v-13.556 h-0.003v-3.307c-26.678,1.284-46.427,5.897-46.427,11.392c0,6.491,27.542,11.749,61.518,11.749 c33.974,0,61.518-5.258,61.518-11.749C174.907,106.196,154.587,101.533,127.329,100.328z"></path>
								<path
									d="M113.389-0.001C50.767-0.001,0,50.763,0,113.387c0,62.621,50.767,113.39,113.389,113.39 c62.622,0,113.388-50.769,113.388-113.39C226.777,50.763,176.01-0.001,113.389-0.001z M127.327,132.638v50.016H98.298V132.57 c-31.075-1.798-54.321-9.026-54.321-17.674c0-8.646,23.246-15.873,54.321-17.674V83.207H58.779V54.179H166.85v29.028h-39.523 l0.002,13.948c31.654,1.684,55.474,8.989,55.474,17.741C182.802,123.65,158.983,130.956,127.327,132.638z"></path>
							</g>
						</g>
					</svg>
					<span>Sell</span>
				</div>
				<p class="deal__time">{{ new Date(deal.sell.time).toUTCString() }}</p>
			</div>

			<div class="deal__row">
				<div class="deal__name">Price:</div>
				<div class="deal__line"></div>

				<p class="deal__value">{{ deal.sell.price.toFixed(2) }} USDT</p>
			</div>
			<div class="deal__row">
				<div class="deal__name">Proceeds:</div>
				<div class="deal__line"></div>

				<p class="deal__value">{{ (Number(deal.sell.price) * Number(deal.buy.amount)).toFixed(2) }} USDT</p>
			</div>
		</div>
		<!-- <div v-if="deal.sell.time" class="deal__separator"></div> -->
		<div v-if="deal.sell.time" class="deal__block">
			<div class="deal__header">
				<div class="deal__title">
					<svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path
								d="M694.59 511.92c-121.21 0-219.47 98.26-219.47 219.47s98.26 219.47 219.47 219.47 219.47-98.26 219.47-219.47-98.26-219.47-219.47-219.47z m0 365.79c-80.69 0-146.33-65.64-146.33-146.33 0-80.69 65.64-146.33 146.33-146.33 80.68 0 146.33 65.64 146.33 146.33 0 80.69-65.65 146.33-146.33 146.33z"></path>
							<path
								d="M679.15 753.5l-58.41-51.62-36.32 41.1 99.84 88.27L806.9 690.14l-41.39-36zM200.01 814.55c-23.52-39.54-24.45-87.29-2.48-127.71L411.7 292.57h127.24l101.25 184.96 64.14-35.11-82.03-149.85h35.02v-73.14h-33.38l69.95-146.29H255.02l76.33 146.29H291.6v73.14h36.84l-195.2 359.34c-34.39 63.34-32.93 138.11 3.91 200.04s101.86 98.91 173.91 98.91H437.7v-73.14H311.06c-46.02-0.01-87.53-23.61-111.05-63.17z m175.68-668.26h202.14l-34.98 73.14H413.86l-38.17-73.14z"></path>
						</g>
					</svg>
					<span>Result</span>
				</div>
			</div>
			<div class="deal__row">
				<div class="deal__name">Profit:</div>
				<div class="deal__line"></div>
				<p class="deal__value deal__total">{{ deal.sell.profit.toFixed(2) }} USDT</p>
			</div>
			<div class="deal__row">
				<div class="deal__name">ROI</div>
				<div class="deal__line"></div>
				<p class="deal__value deal__total">{{ ((deal.sell.profit / deal.buy.capital) * 100).toFixed(2) }} % USDT</p>
			</div>
			<div class="deal__row">
				<div class="deal__name">Capital after:</div>
				<div class="deal__line"></div>

				<p class="deal__value">{{ deal.sell.capital.toFixed(2) }} USDT</p>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	deal: Object,
	pairName: { type: String, default: "USDT" },
});
</script>

<style lang="scss" scoped>
.deal {
	&__block {
		&:not(:last-child) {
			margin-bottom: 35px;
		}
	}
	&__list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	&__header {
		margin-bottom: 15px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
	}
	&__title {
		display: flex;
		align-items: center;
		gap: 10px;
		// color: var(--secondary-color);
		font-weight: 600;
		font-size: 16px;
		& svg {
			width: 25px;
			fill: var(--primary-color);
		}
	}
	&__time {
		opacity: 0.5;
	}
	&__separator {
		margin: 10px 0;
		height: 1px;
		background: var(--text-color);
		opacity: 0.3;
	}
	&__row {
		display: flex;
		gap: 10px;
		justify-content: space-between;
		line-height: 2;
	}

	&__line {
		flex-grow: 1;
		border-bottom: 1px dotted var(--text-color);
		opacity: 0.3;
	}
	&__name {
		font-weight: 600;
	}
	&__value {
		color: var(--title-color);
	}
	&__total {
		font-weight: 900;
		text-decoration: underline;
	}
}
</style>
