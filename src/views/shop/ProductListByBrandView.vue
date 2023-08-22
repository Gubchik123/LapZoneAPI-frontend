<template>
    <ProductListLayout :products="products" />
</template>

<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin";

export default {
	name: "ProductListByBrandView",
	mixins: [ProductListMixin],
    computed: {
        url_suffix() {
            return `/brand/${this.$route.params.slug}/`
        }
    }
};
</script>
