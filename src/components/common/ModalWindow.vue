<template>
	<div class="modal" @pointerdown="closeModal">
		<div class="modal__window" @pointerdown.stop="">
			<div class="modal__title" v-if="type == 'info'">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g>
						<path
							d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z"
							fill="none"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"></path>
					</g>
				</svg>
				Information
			</div>
			<div class="modal__title" v-if="type == 'warning'">
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g>
						<circle cx="12" cy="17" r="1"></circle>
						<path d="M12 10L12 14" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
						<path
							d="M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z"
							fill="none"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"></path>
					</g>
				</svg>
				Warning
			</div>
			<div class="modal__title" v-if="type == 'error'">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400.00001" version="1.1" fill="#000000">
					<g transform="translate(0,-652.36216)">
						<path
							d="M 200,652.36214 C 89.691101,652.36214 -5e-7,742.05324 -5e-7,852.36214 -5e-7,962.67104 89.691101,1052.3622 200,1052.3622 c 110.3089,0 200,-89.69116 200,-200.00006 0,-110.3089 -89.6911,-200 -200,-200 z m 0,25 c 96.7979,0 175,78.2021 175,175 0,96.7979 -78.2021,175.00006 -175,175.00006 -96.7979,0 -175,-78.20216 -175,-175.00006 0,-96.7979 78.2021,-175 175,-175 z m -92.4785,64.8438 -17.677799,17.6777 92.478499,92.4785 -92.478499,92.4785 17.677799,17.6778 92.4785,-92.4785 92.4785,92.4785 17.6777,-17.6778 -92.4785,-92.4785 92.4785,-92.4785 -17.6777,-17.6777 L 200,834.68444 Z"></path>
					</g>
				</svg>
				Error
			</div>
			<div class="modal__title" v-if="type == 'confirm'">
				<svg viewBox="0 0 600 600" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" fill="#000000">
					<g>
						<path
							style="stroke-width: 1.05103; stroke-linecap: round; stroke-linejoin: round; paint-order: stroke fill markers"
							d="m 300.60937,-12.792969 c -173.60599,0 -315.214839,141.724839 -315.214839,315.404299 0,173.67945 141.608849,315.40429 315.214839,315.40429 173.606,0 315.21485,-141.72484 315.21485,-315.40429 0,-173.67946 -141.60885,-315.404299 -315.21485,-315.404299 z m 0,84.082031 c 128.13278,10e-7 231.13086,103.052738 231.13086,231.322268 0,128.26952 -102.99808,231.32226 -231.13086,231.32226 C 172.4766,533.93359 69.476562,430.88085 69.476562,302.61133 69.476563,174.3418 172.4766,71.289062 300.60937,71.289062 Z"
							id="path390"
							transform="matrix(0.95173205,0,0,0.95115787,13.901174,12.168794)"></path>
						<path
							style="stroke-linecap: round; stroke-linejoin: round; paint-order: stroke fill markers"
							d="m 300,384 c -27.14042,0 -50,22.85958 -50,50 0,27.14042 22.85958,50 50,50 27.14042,0 50,-22.85958 50,-50 0,-27.14042 -22.85958,-50 -50,-50 z"
							id="path1629"
							sodipodi:nodetypes="sssss"></path>
						<path
							id="path343"
							style="stroke-linecap: round; stroke-linejoin: round; paint-order: stroke fill markers"
							d="m 278.08676,111.38574 c -38.36479,8.45756 -69.16019,39.17753 -76.79854,78.69745 a 40,40 0 0 0 31.68395,46.86538 40,40 0 0 0 46.86346,-31.68355 c 1.79434,-9.28366 9.286,-15.75589 18.73178,-16.18385 9.44577,-0.42798 17.49014,5.33989 20.11664,14.42326 2.6265,9.08335 -1.09839,18.25628 -9.3149,22.93547 a 40,40 0 0 0 -9.35711,7.71088 40,40 0 0 0 -0.004,0.003 c -33.0243,21.0091 -50.8245,59.64136 -45.33599,98.39549 a 40,40 0 0 0 45.21236,33.99557 40,40 0 0 0 33.99709,-45.21467 c -1.11453,-7.86962 2.36064,-15.41229 9.06697,-19.67825 a 40,40 0 0 0 8.31175,-7.07224 c 38.40211,-23.26481 56.80531,-69.96796 44.27655,-113.29678 -12.77812,-44.19116 -54.63578,-74.20291 -100.59015,-72.12083 -5.74431,0.26027 -11.37926,1.01551 -16.85995,2.22373 z"></path>
					</g>
				</svg>
				Confirm
			</div>
			<div class="modal__content">
				<slot></slot>
			</div>
			<div v-if="type == 'confirm'" class="modal__btns">
				<CustomBtn @btnClick="submitModal">Confirm</CustomBtn>
				<CustomBtn @btnClick="closeModal">Cancel</CustomBtn>
			</div>
			<div class="modal__close" @click="closeModal">
				<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000">
					<g>
						<path
							d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path>
					</g>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ModalWindow",
	props: {
		type: { type: String, default: "info" },
		callback: Function,
		callbackParam: null,
	},
	methods: {
		closeModal() {
			this.$emit("closeModal");
		},
		async submitModal() {
			if (this.callbackParam) {
				await this.callback(this.callbackParam);
			} else {
				await this.callback();
			}
			this.closeModal();
		},
	},
};
</script>

<style lang="scss" scoped>
.modal {
	position: fixed;
	z-index: 200;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	backdrop-filter: blur(5px);
	background: #00000050;
	&__window {
		padding: 20px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 400px;
		min-height: 200px;
		border-radius: 12px;
		background: var(--block-color);
		color: var(--text-color);
		border: var(--border-block);
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	&__title {
		font-family: "Mona-sans";
		color: var(--title-color);
		font-size: 20px;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 10px;
		& svg {
			height: 20px;
			stroke: var(--text-color);
			fill: var(--text-color);
		}
	}
	&__content {
		flex-grow: 1;
		display: flex;
		align-items: center;
		font-family: "Work-sans";
		font-size: 16px;
		line-height: 1.7;
	}
	&__close {
		position: absolute;
		right: 10px;
		top: 10px;
		z-index: 2;

		width: 35px;
		& svg {
			cursor: pointer;
			fill: var(--primary-color);
		}
	}
	&__btns {
		display: flex;
		gap: 20px;
	}
}
</style>
