<template>
	<ProductListLayout :products="products" />
</template>

<script>
import ProductListLayout from "@/layouts/ProductListLayout.vue";
import BackendMixin from "@/mixins/BackendMixin.js";

import { get_products_by_category_ } from "@/api/shop.js";

export default {
	name: "ProductListByCategoryView",
	mixins: [BackendMixin],
	components: { ProductListLayout },
	data() {
		return { products: [] };
	},
	created() {
		get_products_by_category_(this.$route.params.slug, this.server_url).then((response) => {
			this.products = response.results;
		});
	},
};
</script>
