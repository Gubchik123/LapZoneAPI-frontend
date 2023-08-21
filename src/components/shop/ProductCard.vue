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
		<!-- TODO: 
            Add "Like" button if user is authenticated
            Add checking if product is in cart
        -->
		<button
			class="cart btn btn-success ms-2"
			data-product_id="{{ product.id }}"
		>
			<ion-icon name="cart-outline"></ion-icon>
		</button>
	</div>
</template>

<script>
export default {
	name: "ProductCard",
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
