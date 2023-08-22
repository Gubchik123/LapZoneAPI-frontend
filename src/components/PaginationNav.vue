<template>
	<nav class="d-flex justify-content-center mt-4">
		<ul ref="pagination" class="pagination pagination-sm">
			<!-- Arrow to previous page -->
			<li :class="{ disabled: previous == null }" class="page-item">
				<a
					v-if="previous != null"
                    @click.prevent="go_to_previous"
					:href="get_path_from_(previous)"
					class="page-link"
				>
					&ltrif;
				</a>
				<span v-else class="page-link">&ltrif;</span>
			</li>

			<!-- Arrow to next page -->
			<li :class="{ disabled: next == null }" class="page-item">
				<a
					v-if="next != null"
					@click.prevent="go_to_next"
					:href="get_path_from_(next)"
					class="page-link"
				>
					&rtrif;
				</a>
				<span v-else class="page-link">&rtrif;</span>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: "PaginationNav",
	props: {
		next: { type: String, required: true },
		previous: { type: String, required: true },
	},
	mounted() {
		if (this.$refs.pagination) {
			this.resize_pagination_nav();
			window.addEventListener("resize", this.resize_pagination_nav);
		}
	},
	unmounted() {
		window.removeEventListener("resize", this.resize_pagination_nav);
	},
	methods: {
		resize_pagination_nav() {
			window.outerWidth >= 992
				? this.$refs.pagination.classList.add("pagination-lg")
				: this.$refs.pagination.classList.remove("pagination-lg");

			window.outerWidth <= 768
				? this.$refs.pagination.classList.add("pagination-sm")
				: this.$refs.pagination.classList.remove("pagination-sm");
		},
		get_path_from_(url) {
			const path = new URL(url);
			return path.search;
		},
		go_to_next() {
			this.$emit("change_page", new URL(this.next).search);
		},
		go_to_previous() {
			this.$emit("change_page", new URL(this.previous).search);
		},
	},
};
</script>
