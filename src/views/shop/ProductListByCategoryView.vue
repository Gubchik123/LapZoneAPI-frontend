<template>
    <ProductListLayout 
        :products="products" 
        :title="capitalize($route.params.slug)"
    />
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
