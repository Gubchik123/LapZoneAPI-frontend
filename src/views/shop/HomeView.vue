<template>
	<BaseLayout title="Home" content_title="Home page">
		<template #advanced_content>
			<div class="row px-3">
				<div class="panel-bg-color col-12 p-0 rounded">
					<Carousel
						:carousel_images="carousel_images"
						main_image="https://github.com/Gubchik123/LapZoneAPI-frontend/raw/master/header.png"
					/>

					<div class="px-3 pb-5">
						<h3 class="mt-5 mb-3">Categories</h3>
						<div
							v-if="categories.length != 0"
							class="white-space-nowrap overflow-auto"
						>
							<a
								href="#"
								class="btn btn-dark d-inline-block border-1 border-light me-2 fs-6 px-4 py-2"
							>
								All products
							</a>
							<a
								:key="index"
								v-for="(category, index) in categories"
								href="{{ category.slug }}"
								class="btn btn-dark d-inline-block border-1 border-light me-2 fs-6 px-4 py-2"
							>
								{{ category.name }}
							</a>
						</div>
						<div
							v-else
							class="white-space-nowrap overflow-auto placeholder-glow"
						>
							<a
								href="#"
								class="btn btn-dark d-inline-block border-1 border-light me-2 fs-6 px-4 py-2"
							>
								All products
							</a>
							<a
								:key="category"
								v-for="category in 4"
								href="#"
								class="btn btn-dark d-inline-block border-1 border-light me-2 fs-6 px-4 py-2"
							>
								<span
									class="placeholder"
									style="width: 70px"
								></span>
							</a>
						</div>

						<h3 class="mt-5 mb-3">Recently added products</h3>
						<div
							class="white-space-nowrap overflow-auto d-flex align-items-center"
						>
							<div
								:key="index"
								v-for="(
									product, index
								) in recently_added_products"
								class="product d-inline-block d-flex flex-column justify-content-between rounded p-2 m-0 me-3"
							>
								<ProductCard :product="product" />
							</div>
						</div>

						<h3 class="mt-5 mb-3">Brands</h3>
						<div
							v-if="brands.length != 0"
							class="white-space-nowrap overflow-auto"
						>
							<a
								:key="index"
								v-for="(brand, index) in brands"
								href="{{ brand.slug }}"
								class="btn btn-dark d-inline-block border-1 border-light me-2 fs-6 px-4 py-2"
							>
								{{ brand.name }}
							</a>
						</div>
						<div
							v-else
							class="white-space-nowrap overflow-auto placeholder-glow"
						>
							<a
								:key="brand"
								v-for="brand in 5"
								href="#"
								class="btn btn-dark d-inline-block border-1 border-light me-2 fs-6 px-4 py-2"
							>
								<span
									class="placeholder"
									style="width: 70px"
								></span>
							</a>
						</div>

						<h3 class="mt-5 mb-3">
							Internet shop for selling laptops and accessories
							for them
						</h3>
						<p class="fs-5">
							Welcome to LapZone, your one-stop-shop for laptops
							and accessories. We offer a wide range of products
							to meet all your computing needs. Whether you're a
							student, a professional, or a gamer, we have
							something for everyone.
						</p>
						<p class="fs-5">
							At LapZone, we're passionate about technology and
							strive to provide our customers with the latest and
							greatest products on the market. Shop with us and
							experience top-notch customer service, fast
							shipping, and competitive prices.
						</p>
						<p class="fs-5">
							Thank you for choosing LapZone as your go-to source
							for all things tech.
						</p>
					</div>
				</div>
			</div>
		</template>
	</BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import BackendMixin from "@/mixins/BackendMixin.js";
import ProductCard from "@/components/shop/ProductCard.vue";

import {
	get_carousel_images,
	get_categories,
	get_recently_added_products,
	get_brands,
} from "@/api/shop.js";

import Carousel from "@/components/shop/Carousel.vue";

export default {
	name: "HomeView",
	mixins: [BackendMixin],
	components: { BaseLayout, Carousel, ProductCard },
	data() {
		return {
			carousel_images: [],
			recently_added_products: [],
			categories: [],
			brands: [],
		};
	},
	created() {
		get_carousel_images(this.server_url).then((response) => {
			this.carousel_images = response;
		});
		get_categories(this.server_url).then((response) => {
			this.categories = response;
		});
		get_recently_added_products(this.server_url).then((response) => {
			this.recently_added_products = response;
		});
		get_brands(this.server_url).then((response) => {
			this.brands = response;
		});
	},
};
</script>

<style>
.white-space-nowrap {
	white-space: nowrap;
}
.product__title a {
	white-space: normal !important;
}

.product {
	min-width: 250px;
}
@media screen and (max-width: 768px) {
	/* Bootstrap5 .md breakpoint */
	.product {
		min-width: 200px;
	}
}
</style>
