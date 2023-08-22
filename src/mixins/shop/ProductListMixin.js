import ProductListLayout from "@/layouts/ProductListLayout.vue";
import BackendMixin from "@/mixins/BackendMixin.js";

import { get_products } from "@/api/shop.js";

export default {
	mixins: [BackendMixin],
	components: { ProductListLayout },
	data() {
		return { products: [], url_suffix: "" };
	},
    created() {
        this.get_products(this.url);
    },
	computed: {
		url() {
            return `${this.server_url}/shop${this.url_suffix}`;
        }
	},
    methods: {
        get_products(url) {
            get_products(url).then((response) => {
                this.products = response.results;
            });
        },
        capitalize(title) {
            return title.charAt(0).toUpperCase() + title.slice(1);
        },
        order_by(order_by, order_dir) {
            this.get_products(
                this.url + `?orderby=${order_by}&orderdir=${order_dir}`
            );
        }
    }
};
