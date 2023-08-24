<template>
	<a
		@click.prevent="signin"
		href="#"
		title="Google"
		class="btn btn-dark w-50 d-flex align-items-center google"
	>
		<ion-icon v-pre name="logo-google"></ion-icon>
		<span class="me-auto ms-auto">Google</span>
	</a>
</template>

<script>
import BackendMixin from "@/mixins/BackendMixin";

export default {
	name: "GoogleButton",
	mixins: [BackendMixin],
	methods: {
		signin() {
			alert("Soon")
		},
	},
};
</script>
