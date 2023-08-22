import { mapGetters } from "vuex";

import BackendMixin from "@/mixins/BackendMixin.js";

export default {
    name: "CategoriesBrandsMixin",
    mixins: [BackendMixin],
	data() {
		return {
			categories: [], brands: [],
		};
	},
	created() {
		this.get_categories().then((data) => this.categories = data);
        this.get_brands().then((data) => this.brands = data);
	},
    methods: {
        ...mapGetters("shop", ["get_categories", "get_brands"]),
    }
};
