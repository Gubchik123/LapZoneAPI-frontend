<template>
    <a
        @click.prevent="signin"
        href="#"
        title="GitHub"
        class="btn btn-dark w-50 d-flex align-items-center github"
    >
        <ion-icon v-pre name="logo-github"></ion-icon>
        <span class="me-auto ms-auto">GitHub</span>
    </a>
</template>

<script>
import BackendMixin from "@/mixins/BackendMixin";

export default {
	name: "GitHubButton",
	mixins: [BackendMixin],
	methods: {
		signin() {
			alert("Soon")
		},
	},
};
</script>
