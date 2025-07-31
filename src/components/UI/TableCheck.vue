<template>
	<div class="check">
		<div class="check__true check__item" v-if="isCheck">
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g>
					<g id="Interface / Check">
						<path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
					</g>
				</g>
			</svg>
		</div>
		<div class="check__false check__item" v-else>
			<svg fill="#000000" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
				<g>
					<path
						d="M500 109q-106 0-197 54-89 51-140 140-54 91-54 197t54 197q51 89 140 140 91 54 197 54t197-54q89-51 140-140 54-91 54-197t-54-197q-51-89-140-140-91-54-197-54zm241 391q0 30-21.5 52T667 574H333q-31 0-52.5-22T259 500q0-30 21.5-52t52.5-22h334q31 0 52.5 22t21.5 52z"></path>
				</g>
			</svg>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		isCheck: { type: Boolean, default: true },
	},
};
</script>

<style lang="scss" scoped>
.check {
	position: relative;

	width: 30px;
	aspect-ratio: 1/1;
	&__item {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	&__true {
		border: 3px solid #81f364;
		background: #3e9c26;
		& svg {
			fill: #3e9c26;
			stroke: #81f364;
		}
	}
	&__false {
		border: 3px solid #e4e4e4;
		background: #e4e4e4;
		& svg {
			fill: #949494;
		}
	}
	& svg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
