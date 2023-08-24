<template>
    <BaseLayout title="Sign In" content_title="Sign In">
		<p>
			Please sign in with one of your existing third party accounts. Or,
			<router-link :to="{ name: 'signup' }">sign up</router-link>
			for a lapzone.tech account and sign in below:
		</p>
		<!-- Third party sign in links -->
		<ul class="list-unstyled">
			<!-- Google sign in link -->
			<li class="mb-3">
				<GoogleButton />
			</li>
			<!-- GitHub sign in link -->
			<li class="mb-3">
                <GitHubButton />
			</li>
		</ul>

		<div class="w-50 d-flex justify-content-center align-items-center mb-3">
			<hr class="or-divider" />
			<span class="mx-2">OR</span>
			<hr class="or-divider" />
		</div>

        <div class="w-50">
            <Alert
                v-if="message !== null"
                :category="message.category"
                :message="message.message"
            />
        </div>

		<form @submit.prevent="submit">
			<!-- Usernmae field  -->
			<p>
				<label for="username">Username:</label>
				<input
                    v-model.lazy.trim="user.username"
                    @input="message = null"
					type="text"
					required=""
					id="username"
					maxlength="150"
					class="form-control"
					placeholder="Username"
				/>
			</p>
			<!-- Password field -->
			<p>
				<label for="password">Password:</label>
				<input
                    v-model.lazy.trim="user.password"
                    @input="message = null"
					required=""
					id="ipassword"
					type="password"
					class="form-control"
					placeholder="Password"
				/>
			</p>
			<!-- Remember me checkbox -->
			<p>
				<label for="remember">Remember Me:</label>
				<input type="checkbox" name="remember" id="remember" />
			</p>
			<!-- Forgot Password link and Sign in button -->
			<div class="w-50 d-flex flex-column align-items-center mt-0">
				<a class="mb-1" href="#"> Forgot Password? </a>
				<button
					type="submit"
					class="btn btn-success btn-lg d-block mt-3"
				>
					Sign In
				</button>
			</div>
		</form>
	</BaseLayout>
</template>

<script>
import Alert from "@/components/Alert.vue";
import BaseLayout from "@/layouts/BaseLayout.vue";
import BackendMixin from "@/mixins/BackendMixin.js";

import { signin } from "@/api/auth.js";
import GoogleButton from '@/components/buttons/oauth/GoogleButton.vue';
import GitHubButton from '@/components/buttons/oauth/GitHubButton.vue';

export default {
	name: "SignInView",
    mixins: [BackendMixin],
	components: { BaseLayout, Alert, GoogleButton, GitHubButton },
    data() {
        return {
            message: null,
            user: { username: "", password: "" }
        }
    },
    methods: {
        submit() {
            signin(this.user, this.server_url)
                .then(response => {
                    localStorage.setItem("token", response.auth_token);
                    
                    if (this.$route.redirectedFrom)
                        this.$router.push(this.$route.redirectedFrom.fullPath);
                    else this.$router.push({ name: "home" }); // TODO: Change to profile route name
                })
                .catch(error => {
                    this.message = {
                        category: "danger",
                        message: "Incorrect email or password"
                    };
                });
        }
    }
};
</script>

<style>
label {
	display: block;
}

main .form-control {
	width: 50%;
}

@media screen and (max-width: 576px) {
	/* Bootstrap5 .sm breakpoint */
	main .form-control,
	main .w-50 {
		width: 100% !important;
	}
}
</style>

<style>
.btn.google,
.btn.github {
	opacity: 0.9;
	color: white;
	transition: opacity 0.3s;
}
.btn.google,
.btn.google:hover {
	background-color: #ea4335 !important;
}

.btn.github,
.btn.github:hover {
	background-color: var(--bs-dark) !important;
}

.btn.google:hover,
.btn.github:hover {
	opacity: 1;
}

.or-divider {
	height: 2px;
	border: none;
	flex-grow: 1;
	background-color: #000;
}
label[for="id_remember"] {
	display: inline-block;
}
</style>
