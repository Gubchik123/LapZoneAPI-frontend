<template>
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
					<th v-if="is_changeable">Remove</th>
				</tr>
			</thead>
			<tbody>
				<tr
					:key="item.product.id"
					v-for="item in collection"
					class="d-flex justify-content-between align-items-center border-1 border-bottom py-2"
				>
					<!-- Product image -->
					<td class="image-td white-space-normal me-4">
						<router-link
							:to="{
								name: 'product',
								params: { slug: item.product.slug },
							}"
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
							:to="{
								name: 'product',
								params: { slug: item.product.slug },
							}"
							class="fs-5 white-space-normal"
						>
							{{ item.product.name }}
						</router-link>
					</td>
					<!-- Product unit price -->
					<td class="unit_price fs-4">{{ item.price }}$</td>
					<!-- Quantity number input -->
					<td>
						<input
                            v-if="is_changeable"
							@blur="update(item.product.id, item.quantity)"
							v-model.lazy="item.quantity"
							min="1"
							max="10"
							type="number"
							class="form-control text-center fs-5 me-auto ms-auto"
						/>
                        <span v-else class="fs-">
                            {{ item.quantity }}
                        </span>
					</td>
					<!-- Product total price -->
					<td class="fs-4">{{ item.total_price }}$</td>
					<!-- "Remove" button -->
					<td v-if="is_changeable">
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
</template>

<script>
export default {
    name: "ItemsTable",
    props: {
        collection: { type: Array, required: true },
        is_changeable: { type: Boolean, default: true },
    }
}
</script>
