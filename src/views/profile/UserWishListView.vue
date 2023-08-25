<template>
	<ProfileLayout title="Wish list">
		<div class="col-lg-9 col-md-12 px-0">
			<div
				v-if="products.results && products.results.length != 0"
				id="content"
				class="row panel-bg-color p-3 rounded"
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
					:next="products.next"
					:previous="products.previous"
				/>
			</div>

			<div v-else>
				<Alert
					category="primary"
					message="There are no liked products yet."
				/>
			</div>
		</div>
	</ProfileLayout>
</template>

<script>
import ProfileLayout from "@/layouts/ProfileLayout.vue";
import Alert from "@/components/Alert.vue";
import PaginationNav from "@/components/PaginationNav.vue";
import ProductCard from "@/components/shop/ProductCard.vue";

import UserMixin from "@/mixins/UserMixin";
import ProductListMixin from "@/mixins/shop/ProductListMixin.vue";

export default {
	name: "UserWishListView",
	mixins: [UserMixin, ProductListMixin],
	components: {
		ProfileLayout,
		ProductCard,
		PaginationNav,
		Alert,
	},
	computed: {
		url() {
			return this.server_url + "/profile/wish/list/";
		},
	},
	methods: {
		change_page(params) {
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and
			history.pushState(null, document.title, params);
			this.get_products(this.url + params);
		},
	},
};
</script>
