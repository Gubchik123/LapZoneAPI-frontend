<template>
    <ProductListLayout :products="products" />
</template>

<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin";

export default {
	name: "SearchProductListView",
	mixins: [ProductListMixin],
    computed: {
        url_suffix() {
            return `/search/?q=${this.$route.query.q}`
        }
    }
};
</script>
