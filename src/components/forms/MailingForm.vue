<template>
	<form @submit.prevent="submit">
		<div class="d-flex flex-column flex-sm-row w-100 gap-2">
			<input
				v-model="email"
				required=""
				type="email"
				name="email"
				id="id_email"
				maxlength="254"
				class="form-control"
				placeholder="Email address"
			/>

			<input
				type="submit"
				value="Subscribe"
				class="loading btn btn-primary"
			/>
		</div>
	</form>
</template>

<script>
import { mapGetters } from "vuex";

import { add_ } from "@/api/mailing.js";

export default {
	name: "MailingForm",
	data() {
		return { email: "" };
	},
	computed: {
		...mapGetters("backend", ["server_url"]),
	},
	methods: {
		submit() {
			add_(this.email, this.server_url)
				.then((response) => alert("Thank you for subscribing!"))
				.catch((error) =>
					alert("Something went wrong. Please try again later.")
				);
			this.email = "";
		},
	},
};
</script>
