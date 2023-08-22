<template>
    <ProductListLayout 
        @order_by="order_by"
        @change_page="change_page"
        :products="products" 
        :title="title"
    />
</template>

<script>
import ProductListLayout from "@/layouts/ProductListLayout.vue";
import BackendMixin from "@/mixins/BackendMixin.js";

import { get_products } from "@/api/shop.js";

export default {
	mixins: [BackendMixin],
	components: { ProductListLayout },
	data() {
		return { products: [], url_suffix: "", title: "All products" };
	},
    created() {
        this.get_products(this.url + window.location.search);
    },
	computed: {
		url() {
            return `${this.server_url}/shop${this.url_suffix}`;
        }
	},
    methods: {
        get_products(url) {
            get_products(url).then((response) => {
                this.products = response;
            });
        },
        capitalize(title) {
            return title.charAt(0).toUpperCase() + title.slice(1);
        },
        order_by(order_by, order_dir) {
            this.get_products(
                this.url + `?orderby=${order_by}&orderdir=${order_dir}`
            );
        },
        change_page(params) {
            this.get_products(this.url + params);
        }
    }
};
</script>