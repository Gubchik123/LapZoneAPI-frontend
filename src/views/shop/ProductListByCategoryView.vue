<template>
    <ProductListLayout :products="products" />
</template>

<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin";

export default {
	name: "ProductListByCategoryView",
	mixins: [ProductListMixin],
    computed: {
        url_suffix() {
            return `/category/${this.$route.params.slug}/`
        }
    }
};
</script>
