<template>
	<button @click="$emit('btnClick')"><slot></slot></button>
</template>

<script>
export default {
	name: "CustomBtn",
};
</script>

<style lang="scss" scoped>
button {
	width: 100%;
	height: 50px;
	border-radius: 12px;
	background: var(--btn-gradient);
	background-size: 150% 100%;
	background-position: 80% 0%;
	color: var(--title-color);
	transition: all 0.5s;
	font-size: 16px;
	font-weight: 500;
	font-family: "Mona-sans";
	&:hover {
		background-position: 0% 0%;
	}
}
</style>
