<template>
	<BaseLayout :title="title" :content_title="title">
		<template #advanced_content>
			<div class="row px-3 d-flex justify-content-between">
				<!-- Sidebar with form(s) for filtering -->
				<div class="accordion col-lg-3 col-md-12 p-0">
					<div class="accordion-item panel-bg-color text-color">
						<h2
							class="accordion-header"
							id="panelsStayOpen-headingOne"
						>
							<button
								type="button"
								aria-expanded="true"
								data-bs-toggle="collapse"
								aria-controls="panelsStayOpen-collapseOne"
								data-bs-target="#panelsStayOpen-collapseOne"
								class="accordion-button panel-bg-color text-color"
							>
								Filtering
							</button>
						</h2>
						<div
							id="panelsStayOpen-collapseOne"
							class="accordion-collapse collapse show"
							aria-labelledby="panelsStayOpen-headingOne"
						>
							<div class="accordion-body">
								<form>
									<!-- TODO: For loops -->

									<div class="d-flex justify-content-between">
										<button
											type="submit"
											class="btn btn-success btn-lg mt-3"
										>
											Filter
										</button>
										<a
											href="#"
											class="btn btn-danger btn-lg mt-3"
										>
											Clear
										</a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<!-- Block with product cards -->
				<div class="col-lg-9 col-md-12 px-0">
					<div
						id="products"
						class="min-vh-100 row panel-bg-color px-3 rounded"
					>
						<!-- Dropdown list with links for ordering -->
						<Ordering @order_by="order_by" />

						<template
							v-if="
								products.results && products.results.length != 0
							"
						>
							<div
								:key="product.id"
								v-for="product in products.results"
								class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch"
							>
								<div
									class="product w-100 d-flex flex-column justify-content-between rounded mb-3"
								>
									<ProductCard :product="product" />
								</div>
							</div>

							<pagination-nav
								v-if="products.count > 12"
								@change_page="change_page"
								:count="products.count"
								:next="products.next"
								:previous="products.previous"
							/>
						</template>
						<div v-else>
							<Alert
								category="primary"
								message="There are no products that match your search criteria."
							/>
						</div>
					</div>
				</div>
			</div>
		</template>
	</BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import Alert from "@/components/Alert.vue";
import PaginationNav from "@/components/PaginationNav.vue";

import Ordering from "@/components/shop/Ordering.vue";
import ProductCard from "@/components/shop/ProductCard.vue";

export default {
	name: "ProductListLayout",
	components: { BaseLayout, Ordering, ProductCard, PaginationNav, Alert },
	props: {
		products: { type: Array, required: true },
		title: { type: String, required: true },
	},
	mounted() {
		// Script to check window size and hide filtering Bootstrap5 collapse
		const collapseOne = new bootstrap.Collapse(
			document.getElementById("panelsStayOpen-collapseOne"),
			{ toggle: false }
		);
		if (window.innerWidth < 992) collapseOne.hide();
		else collapseOne.show();
	},
	methods: {
		order_by(order_by, order_dir) {
			this.$emit("order_by", order_by, order_dir);
		},
		change_page(params) {
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and
			history.pushState(null, document.title, params);
			this.$emit("change_page", params);
		},
	},
};
</script>

<style scoped>
#products {
	margin-left: 20px;
	margin-right: 0px;
}

@media screen and (max-width: 992px) {
	/* Bootstrap5 .lg breakpoint */
	#products {
		margin-left: 0px;
	}
}
</style>
