<template>
    <ProductListLayout 
        @order_by="order_by"
        :products="products" 
        :title="capitalize($route.params.slug)"
    />
</template>

<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin";

export default {
	name: "ProductListByCategoryView",
	mixins: [ProductListMixin],
    data() {
        return { url_suffix: `/category/${this.$route.params.slug}/` }
    }
};
</script>
