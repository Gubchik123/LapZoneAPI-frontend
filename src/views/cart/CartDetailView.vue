<template>
	<BaseLayout title="Cart" content_title="Your shopping cart">
		<template #advanced_content>
			<Alert
				v-if="cart_products.length == 0"
				category="primary"
				message="There are no products in your cart yet"
			/>
			<div v-else class="row px-3 mb-5">
				<div class="panel-bg-color col-12 p-3 rounded">
					<div class="white-space-nowrap overflow-auto">
						<table class="table">
							<thead>
								<tr
									class="d-flex justify-content-between align-items-center border-1 border-bottom"
								>
									<th class="me-4">Image</th>
									<th>Product</th>
									<th>Unit price</th>
									<th>Quantity</th>
									<th>Price</th>
									<th>Remove</th>
								</tr>
							</thead>
							<tbody>
								<tr
                                    :key="item.product.id"
                                    v-for="item in cart_products"
									class="d-flex justify-content-between align-items-center border-1 border-bottom py-2"
								>
									<!-- Product image -->
									<td class="image-td white-space-normal me-4">
										<router-link
                                            :to="{ name: 'product', params: { slug: item.product.slug } }"
											class="opacity-1"
										>
											<img
												:src="item.product.image"
												:alt="item.product.name + ' image'"
												class="img-fluid w-100"
											/>
										</router-link>
									</td>
									<!-- Product name -->
									<td>
										<router-link
											:to="{ name: 'product', params: { slug: item.product.slug } }"
											class="fs-5 white-space-normal"
										>
											{{ item.product.name }}
										</router-link>
									</td>
									<!-- Product unit price -->
									<td class="unit_price fs-4">
										{{ item.price }}$
									</td>
									<!-- Quantity number input -->
									<td>
										<input
                                            @blur="update(item.product.id, item.quantity)"
                                            v-model.lazy="item.quantity"
											min="1"
											max="10"
											type="number"
											class="form-control text-center fs-5 me-auto ms-auto"
										/>
									</td>
									<!-- Product total price -->
									<td class="fs-4">
										{{ item.total_price }}$
									</td>
									<!-- "Remove" button -->
									<td>
										<button
                                            @click="delete_cart_product(item.product.id)"
											title="Remove"
											class="remove btn fs-6 border-0 panel-bg-color"
										>
											<ion-icon
												name="trash"
												style="color: red"
											></ion-icon>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="d-flex justify-content-between fs-4 mt-3">
						<b>Total price: </b>
						<span id="total_price"> {{ cart_total_price }}$ </span>
					</div>

					<div class="d-flex justify-content-end mt-4">
						<div>
							<router-link
								:to="{ name: 'products' }"
								class="btn btn-lg btn-primary me-3 mb-2"
							>
								Continue shopping
							</router-link>
							<!-- TODO: router-link to checkout page -->
							<a href="#" class="btn btn-lg btn-success mb-2">
								Checkout
							</a>
						</div>
					</div>
				</div>
			</div>
		</template>
	</BaseLayout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import BaseLayout from "@/layouts/BaseLayout.vue";
import Alert from "@/components/Alert.vue";

export default {
	name: "CartDetailView",
	components: { BaseLayout, Alert },
    computed: {
        ...mapGetters("cart", ["cart_products", "cart_total_price"]),
    },
    methods: {
        ...mapActions("cart", ["update_cart_product", "delete_cart_product"]),
        update(product_id, quantity) {
            if (quantity < 1) {
                alert("Minimum quantity is 1!");
                return;
            }
            if (quantity > 10) {
                alert("Maximum quantity is 10!");
                return;
            }
            this.update_cart_product({product_id, quantity});
        },
    },
};
</script>

<style scoped>
.white-space-nowrap {
	white-space: nowrap;
}
.white-space-normal {
	white-space: normal;
}

.table {
	color: var(--text-color);
}
.table td,
.table th {
	flex: 1;
	border: 0;
    min-width: 100px;
	text-align: center;
}
.table .image-td {
	width: 10%;
}
.table img {
	min-width: 100px;
}
.table input[type="number"] {
	width: 75px;
}
</style>
