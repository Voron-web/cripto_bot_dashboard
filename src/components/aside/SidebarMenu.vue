<template>
	<div class="menu">
		<SidebarMenuItem
			v-for="item in items"
			:key="item.title"
			:title="item.title"
			:itemSrc="item.src"
			:isOpen="item.title == activeItemId"
			:isActive="item.title == activeItem"
			@itemClick="changeActiveItem(item.title)">
			<template #icon>
				<IconSet :icon="item.icon" />
			</template>
			<template #subitem v-if="item.subTitle && item.subTitle.length !== 0">
				<RouterLink class="menuitem__subitem" v-for="subitem in item.subTitle" :to="subitem.src" active-class="active" :key="subitem">
					{{ subitem.title }}
				</RouterLink>
			</template>
		</SidebarMenuItem>
	</div>
</template>

<script>
import IconSet from "@/components/UI/IconSet.vue";
import SidebarMenuItem from "@/components/UI/SidebarMenuItem.vue";

export default {
	components: { SidebarMenuItem, IconSet },
	data() {
		return {
			activeItemId: "Main",
			selectedSubitem: { item: "Main", subItem: null },
			items: [
				{ title: "Main", icon: "main", src: "/" },
				// {
				// 	title: "Dashboard",
				// 	icon: "dashboard",
				// 	src: "/dashboard",
				// 	subTitle: [
				// 		{ title: "page1", src: "/dashboard/page1" },
				// 		{ title: "page2", src: "/dashboard/page2" },
				// 	],
				// },
				{
					title: "Pairs",
					icon: "pairs",
					src: "/pairs",
					subTitle: [
						{ title: "Pairs setting", src: "/pairs/table" },
						{ title: "Pair history", src: "/pairs/history" },
					],
				},
			],
		};
	},
	methods: {
		changeActiveItem(title) {
			this.activeItemId = title;
		},
		changeSubItemActive(item, subItem) {
			this.selectedSubitem = { item, subItem };
		},
	},
	computed: {
		activeItem() {
			const path = this.$route.path;

			if (path === "/") {
				return "Main";
			} else {
				const found = this.items.find((item) => {
					return item.src !== "/" && path.startsWith(item.src);
				});
				return found.title;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.menu {
	display: flex;
	font-family: "Mona-Sans";
	font-weight: 600;
	flex-direction: column;
	gap: 10px;
	margin-top: 70px;
	margin-left: 50px;
}
</style>
