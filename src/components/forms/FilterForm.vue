<template>
	<div class="accordion col-lg-3 col-md-12 p-0">
		<div class="accordion-item panel-bg-color text-color">
			<h2 class="accordion-header" id="panelsStayOpen-headingOne">
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
					<form @submit.prevent="filter">
						<input
							v-model.number="min_price"
							min="0"
							step="0.01"
							type="number"
							placeholder="Min price"
							class="form-control mb-2"
						/>

						<input
							v-model.number="max_price"
							min="0"
							step="0.01"
							type="number"
							placeholder="Max price"
							class="form-control mb-2"
						/>

						<fieldset>
							<legend>Category:</legend>

							<div
								:key="category.id"
								v-for="category in categories"
							>
								<label>
									<input
										v-model.number="selected_category"
										:value="category.id"
										type="radio"
										name="category"
									/>
									{{ category.name }}
								</label>
							</div>
						</fieldset>

						<fieldset>
							<legend>Brands:</legend>

							<div style="max-height: 150px; overflow-y: scroll">
								<div :key="brand.id" v-for="brand in brands">
									<label>
										<input
											v-model="selected_brand"
											:value="brand.id"
											name="brand"
											type="radio"
										/>
										{{ brand.name }}
									</label>
								</div>
							</div>
						</fieldset>

						<fieldset>
							<legend>Years:</legend>

							<div :key="year" v-for="year in years">
								<label>
									<input
										v-model="selected_years"
										:value="year"
										:id="'years' + year"
										type="checkbox"
										name="years"
									/>
									{{ year }}
								</label>
							</div>
						</fieldset>

						<div class="d-flex justify-content-between">
							<button
								type="submit"
								class="btn btn-success btn-lg mt-3"
							>
								Filter
							</button>
							<a
								@click="clear_form"
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
</template>

<script>
import CategoriesBrandsMixin from "@/mixins/shop/CategoriesBrandsMixin.js";

export default {
	name: "FilterForm",
	mixins: [CategoriesBrandsMixin],
	props: {
		years: { type: Array, required: true },
	},
	data() {
		return {
			min_price: null,
			max_price: null,
			selected_category: null,
			selected_brand: null,
			selected_years: [],
		};
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
		filter() {
			if (
				!this.min_price &&
				!this.max_price &&
				!this.selected_brand &&
				this.selected_years.length === 0
			)
				this.$router.push({
					name: "category",
					params: {
						slug: this.categories.find(
							(c) => c.id === this.selected_category
						).slug,
					},
				});
			if (
				!this.min_price &&
				!this.max_price &&
				!this.selected_category &&
				this.selected_years.length === 0
			)
				this.$router.push({
					name: "brand",
					params: {
						slug: this.brands.find(
							(b) => b.id === this.selected_brand
						).slug,
					},
				});
			let min_year,
				max_year = "";
			if (this.selected_years.length !== 0) {
				min_year = Math.min(...this.selected_years);
				max_year = Math.max(...this.selected_years);
			}
			const params = `
            ?price_min=${this.min_price || ""}&price_max=${
				this.max_price || ""
			}&category=${this.selected_category || ""}&brand=${
				this.selected_brand || ""
			}&year_min=${min_year}&year_max=${max_year}
            `;
			history.pushState({}, null, params);
			this.$emit("filter", params.trim());
		},
		clear_form() {
			this.min_price = null;
			this.max_price = null;
			this.selected_category = null;
			this.selected_brand = null;
			this.selected_years = [];
			history.replaceState(
				{},
				document.title,
				window.location.href.split("?")[0]
			);
			this.$emit("filter", "");
		},
	},
};
</script>
