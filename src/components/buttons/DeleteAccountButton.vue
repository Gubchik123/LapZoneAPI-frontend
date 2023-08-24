<template>
	<div>
		<button
			type="button"
			@click="confirmation = true"
			class="remove btn btn-danger btn-lg mb-3"
		>
			Delete account
		</button>

		<ConfirmPasswordModal 
            v-show="confirmation"
            @confirm="del" 
            :can_cancel="true"
            @cancel="confirmation = false"
            :error_message="error_message"
        />
	</div>
</template>

<script>
import { mapMutations } from "vuex";

import BackendMixin from "@/mixins/BackendMixin.js";
import ConfirmPasswordModal from "@/components/profile/ConfirmPasswordModal.vue";

import { delete_user } from "@/api/user.js";

export default {
	name: "DeleteAccountButton",
	mixins: [BackendMixin],
    components: { ConfirmPasswordModal },
	data() {
		return { confirmation: false, error_message: "" };
	},
	methods: {
		...mapMutations("user", ["UPDATE_USER"]),
		del(current_password) {
			delete_user(current_password, this.server_url)
				.then((response) => {
					this.UPDATE_USER(null);
					localStorage.removeItem("token");
					this.$router.push({ name: "home" });
				})
				.catch((error) => (this.error_message = "Incorrect password"));
		},
	},
};
</script>
