<template>
	<div
		data-bs-ride="carousel"
		id="carouselAutoplaying"
		class="carousel my-carousel slide bg-secondary"
	>
		<!-- Carousel body (images) -->
		<div class="carousel-inner">
			<div
				v-if="main_image != null"
				data-bs-interval="5000"
				class="carousel-item active"
			>
				<img
					:src="main_image"
					class="d-block w-100"
				/>
			</div>

			<template v-if="carousel_images.length != 0">
                <div
                    :key="index"
                    v-for="(image, index) in carousel_images"
                    class="carousel-item"
                    data-bs-interval="3000"
                >
                    <a v-if="image.product_slug == null" href="#" class="opacity-1">
                        <img class="w-100" :src="image.image" />
                    </a>
                </div>
            </template>
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
export default {
	name: "Carousel",
	props: {
		main_image: { type: String, default: null },
		carousel_images: { type: Array, required: true },
	},
};
</script>

<style scoped>
.my-carousel .carousel-item img {
	max-height: 70vh;
}
</style>
