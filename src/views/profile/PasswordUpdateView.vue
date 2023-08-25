<template>
	<ProfileLayout title="Change password">
		<form @submit.prevent="update">
			<!-- Password field -->
			<p>
				<label for="password">New password:</label>
				<input
					v-model.lazy.trim="new_password"
					@focus="confirmation = true"
					required=""
					id="password"
					type="password"
					class="form-control"
					placeholder="Password"
				/>
			</p>
			<ConfirmPasswordModal
				v-show="confirmation"
				@confirm="update"
				:error_message="error_message"
			/>
		</form>
	</ProfileLayout>
</template>

<script>
import BackendMixin from "@/mixins/BackendMixin.js";
import ProfileLayout from "@/layouts/ProfileLayout.vue";
import ConfirmPasswordModal from "@/components/profile/ConfirmPasswordModal.vue";

import { update_user_password } from "@/api/user.js";

export default {
	name: "UpdatePasswordView",
	mixins: [BackendMixin],
	components: { ProfileLayout, ConfirmPasswordModal },
	data() {
		return { new_password: "", confirmation: false, error_message: "" };
	},
	methods: {
		update(current_password) {
			if (this.new_password == current_password) {
				this.error_message = "New password must be different";
				return;
			}

			update_user_password(
				this.new_password,
				current_password,
				this.server_url
			)
				.then((response) => {
					alert("Password updated successfully!");
					this.$router.push({ name: "profile" });
				})
				.catch(
					(error) =>
						(this.error_message = "Incorrect current password")
				);
		},
	},
};
</script>
