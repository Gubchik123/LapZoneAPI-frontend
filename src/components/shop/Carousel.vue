<template>
	<div
		data-bs-ride="carousel"
		id="carouselAutoplaying"
		class="carousel my-carousel slide bg-secondary"
	>
		<!-- Carousel body (images) -->
		<div v-if="carousel_images.length != 0" class="carousel-inner">
			<div
				:key="index"
				v-for="(image, index) in carousel_images"
				class="carousel-item"
				data-bs-interval="5000"
			>
				<a v-if="image.product_slug == null" href="#" class="opacity-1">
					<img class="w-100" :src="image.image" />
				</a>
			</div>
		</div>
        <div v-else class="carousel-inner placeholder-glow">
            <span class="placeholder col-12" style="height: 370px;"></span>
        </div>
		<!-- Button to next image -->
		<button
			type="button"
			data-bs-slide="prev"
			class="carousel-control-prev"
			data-bs-target="#carouselAutoplaying"
		>
			<span aria-hidden="true" class="carousel-control-prev-icon"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<!-- Button to previous image -->
		<button
			class="carousel-control-next"
			type="button"
			data-bs-target="#carouselAutoplaying"
			data-bs-slide="next"
		>
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>
	</div>
</template>

<script>
import BackendMixin from "@/mixins/BackendMixin.js";

import { get_carousel_images } from "@/api/shop.js";

export default {
	name: "Carousel",
	mixins: [BackendMixin],
	data() {
		return { carousel_images: [] };
	},
	created() {
		get_carousel_images(this.server_url).then((response) => {
			this.carousel_images = response;
		});
	},
};
</script>

<style scoped>
.my-carousel .carousel-item img {
	max-height: 70vh;
}
</style>
