<template>
	<div class="dropdown mt-3 mb-2">
		<button
			aria-expanded="false"
			data-bs-toggle="dropdown"
			class="btn btn-secondary btn-lg border-1 border-light dropdown-toggle"
		>
			Ordering
		</button>
		<ul ref="ordering" class="dropdown-menu">
			<li>
				<a
					@click.prevent="order_by('name', 'asc', 0)"
					href="?orderby=name&order=asc"
					class="dropdown-item"
				>
					By name
				</a>
			</li>
			<li>
				<a
					@click.prevent="order_by('price', 'asc', 1)"
					href="?orderby=price&order=asc"
					class="dropdown-item"
				>
					From cheap
				</a>
			</li>
			<li>
				<a
					@click.prevent="order_by('price', 'desc', 2)"
					href="?orderby=price&order=desc"
					class="dropdown-item"
				>
					From expensive
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
    name: "Ordering",
    mounted() {
        const url_params = Object.fromEntries(
			new URLSearchParams(window.location.search)
		);
		const order_by = url_params.orderby;
		const order_dir = url_params.orderdir;

		if (order_by && order_dir) {
			for (const li of this.$refs.ordering.children) {
				if (
					li.children[0].href.includes(order_by) &&
					li.children[0].href.includes(order_dir)
				) {
					li.children[0].classList.add("active");
					break;
				}
			}
		} else
			this.$refs.ordering.children[0].children[0].classList.add("active");
    },
    methods: {
        order_by(order_by, order_dir, child_index) {
            history.pushState(
				null,
				document.title,
				`?orderby=${order_by}&orderdir=${order_dir}`
			);
            for (const li of this.$refs.ordering.children) 
                li.children[0].classList.remove("active");
			this.$refs.ordering.children[child_index].children[0].classList.add(
				"active"
			);
            this.$emit("order_by", order_by, order_dir);
        },
    },
};
</script>
