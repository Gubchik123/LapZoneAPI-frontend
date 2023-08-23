<template>
	<!-- Product image -->
	<div class="product__image w-100 mb-2">
		<router-link
			:to="{ name: 'product', params: { slug: product.slug } }"
			class="w-100 opacity-1"
		>
			<img
				loading="lazy"
				:src="product.image"
				:alt="product.name + ' image'"
				class="img-fluid w-100 rounded"
			/>
		</router-link>
	</div>
	<!-- Product name and price -->
	<div class="product__details mb-3">
		<hr class="table-group-divider" />
		<h5 class="mb-2 product__title">
			<router-link
				:to="{ name: 'product', params: { slug: product.slug } }"
				class="text-decoration-none text-center"
			>
				{{ product.name }}
			</router-link>
		</h5>
		<hr class="table-group-divider" />
		<h4>
			<b>{{ product.price }}$</b>
		</h4>
	</div>
	<!-- "Like" and "Add to cart" product buttons -->
	<div class="product__buttons d-flex justify-content-between">
		<!-- TODO: Add "Like" button if user is authenticated -->
		<cart-button :product_id="product.id" />
	</div>
</template>

<script>
import CartButton from "../buttons/CartButton.vue";

export default {
	name: "ProductCard",
    components: { CartButton },
	props: {
		product: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style>
.product {
	padding: 3%;
	margin: 5% 0;
	transition: all 0.3s;
	background-color: var(--card-bg-color);
	box-shadow: 0 0 10px var(--shadow-color);
}

.product:hover {
	box-shadow: 0 0 20px var(--shadow-color);
}
</style>
