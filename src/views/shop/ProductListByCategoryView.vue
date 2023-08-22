<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin.vue";

export default {
	name: "ProductListByCategoryView",
	mixins: [ProductListMixin],
    data() {
        return { 
            url_suffix: `/category/${this.$route.params.slug}/`,
            title: this.capitalize(this.$route.params.slug)
        }
    }
};
</script>
