<template>
	<ProfileLayout title="Change username">
		<div class="col-lg-9 col-md-12 px-0">
			<div id="content" class="panel-bg-color p-3 rounded">
				<form @submit.prevent="update">
					<!-- Username field -->
					<p>
						<label for="username">Username:</label>
						<input
							v-model.lazy.trim="user.username"
							@focus="confirmation = true"
							required=""
							type="text"
							id="username"
							maxlength="150"
							placeholder="Username"
							class="w-50 form-control mb-2"
						/>
					</p>
					<ConfirmPasswordModal
						v-show="confirmation"
						@confirm="update"
						:error_message="error_message"
					/>
				</form>
			</div>
		</div>
	</ProfileLayout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ProfileLayout from "@/layouts/ProfileLayout.vue";
import ConfirmPasswordModal from "@/components/profile/ConfirmPasswordModal.vue";

export default {
	name: "UpdateUsenameView",
	components: { ProfileLayout, ConfirmPasswordModal },
	data() {
		return { confirmation: false, error_message: "" };
	},
	computed: {
		...mapGetters("user", ["user"]),
	},
	methods: {
		...mapActions("user", ["update_user_username"]),
		update(current_password) {
            const username = this.user.username;
			this.update_user_username({username, current_password})
				.then((data) => {
					if (data && data.new_username)
						throw new Error(
							"A user with this username already exists."
						);
					else if (data && data.current_password)
						throw new Error("Incorrect password.");
					else {
                        alert("Username updated successfully!");
                        this.$router.push({ name: "profile" });    
                    }
				})
				.catch((error) => (this.error_message = error.message));
		},
	},
};
</script>
