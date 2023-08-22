<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin.vue";

export default {
	name: "SearchProductListView",
	mixins: [ProductListMixin],
    data() {
        return { 
            url_suffix: `/search/?q=${this.$route.query.q}`,
            title: `Search results for "${this.$route.query.q}"` 
        }
    },
};
</script>
