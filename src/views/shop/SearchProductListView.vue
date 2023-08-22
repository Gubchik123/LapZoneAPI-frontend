<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin.vue";

export default {
	name: "SearchProductListView",
	mixins: [ProductListMixin],
    data() {
        return { 
            url_suffix: `/search/`,
            title: `Search results for "${this.$route.query.q}"` 
        }
    },
    watch: {
        "$route.query.q"() {
            this.get_products(`${this.url}?q=${this.$route.query.q}`);
        }
    }
};
</script>
