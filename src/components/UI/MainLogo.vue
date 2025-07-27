<template>
	<div class="logo">
		<div ref="container" class="logo__canvas"></div>
		<div class="logo__title">Bybit_bot</div>
	</div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default {
	name: "MainLogo",
	data() {
		return {};
	},
	mounted() {
		this.scene = null;
		this.camera = null;
		this.renderer = null;
		this.model = null;
		this.animationId = null;
		const width = this.$refs.container.clientWidth;
		const height = this.$refs.container.clientHeight;

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
		this.camera.position.z = 200;

		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.setSize(width, height);
		this.$refs.container.appendChild(this.renderer.domElement);

		this.renderer.render(this.scene, this.camera);

		const light = new THREE.DirectionalLight(0xffffff, 2);
		light.position.set(0, 0, 0.5).normalize();
		const ambientLight = new THREE.AmbientLight(0xffffff, 3);
		this.scene.add(ambientLight);
		this.scene.add(light);

		const loader = new GLTFLoader();
		loader.load(
			"/assets/bitcoin.glb",
			(gltf) => {
				this.model = gltf.scene;

				this.model.traverse((child) => {
					if (child.isMesh) {
						child.material = new THREE.MeshStandardMaterial({
							color: 0xffd700,
							metalness: 0.95,
							roughness: 0.5,
						});
					}
				});

				this.scene.add(this.model);

				this.animate();
			},
			undefined,
			(error) => {
				console.error("Ошибка загрузки модели:", error);
			}
		);
	},
	methods: {
		animate() {
			this.animationId = requestAnimationFrame(this.animate);
			if (this.model) {
				this.model.rotation.x += 0.015; // вращение
				this.model.rotation.y += 0.01; // вращение
				this.renderer.render(this.scene, this.camera);
			}

			this.renderer.render(this.scene, this.camera);
		},

		beforeUnmount() {
			cancelAnimationFrame(this.animationId);
			this.renderer.dispose();
			this.$refs.container.innerHTML = "";
		},
	},
};
</script>

<style lang="scss" scoped>
.logo {
	display: flex;
	align-items: center;
	gap: 20px;

	&__canvas {
		width: 65px;
		aspect-ratio: 1/1;
	}

	&__title {
		font-family: "Button";
		color: var(--primary-color);
		font-size: 30px;
	}
}
</style>
