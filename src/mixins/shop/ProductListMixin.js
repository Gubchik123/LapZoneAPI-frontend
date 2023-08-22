import ProductListLayout from "@/layouts/ProductListLayout.vue";
import BackendMixin from "@/mixins/BackendMixin.js";

import { get_products } from "@/api/shop.js";

export default {
	mixins: [BackendMixin],
	components: { ProductListLayout },
	data() {
		return { products: [] };
	},
	computed: {
		url() {
            return `${this.server_url}/shop${this.url_suffix}`;
        },
        url_suffix() {
            throw new Error("Must be implemented by child component");
        }
	},
	created() {
		get_products(this.url).then((response) => {
			this.products = response.results;
		});
	},
};
