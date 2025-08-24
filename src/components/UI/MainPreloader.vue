<template>
	<div class="preloader__base" :style="{ width: size + 'px' }">
		<div class="preloader__item"></div>
		<div class="preloader__item"></div>
		<div class="preloader__item"></div>
		<div class="preloader__item"></div>
	</div>
</template>

<script setup>
const props = defineProps({
	size: { type: Number, default: 50 },
});
</script>

<style lang="scss" scoped>
.preloader {
	&__base {
		aspect-ratio: 1/1;
		position: relative;
		animation: base 3s infinite linear;
	}
	&__item {
		width: 30%;
		aspect-ratio: 1/1;
		position: absolute;
		animation: item 3s infinite ease-out;
		border-radius: 20%;

		&:nth-child(odd) {
			background: var(--primary-color);
			box-shadow: 0 0 5px 1px var(--primary-color);
		}
		&:nth-child(even) {
			background: var(--secondary-color);
			box-shadow: 0 0 5px 1px var(--secondary-color);
		}
		&:nth-child(1) {
			top: 0;
			left: 0;
		}
		&:nth-child(2) {
			top: 0;
			right: 0;
		}
		&:nth-child(3) {
			bottom: 0;
			right: 0;
		}
		&:nth-child(4) {
			bottom: 0;
			left: 0;
		}
	}
}
@keyframes base {
	0% {
		transform: rotate(0deg) scale(1);
	}
	50% {
		transform: rotate(180deg) scale(1.5);
	}
	100% {
		transform: rotate(360deg) scale(1);
	}
}
@keyframes item {
	0% {
		transform: rotate(0deg);
	}
	50% {
	}
	100% {
		transform: rotate(-360deg);
	}
}
</style>
