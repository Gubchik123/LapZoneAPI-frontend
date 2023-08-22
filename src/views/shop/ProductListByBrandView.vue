<template>
    <ProductListLayout 
        @order_by="order_by"
        @change_page="change_page"
        :products="products" 
        :title="capitalize($route.params.slug) + ' products'"
    />
</template>

<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin";

export default {
	name: "ProductListByBrandView",
	mixins: [ProductListMixin],
    data() {
        return { url_suffix: `/brand/${this.$route.params.slug}/` }
    },
};
</script>
