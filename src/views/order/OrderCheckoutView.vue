<template>
	<BaseLayout title="Checkout" content_title="Checkout">
		<template #advanced_content>
			<div class="row px-3">
				<div class="panel-bg-color col-12 p-3 mb-3 rounded">
					<form @submit.prevent="submit">
						<div v-if="!is_user_authenticated">
							<div id="is_create_profile" class="mb-2">
								<input
									v-model="is_create_profile"
									type="checkbox"
									id="checkbox"
									class="d-inline-block me-2"
								/>
								<label for="checkbox" class="d-inline-block">
									Create a profile automatically
								</label>
							</div>
							<div v-if="is_create_profile">
								<!-- Username field -->
								<p>
									<label for="username">* Username:</label>
									<input
										v-model.lazy.trim="user.username"
										required=""
										type="text"
										id="username"
										maxlength="150"
										placeholder="Username"
										class="w-50 form-control mb-2"
									/>
								</p>
								<!-- Password field -->
								<p>
									<label for="password">* Password:</label>
									<input
										v-model.lazy.trim="user.password"
										required=""
										id="password"
										type="password"
										maxlength="128"
										placeholder="Password"
										class="w-50 form-control mb-2"
									/>
								</p>
								<hr class="mt-4 mb-3" />
							</div>
						</div>
						<!-- First name field -->
						<p>
							<label for="first_name">* First name:</label>
							<input
								v-model.lazy.trim="order.first_name"
								required=""
								type="text"
								maxlength="150"
								id="first_name"
								placeholder="First name"
								class="w-50 form-control mb-2"
							/>
						</p>
						<!-- Last name field -->
						<p>
							<label for="last_name">* Last name:</label>
							<input
								v-model.lazy.trim="order.last_name"
								required=""
								type="text"
								id="last_name"
								maxlength="150"
								placeholder="Last name"
								class="w-50 form-control mb-2"
							/>
						</p>
						<!-- Phone number field -->
						<p>
							<label for="phone_number">* Phone number:</label>
							<input
								v-model.lazy.trim="order.phone_number"
								required=""
								type="text"
								maxlength="30"
								id="phone_number"
								placeholder="+380501234567"
								class="w-50 form-control mb-2"
							/>
						</p>
						<!-- Email field -->
						<p>
							<label for="email">* Email address:</label>
							<input
								v-model.lazy.trim="order.email"
								id="email"
								required=""
								type="email"
								maxlength="254"
								class="w-50 form-control mb-2"
								placeholder="Where should we send the receipt?"
							/>
						</p>
						<!-- Address field -->
						<p>
							<label for="address">* Address:</label>
							<input
								v-model.lazy.trim="order.address"
								required=""
								type="text"
								id="address"
								maxlength="255"
								class="w-50 form-control mb-2"
								placeholder="City, Street Name, House name / Flat number, Postcode"
							/>
						</p>
						<!-- Order comment field -->
						<p>
							<label for="order_comment">
								Order comment (optional):
							</label>
							<textarea
								v-model.lazy.trim="order.comment"
								cols="40"
								rows="10"
								maxlength="255"
								id="order_comment"
								class="w-50 form-control mb-2"
								placeholder="Optional comment to seller"
							></textarea>
						</p>
						<!-- Submit order button -->
						<button
							type="submit"
							class="btn btn-success btn-lg mt-3"
						>
							Checkout
						</button>
					</form>
				</div>

				<div class="panel-bg-color col-12 p-3 rounded">
					<cart-table />
				</div>
			</div>
		</template>
	</BaseLayout>
</template>

<script>
import { mapMutations } from "vuex";

import BaseLayout from "@/layouts/BaseLayout.vue";
import BackendMixin from "@/mixins/BackendMixin";
import CartTable from "@/components/cart/CartTable.vue";

import { checkout, auth_checkout } from "@/api/order.js";

export default {
	name: "OrderCheckoutView",
	mixins: [BackendMixin],
	components: { BaseLayout, CartTable },
	data() {
		return {
			is_create_profile: false,
			user: { username: "", password: "" },
			order: {
				first_name: "",
				last_name: "",
				phone_number: "",
				email: "",
				address: "",
				comment: "",
			},
		};
	},
	computed: {
		is_user_authenticated() {
			return localStorage.getItem("token") ? true : false;
		},
	},
	methods: {
		...mapMutations("cart", ["UPDATE_CART_PRODUCTS"]),
		submit() {
			console.log("submit");

			if (this.is_user_authenticated)
				auth_checkout(this.order, this.server_url).then((response) => {
					this._update_cart_products();

					this.$router.push(`/order/${response.id}`)
				});
			else
				checkout(
					this.order,
					this.is_create_profile,
					this.user,
					this.server_url
				).then((response) => {
					this._update_cart_products();

					if (this.is_create_profile)
						this.$router.push({ name: "sigin" });
					else {
						alert(response.message);
						this.$router.push({ name: "home" });
					}
				});
		},
		_update_cart_products() {
			this.UPDATE_CART_PRODUCTS([]);
		},
	},
};
</script>

<style scoped>
textarea {
	height: 150px;
}

@media screen and (max-width: 576px) {
	/* Bootstrap5 .sm breakpoint */
	.form-control {
		width: 100% !important;
	}
}
</style>
