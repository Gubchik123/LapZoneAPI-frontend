<template>
	<BaseLayout :title="title" :content_title="title">
		<template #to_right_of_content_title>
			<button @click.prevent="sign_out" class="btn btn-warning">
				Sign out
			</button>
		</template>
		<template #advanced_content>
			<div class="row px-3 mb-5 d-flex justify-content-between">
				<!-- Block with links to other pages -->
				<div class="col-lg-3 col-md-12 p-0">
					<div class="list-group">
						<router-link
							:to="{ name: 'profile' }"
							:class="{
								'active disabled': $route.name == 'profile',
							}"
							class="list-group-item list-group-item-action"
						>
							Personal details
						</router-link>
						<router-link
							:to="{ name: 'update-username' }"
							:class="{
								'active disabled':
									$route.name == 'update-username',
							}"
							class="list-group-item list-group-item-action"
						>
							Change username
						</router-link>
						<router-link
							:to="{ name: 'update-password' }"
							:class="{
								'active disabled':
									$route.name == 'update-password',
							}"
							class="list-group-item list-group-item-action"
						>
							Change password
						</router-link>
						<router-link
							:to="{ name: 'wishes' }"
							:class="{
								'active disabled': $route.name == 'wishes',
							}"
							class="list-group-item list-group-item-action content-between"
						>
							Wish list
						</router-link>
						<router-link
							:to="{ name: 'orders' }"
							:class="{
								'active disabled': $route.name == 'orders',
							}"
							class="list-group-item list-group-item-action content-between"
						>
							Order list
						</router-link>
					</div>
				</div>

				<slot></slot>
			</div>

			<slot name="adding_content"></slot>
		</template>
	</BaseLayout>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";

import BaseLayout from "@/layouts/BaseLayout.vue";
import BackendMixin from "@/mixins/BackendMixin.js";

import { signout } from "@/api/auth.js";

export default {
	name: "ProfileLayout",
	mixins: [BackendMixin],
	components: { BaseLayout },
	props: {
		title: { type: String, required: true },
	},
	created() {
        if (this.user == null)  this.get_user();
	},
	computed: {
		...mapGetters("user", ["user"]),
	},
	methods: {
		...mapActions("user", ["get_user"]),
        ...mapMutations("user", ["UPDATE_USER"]),
		sign_out() {
			signout(this.server_url).then((response) => {
                this.UPDATE_USER(null);
				localStorage.removeItem("token");
				this.$router.push({ name: "home" });
			});
		},
	},
};
</script>

<style>
#content {
	margin-right: 0;
	margin-left: 20px;
}

@media screen and (max-width: 992px) {
	/* Bootstrap5 .lg breakpoint */
	#content {
		margin-left: 0;
	}
}

@media screen and (max-width: 576px) {
	/* Bootstrap5 .sm breakpoint */
	.submit-btn {
		display: flex !important;
	}
	main .w-50 {
		width: 100% !important;
	}
}
</style>
