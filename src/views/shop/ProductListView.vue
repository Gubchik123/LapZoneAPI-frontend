<template>
	<ProductListLayout :products="products" />
</template>

<script>
import ProductListLayout from "@/layouts/ProductListLayout.vue";
import BackendMixin from "@/mixins/BackendMixin.js";

import { get_all_products } from "@/api/shop.js";

export default {
	name: "ProductListView",
	mixins: [BackendMixin],
	components: { ProductListLayout },
	data() {
		return { products: [] };
	},
	created() {
		get_all_products(this.server_url).then((response) => {
			this.products = response.results;
		});
	},
};
</script>
