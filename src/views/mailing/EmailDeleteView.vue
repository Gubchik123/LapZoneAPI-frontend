<template>
	<BaseLayout
		title="Confirm unsubscribing"
		content_title="Confirm unsubscribing"
	>
		<h4>Attention!</h4>
		<div class="fs-5">
			<p>
				Are you sure you want to unsubscribe from our mailing? You'll
				miss out on the latest news and updates.
			</p>
			<form @submit.prevent="del">
				<button type="submit" class="btn btn-danger">
					Unsubscribe :(
				</button>
			</form>
		</div>
	</BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import BackendMixin from "@/mixins/BackendMixin.js";

import { delete_ } from "@/api/mailing.js";

export default {
	name: "EmailDeleteView",
    mixins: [BackendMixin],
	components: { BaseLayout },
	methods: {
		del() {
			delete_(this.$route.params.uuid, this.server_url)
				.then(() => {
					this.$router.push({ name: "home" });
				})
				.catch(() => {
					this.$router.push({ name: "error" });
				});
		},
	},
};
</script>
