<template>
	<BaseLayout title="Sign Up" content_title="Sign Up">
		<p>
			Already have an account? Then please
			<router-link :to="{ name: 'signin' }">sign in</router-link>.
		</p>
        <div class="w-50">
            <Alert
                v-if="message !== null"
                :category="message.category"
                :message="message.message"
            />
        </div>
		<form @submit.prevent="submit">
			<!-- Email field -->
			<p>
				<label for="email">E-mail:</label>
				<input
                    v-model.lazy.trim="user.email"
                    @input="message = null"
					id="email"
					required=""
					type="email"
					class="form-control"
					placeholder="E-mail address"
				/>
			</p>
			<!-- Username field -->
			<p>
				<label for="username">Username:</label>
				<input
                    v-model.lazy.trim="user.username"
                    @input="message = null"
					type="text"
					required=""
					id="username"
					minlength="2"
					maxlength="150"
					class="form-control"
					placeholder="Username"
				/>
			</p>
			<!-- Password field -->
			<p>
				<label for="password1">Password:</label>
				<input
                    v-model.lazy.trim="user.password"
                    @input="message = null"
					required=""
					id="password1"
					type="password"
					class="form-control"
					placeholder="Password"
				/>
			</p>
			<!-- Password confirmation field -->
			<div>
				<label for="password2">Password (again):</label>
				<input
                    v-model.lazy.trim="user.password_again"
                    @input="message = null, password_again_error_message = ''"
					required=""
					id="password2"
					type="password"
					class="form-control"
					placeholder="Password (again)"
				/>
                <div class="text-sm text-white bg-danger w-50">
                    {{ password_again_error_message }}
                </div>
			</div>
			<!-- Sign up button -->
			<button
				type="submit"
				class="loading btn btn-success btn-lg d-block mt-3"
			>
				Sign Up »
			</button>
		</form>
	</BaseLayout>
</template>

<script>
import Alert from "@/components/Alert.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import BackendMixin from "@/mixins/BackendMixin.js";

import { signup } from "@/api/auth.js";

export default {
	name: "SignUpView",
	mixins: [BackendMixin],
	components: { Alert, BaseLayout },
	data() {
		return {
			message: null,
			password_again_error_message: "",
			user: { email: "", username: "", password: "", password_again: "" },
		};
	},
	methods: {
		submit() {
            console.log("submit1");
			if (!this._is_valid_data()) return;
            console.log("submit2");

			signup(this.user, this.server_url)
				.then(() => {
					this.$router.push({ name: "signin" });
				})
				.catch((error) => {
					this.message = {
						category: "danger",
						message:
							"User with this email or username already exists",
					};
				});
		},
		_is_valid_data() {
			if (this.user.password !== this.user.password_again) {
				this.password_again_error_message = "Passwords do not match";
				return false;
			}
			return true;
		},
	},
};
</script>
