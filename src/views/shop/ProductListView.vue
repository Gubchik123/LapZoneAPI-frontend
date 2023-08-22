<template>
    <ProductListLayout 
        @order_by="order_by"
        :products="products" 
        title="All products"
    />
</template>

<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin";

export default {
	name: "ProductListView",
	mixins: [ProductListMixin],
    data() {
        return { url_suffix: `/products/` }
    }
};
</script>
