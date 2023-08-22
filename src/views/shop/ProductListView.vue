<template>
    <ProductListLayout :products="products" />
</template>

<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin";

export default {
	name: "ProductListView",
	mixins: [ProductListMixin],
    computed: {
        url_suffix() {
            return `/products/`
        }
    }
};
</script>
