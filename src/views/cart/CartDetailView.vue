<template>
	<BaseLayout title="Cart" content_title="Your shopping cart">
		<template #advanced_content>
			<div class="row px-3 mb-5">
				<div class="panel-bg-color col-12 p-3 rounded">
					<cart-table />

					<div class="d-flex justify-content-end mt-4">
						<div>
							<router-link
								:to="{ name: 'products' }"
								class="btn btn-lg btn-primary me-3 mb-2"
							>
								Continue shopping
							</router-link>
							<router-link
								:to="{ name: 'checkout' }"
								class="btn btn-lg btn-success mb-2"
							>
								Checkout
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</template>
	</BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import CartTable from "@/components/cart/CartTable.vue";

export default {
	name: "CartDetailView",
	components: { BaseLayout, CartTable },
};
</script>
