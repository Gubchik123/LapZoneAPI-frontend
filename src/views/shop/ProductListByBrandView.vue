<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin.vue";

export default {
	name: "ProductListByBrandView",
	mixins: [ProductListMixin],
    data() {
        return { 
            url_suffix: `/brand/${this.$route.params.slug}/`,
            title: this.capitalize(this.$route.params.slug) + " products"
        }
    },
};
</script>
