<template>
	<header class="panel-bg-color">
		<nav class="navbar content-center panel-bg-color py-0">
			<!-- Navigation -->
			<ul class="navbar-nav list-group-horizontal">
				<li class="nav-item me-3">
					<router-link to="/" class="nav-link text-color">
						Home
					</router-link>
				</li>
				<li class="nav-item me-3">
					<a
						target="_blank"
						href="https://itish.live"
						class="nav-link text-color"
					>
						Blog
					</a>
				</li>
				<li class="nav-item me-3">
					<router-link
						:to="{ name: 'faqs' }"
						class="nav-link text-color"
					>
						FAQs
					</router-link>
				</li>
				<li class="nav-item">
					<router-link
						:to="{ name: 'about' }"
						class="nav-link text-color"
					>
						About
					</router-link>
				</li>
			</ul>
		</nav>

		<nav class="navbar navbar-expand-md panel-bg-color">
			<div class="container-fluid">
				<!-- TODO: router-link to product list page -->
				<router-link
					:to="{ name: 'products' }"
					class="navbar-brand text-color"
				>
					<h4>LapZone</h4>
				</router-link>

				<!-- Burger button -->
				<button
					type="button"
					aria-expanded="false"
					class="navbar-toggler"
					data-bs-toggle="collapse"
					aria-label="Toggle navigation"
					aria-controls="navbarSupportedContent"
					data-bs-target="#navbarSupportedContent"
				>
					<span class="navbar-toggler-icon"></span>
				</button>

				<div
					id="navbarSupportedContent"
					class="collapse navbar-collapse"
				>
					<!-- Left navbar side -->
					<ul
						class="navbar-nav list-group-horizontal-md me-md-auto justify-content-center"
					>
						<li class="nav-item me-lg-2 me-sm-4">
							<SearchForm />
						</li>
					</ul>
					<!-- Right navbar side -->
					<ul
						class="navbar-nav list-group-horizontal justify-content-between align-items-center"
					>
						<!-- Theme toggler -->
						<li class="nav-item me-5">
							<ThemeToggler />
						</li>
						<li class="nav-item d-flex">
							<!-- Link to user's cart detail page -->
							<router-link
								:to="{ name: 'cart' }"
								class="d-block text-decoration-none me-3 position-relative"
							>
								<ion-icon
									v-pre
									name="cart"
									class="pt-1"
								></ion-icon>
								<span
									style="top: 5px"
									class="position-absolute start-100 translate-middle badge rounded-pill bg-primary"
								>
									{{ cart_quantity }}
								</span>
							</router-link>
							<!-- Link to customer profile page -->
							<router-link
								:to="{ name: 'profile' }"
								class="d-block text-decoration-none"
							>
								<ion-icon
									v-pre
									class="pt-1"
									name="person-circle"
								></ion-icon>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ThemeToggler from "./ThemeToggler.vue";
import SearchForm from "./forms/SearchForm.vue";

export default {
	name: "Header",
	components: {
		SearchForm,
		ThemeToggler,
	},
	created() {
		this.get_cart_products();
		if (localStorage.getItem("token")) this.get_user();
	},
	computed: {
		...mapGetters("cart", ["cart_quantity"]),
	},
	methods: {
		...mapActions("user", ["get_user"]),
		...mapActions("cart", ["get_cart_products"]),
	},
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
	/* Bootstrap5 .md breakpoint */
	#navbarSupportedContent {
		padding: 15px 0 15px 15px;
	}
}
</style>
