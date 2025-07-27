<template>
	<div class="check">
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
			<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
			<g id="SVGRepo_iconCarrier">
				<g id="Interface / Check">
					<path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
				</g>
			</g>
		</svg>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.check {
	position: relative;
	width: 30px;
	aspect-ratio: 1/1;
	background: #3e9c26;
	border-radius: 50%;
	border: 3px solid #81f364;
	& svg {
		width: 30px;
		height: 30px;
		stroke: #81f364;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
