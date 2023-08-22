<template>
	<div class="search_form d-flex justify-content-center">
		<form @submit.prevent="search" class="search d-flex align-items-center">
			<input
				v-model.lazy.trim="search_query"
				name="q"
				type="search"
				aria-label="Title..."
				placeholder="Title..."
				class="form-control search me-2 ms-lg-3 ms-sm-0"
			/>
			<button type="submit" class="btn btn-success mt-1">Search</button>
		</form>
	</div>
</template>

<script>
export default {
	name: "SearchForm",
	data() {
		return {
			search_query: this.$route.query.q || "",
		};
	},
	methods: {
		search() {
			if (this.search_query)
				this.$router.push({
					name: "search",
					query: { q: this.search_query },
				});
		},
	},
};
</script>

<style scoped>
@media screen and (max-width: 576px) {
	/* Bootstrap5 .sm breakpoint */
	.search_form {
		margin-bottom: 20px;
	}
}
</style>
