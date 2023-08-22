<template>
    <ProductListLayout 
        :products="products" 
        :title="'Search results for: `' + $route.query.q + '`'"
    />
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
