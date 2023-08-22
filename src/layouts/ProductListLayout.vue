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
						<div class="dropdown mt-3 mb-2">
							<button
								aria-expanded="false"
								data-bs-toggle="dropdown"
								class="btn btn-secondary btn-lg border-1 border-light dropdown-toggle"
							>
								Ordering
							</button>
							<!-- TODO: Ordering -->
							<ul ref="ordering" class="dropdown-menu">
								<li>
									<a
										@click.prevent="
											order_by('name', 'asc', 0)
										"
										href="?orderby=name&order=asc"
										class="dropdown-item"
									>
										By name
									</a>
								</li>
								<li>
									<a
										@click.prevent="
											order_by('price', 'asc', 1)
										"
										href="#"
										class="dropdown-item"
									>
										From cheap
									</a>
								</li>
								<li>
									<a
										@click.prevent="
											order_by('price', 'desc', 2)
										"
										href="#"
										class="dropdown-item"
									>
										From expensive
									</a>
								</li>
							</ul>
						</div>

						<template v-if="products.length != 0">
							<div
								:key="product.id"
								v-for="product in products"
								class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch"
							>
								<div
									class="product w-100 d-flex flex-column justify-content-between rounded mb-3"
								>
									<ProductCard :product="product" />
								</div>
							</div>
						</template>
						<div v-else>
							<Alert
								category="primary"
								message="There are no products that match your search criteria."
							/>
						</div>

						<!-- TODO: Pagination -->
					</div>
				</div>
			</div>
		</template>
	</BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import ProductCard from "@/components/shop/ProductCard.vue";
import Alert from "@/components/Alert.vue";

export default {
	name: "ProductListLayout",
	components: { BaseLayout, ProductCard, Alert },
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
        // Script to add 'active' class to the first element of the ordering dropdown list
        this.$refs.ordering.children[0].children[0].classList.add("active");
	},
	methods: {
		order_by(order_by, order_dir, child_index) {
            for (const li of this.$refs.ordering.children) {
                li.children[0].classList.remove("active");
            }
			this.$refs.ordering.children[child_index].children[0].classList.add("active");
			this.$emit("order_by", order_by, order_dir);
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
