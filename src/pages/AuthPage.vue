<template>
	<div class="login">
		<div class="login__bg">
			<div class="login__dark"></div>
		</div>
		<div class="login__content">
			<div class="login__form">
				<div class="login__logo">
					<MainLogo></MainLogo>
				</div>

				<div class="login__logopass">
					<InputMain v-model="login" placeholder="Enter your login">
						<p class="login__label">
							<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
								<g>
									<path
										fill-rule="evenodd"
										d="M12 3a2 2 0 0 0-1 3.732V8H8c-3.2 0-4 2.667-4 4v7c0 .667.4 2 2 2h1v-4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4h1c1.6 0 2-1.333 2-2v-7c0-3.2-2.667-4-4-4h-3V6.732A2 2 0 0 0 12 3zm3 18v-3h-2v3h2zm-4 0v-3H9v3h2zm10-3v-5c.667 0 2 .4 2 2v1c0 .667-.4 2-2 2zM3 13v5c-1.6 0-2-1.333-2-2v-1c0-1.6 1.333-2 2-2zm6-1a1 1 0 1 0 0 2h.001a1 1 0 1 0 0-2H9zm5 1a1 1 0 0 1 1-1h.001a1 1 0 1 1 0 2H15a1 1 0 0 1-1-1z"
										clip-rule="evenodd"></path>
								</g>
							</svg>
							<span>Login</span>
						</p>
					</InputMain>
					<InputMain v-model="password" type="password" placeholder="Enter your password">
						<p class="login__label">
							<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<g id="Layer_2" data-name="Layer 2">
										<g id="invisible_box" data-name="invisible box"><rect width="48" height="48" fill="none"></rect></g>
										<g id="Layer_7" data-name="Layer 7">
											<g>
												<path
													d="M39,18H35V13A11,11,0,0,0,24,2H22A11,11,0,0,0,11,13v5H7a2,2,0,0,0-2,2V44a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V20A2,2,0,0,0,39,18ZM15,13a7,7,0,0,1,7-7h2a7,7,0,0,1,7,7v5H15ZM37,42H9V22H37Z"></path>
												<circle cx="15" cy="32" r="3"></circle>
												<circle cx="23" cy="32" r="3"></circle>
												<circle cx="31" cy="32" r="3"></circle>
											</g>
										</g>
									</g>
								</g>
							</svg>
							<span>Password</span>
						</p>
					</InputMain>
					<div class="login__btn">
						<Transition>
							<CustomBtn v-show="formIsValid" @btnClick="sendLoginData">Sign In</CustomBtn>
						</Transition>
					</div>
				</div>
			</div>
		</div>
	</div>
	<ModalWindow v-if="modalIsOpen" @closeModal="modalIsOpen = false" type="error">{{ errorText }}</ModalWindow>
</template>

<script>
import { sendLoginData } from "../api/loginApi";
import MainLogo from "../components/UI/MainLogo.vue";
import router from "../router/router";

export default {
	components: { MainLogo },
	data() {
		return {
			login: "",
			password: "",
			formIsValid: false,
			errorText: "",
			modalIsOpen: false,
		};
	},
	methods: {
		async sendLoginData() {
			try {
				const response = await sendLoginData(this.login, this.password);
				console.log(response);
				localStorage.setItem("token", response.token);
				router.push("/");
			} catch (error) {
				this.errorText = error;
				this.modalIsOpen = true;
			}
		},
	},
	computed: {
		formData() {
			return [this.login, this.password];
		},
	},
	watch: {
		formData(newVal, oldVal) {
			if (newVal[0].length > 3 && newVal[1].length > 3) {
				this.formIsValid = true;
			} else this.formIsValid = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.login {
	width: 100vw;
	height: 100vh;
	display: flex;
	&__logo {
		position: relative;
		left: -30px;
	}
	&__bg {
		position: relative;
		flex: 0 0 50%;
		background-image: url("/assets/img/login_bg.jpg");
		background-position: center;
		background-size: cover;
	}
	&__dark {
		position: absolute;
		z-index: 1;
		inset: 0;
		background: #00000050;
	}

	&__content {
		flex: 0 0 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&__logopass {
		margin-top: 100px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	&__label {
		display: flex;
		align-items: end;
		gap: 10px;
		& svg {
			height: 20px;
			fill: var(--text-color);
		}
	}
	&__btn {
		height: 50px;
		margin-top: 40px;
	}
}
.v-enter-active,
.v-leave-active {
	transition: all 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
	transform-style: preserve-3d;
	transform: perspective(200px) rotate3d(1, 0, 0, -90deg) translate3d(0, 40px, 0);
	opacity: 0;
}
</style>
