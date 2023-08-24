<template>
	<BaseLayout
		v-if="product == null"
		title="Loading..."
		content_title="Loading..."
	/>
	<BaseLayout v-else :title="product.name" :content_title="product.name">
		<template #advanced_content>
			<!-- Row with product shots and the main buttons -->
			<div class="row px-3">
				<!-- Col with Bootstrap5 carousel with product shots -->
				<div class="col-lg-6 col-md-12 panel-bg-color py-3 rounded">
					<div class="w-100 h-100 d-flex content-center">
						<Carousel
							:main_image="product.image"
							:carousel_images="[]"
						/>
					</div>
				</div>
				<!-- Col with short product description and the main buttons -->
				<div
					class="col-lg-6 col-md-12 d-flex flex-column justify-content-between panel-bg-color py-4 rounded"
				>
					<!-- "Like" and "Cart" buttons -->
					<div class="d-flex mb-4">
						<!-- TODO: 
                            Add "Like" button if user is authenticated
                        -->
						<cart-button :product_id="product.id" />
					</div>
					<!-- Price and link to reviews -->
					<div
						class="d-flex justify-content-between align-items-center"
					>
						<h4>{{ product.price }}$</h4>
						<a href="#reviews">Reviews</a>
					</div>
					<hr />
					<!-- Short description -->
					<div>
						<h5>Short description</h5>
						<p
							v-html="product.description.slice(0, 100) + '...'"
						></p>
						<a
							href="#description"
							class="btn btn-outline-info d-block text-center"
						>
							Read more...
						</a>
					</div>
					<hr />
					<!-- Share buttons -->
					<div>
						<h5 class="mb-4">Share</h5>
						<div class="row share-links">
							<div
								class="col-md-6 col-sm-12 d-flex justify-content-end align-items-center"
							>
								<!-- Share link for Telegram -->
								<a
									target="_blank"
									class="float_left me-4"
									:href="
										'https://t.me/share/url?url=' +
										current_url
									"
								>
									<ion-icon
										v-pre
										name="navigate-circle"
									></ion-icon>
								</a>
								<!-- Share link for Facebook -->
								<a
									target="_blank"
									class="float_left me-4"
									:href="
										'https://www.facebook.com/sharer.php?u=' +
										current_url
									"
								>
									<ion-icon
										v-pre
										name="logo-facebook"
									></ion-icon>
								</a>
								<!-- Share link for LinkedIn -->
								<a
									target="_blank"
									class="float_left"
									:href="
										'https://www.linkedin.com/sharing/share-offsite/?url=' +
										current_url
									"
								>
									<ion-icon
										v-pre
										name="logo-linkedin"
									></ion-icon>
								</a>
							</div>
							<div
								class="col-md-6 col-sm-12 d-flex align-items-center"
							>
								<!-- Share link for Twitter -->
								<a
									target="_blank"
									class="float_left me-4"
									:href="
										'https://twitter.com/share?original_referer=' +
										current_url
									"
								>
									<ion-icon
										v-pre
										name="logo-twitter"
									></ion-icon>
								</a>
								<!-- Share link for Viber -->
								<a
									target="_blank"
									class="float_left me-4"
									:href="
										'viber://forward?text=' + current_url
									"
								>
									<ion-icon
										v-pre
										name="logo-whatsapp"
									></ion-icon>
								</a>
								<!-- Share link for Email -->
								<a
									target="_blank"
									class="float_left"
									:href="
										'mailto:?subject=Check-' +
										product.name +
										'&body=' +
										current_url
									"
								>
									<ion-icon
										v-pre
										name="mail-outline"
									></ion-icon>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<h3 id="description" class="my-3">Description</h3>

			<!-- Row with product description -->
			<div class="row px-3">
				<div class="panel-bg-color col-12 pt-4 pb-3 rounded">
					<p v-html="product.description"></p>
				</div>
			</div>

			<h3 id="reviews" class="my-3">Reviews</h3>

			<!-- Row with review form and product reviews -->
			<ProductReviews
				:product_id="product.id"
				:reviews="product.reviews"
			/>
		</template>
	</BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import BackendMixin from "@/mixins/BackendMixin.js";

import CartButton from "@/components/buttons/CartButton.vue";
import ProductReviews from "@/components/shop/ProductReviews.vue";

import { get_product_by_ } from "@/api/shop.js";

export default {
	name: "ProductDetailView",
	mixins: [BackendMixin],
	components: { BaseLayout, CartButton, ProductReviews },
	data() {
		return { product: null };
	},
	computed: {
		current_url() {
			return window.location.href;
		},
	},
	created() {
		get_product_by_(this.$route.params.slug, this.server_url)
			.then((response) => {
				this.product = response;
			})
			.catch((error) => {
				this.$router.push({ name: "error" });
			});
	},
};
</script>

<style scoped>
#productCarousel {
	width: 85%;
}

.share-links ion-icon[name="logo-facebook"],
.share-links ion-icon[name="logo-twitter"],
.share-links ion-icon[name="logo-whatsapp"],
.share-links ion-icon[name="navigate-circle"] {
	border-radius: 50%;
}
.share-links ion-icon[name="logo-linkedin"],
.share-links ion-icon[name="mail-outline"] {
	border-radius: 5px;
}
.share-links ion-icon[name="logo-linkedin"],
.share-links ion-icon[name="logo-facebook"] {
	color: #fff;
	background: darkblue;
}
.share-links ion-icon[name="logo-twitter"] {
	padding: 7px;
	font-size: 1.5em;
	color: #fff;
	background-color: #0099e9;
}
.share-links ion-icon[name="logo-whatsapp"] {
	padding: 7px;
	font-size: 1.7em;
	color: #fff;
	background-color: #8d3cd3;
}
.share-links ion-icon[name="mail-outline"] {
	color: red;
	background-color: #fff;
}
.share-links ion-icon[name="navigate-circle"] {
	color: #28a8e9;
	background-color: #fff;
}

#description,
#reviews {
	scroll-margin-top: 10px;
}

@media screen and (max-width: 768px) {
	/* Bootstrap5 .md breakpoint */
	.share-links .col-sm-12:first-child {
		margin-bottom: 10px;
	}
	.share-links .col-sm-12 {
		justify-content: center !important;
	}
}
</style>
