<template>
	<div class="search_form d-flex justify-content-center">
		<form
			role="search"
			action="/products/"
			class="search d-flex align-items-center"
		>
			<input
				:value="$route.query.q || ''"
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

<style scoped>
@media screen and (max-width: 576px) {
	/* Bootstrap5 .sm breakpoint */
	.search_form {
		margin-bottom: 20px;
	}
}
</style>
