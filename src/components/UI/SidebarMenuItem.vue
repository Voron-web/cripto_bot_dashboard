<template>
	<div class="menuitem__wrapper">
		<RouterLink :to="itemSrc">
			<div class="menuitem" :class="{ active: isActive }" @click="$emit('itemClick')">
				<slot name="icon"></slot>
				<p class="menuitem__title">{{ title }}</p>
			</div>
		</RouterLink>
		<transition name="submenu">
			<div v-if="isOpen" class="menuitem__submenu">
				<slot name="subitem"></slot>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		itemSrc: String,
		title: String,
		isOpen: { type: Boolean, default: false },
		isActive: { type: Boolean, default: false },
	},
};
</script>

<style lang="scss">
.menuitem {
	display: flex;
	align-items: center;
	gap: 6px;
	height: 42px;
	cursor: pointer;
	&.active {
		& .menuitem__title {
			color: var(--primary-color);
		}
		& svg {
			fill: var(--primary-color);
		}
	}
	&__title {
		font-size: 14px;
		color: var(--text-color);
	}
	& svg {
		fill: var(--text-color);
		width: 14px;
	}
	&__submenu {
		display: flex;
		flex-direction: column;
		color: var(--text-color);
		overflow: hidden;
	}
	&__subitem {
		position: relative;
		padding-left: 14px;
		display: flex;
		justify-content: start;
		align-items: center;
		overflow: hidden;
		height: 42px;
		border-radius: 7px;
		font-size: 14px;
		color: var(--text-color);

		cursor: pointer;
		&.active {
			background-color: var(--accent-color);
			color: #fff;

			&::before {
				content: "";
				position: absolute;
				height: 100%;
				width: 3px;
				background-color: var(--primary-color);
				left: 0;
			}
		}
	}
}
/* Анимация подменю */
.submenu-enter-active,
.submenu-leave-active {
	transition: all 0.7s ease;
}

.submenu-enter-from,
.submenu-leave-to {
	max-height: 0px;
	opacity: 0;
}

.submenu-enter-to,
.submenu-leave-from {
	max-height: 100px;
	opacity: 1;
}
</style>
