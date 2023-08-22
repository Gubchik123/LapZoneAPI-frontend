<script>
import ProductListMixin from "@/mixins/shop/ProductListMixin.vue";

export default {
	name: "ProductListView",
	mixins: [ProductListMixin],
    data() {
        return { url_suffix: `/products/` }
    }
};
</script>
