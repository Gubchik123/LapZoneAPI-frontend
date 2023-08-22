<template>
    <ProductListLayout 
        @order_by="order_by"
        :products="products" 
        :title="'Search results for: `' + $route.query.q + '`'"
    />
</template>

<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin";

export default {
	name: "SearchProductListView",
	mixins: [ProductListMixin],
    data() {
        return { url_suffix: `/search/?q=${this.$route.query.q}` }
    },
};
</script>
