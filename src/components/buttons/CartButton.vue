<template>
	<router-link
		v-if="cart_product_ids.includes(product_id)"
		:to="{ name: 'cart' }"
		class="cart btn btn-success ms-2"
	>
		<ion-icon v-pre name="cart"></ion-icon>
	</router-link>
	<button
		v-else
		@click="add_cart_product(product_id)"
		class="cart btn btn-success ms-2"
	>
		<ion-icon v-pre name="cart-outline"></ion-icon>
	</button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	name: "CartButton",
	props: {
		product_id: { type: Number, required: true },
	},
	computed: { ...mapGetters("cart", ["cart_product_ids"]) },
	methods: { ...mapActions("cart", ["add_cart_product"]) },
};
</script>
