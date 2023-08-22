import BackendMixin from "@/mixins/BackendMixin.js";
import { get_categories, get_brands } from "@/api/shop.js";

export default {
    name: "CategoriesBrandsMixin",
    mixins: [BackendMixin],
	data() {
		return {
			categories: [],
			brands: [],
		};
	},
	created() {
		get_categories(this.server_url).then((response) => {
			this.categories = response;
		});
		get_brands(this.server_url).then((response) => {
			this.brands = response;
		});
	},
};
