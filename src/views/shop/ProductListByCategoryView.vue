<template>
    <ProductListLayout 
        @order_by="order_by"
        @change_page="change_page"
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
