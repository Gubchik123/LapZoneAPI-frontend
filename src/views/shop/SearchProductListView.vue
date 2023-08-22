<template>
	<ProductListLayout :products="products" />
</template>

<script>
import ProductListLayout from "@/layouts/ProductListLayout.vue";
import BackendMixin from "@/mixins/BackendMixin.js";

import { get_products_that_contains_ } from "@/api/shop.js";

export default {
	name: "SearchProductListView",
	mixins: [BackendMixin],
	components: { ProductListLayout },
	data() {
		return { products: [] };
	},
	created() {
		get_products_that_contains_(this.$route.query.q, this.server_url).then(
			(response) => {
				this.products = response.results;
			}
		);
	},
};
</script>
