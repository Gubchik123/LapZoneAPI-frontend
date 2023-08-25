<template>
	<ProfileLayout title="All your orders">
		<div v-if="orders.results && orders.results.length != 0">
			<div class="white-space-nowrap overflow-auto">
				<table class="table">
					<thead>
						<tr
							class="d-flex justify-content-between align-items-center border-1 border-bottom"
						>
							<th class="ms-3 me-4">Order ID</th>
							<th class="me-4">Total price</th>
							<th class="me-4">Created at</th>
							<th class="me-4">Remove</th>
						</tr>
					</thead>
					<tbody>
						<tr
							:key="order.id"
							v-for="order in orders.results"
							class="d-flex justify-content-between align-items-center border-1 border-bottom py-2"
						>
							<!-- Order ID -->
							<td class="me-2">
								<router-link
									:to="`/order/${order.id}`"
									class="fs-5 white-space-normal"
								>
									{{ order.id }}
								</router-link>
							</td>
							<!-- Order total price -->
							<td class="fs-4 me-2">{{ order.total_price }}$</td>
							<!-- Order created datetime -->
							<td class="fs-5 me-2 white-space-normal">
								{{ format_date_time(order.created) }}
							</td>
							<!-- "Remove" button -->
							<td class="me-2">
								<button
									@click="remove(order.id)"
									title="Remove"
									class="remove btn fs-6 border-0 panel-bg-color"
								>
									<ion-icon
										name="trash"
										style="color: red"
									></ion-icon>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<pagination-nav
				v-if="orders.count > 12"
				@change_page="change_page"
				:next="orders.next"
				:previous="orders.previous"
			/>
		</div>
		<Alert v-else category="primary" message="You have no orders yet." />
	</ProfileLayout>
</template>

<script>
import ProfileLayout from "@/layouts/ProfileLayout.vue";
import Alert from "@/components/Alert.vue";
import PaginationNav from "@/components/PaginationNav.vue";

import DateTimeMixin from "@/mixins/DateTimeMixin.js";
import BackendMixin from "@/mixins/BackendMixin.js";

import { get_orders, remove_order_with_ } from "@/api/order.js";

export default {
	name: "OrderListView",
	mixins: [BackendMixin, DateTimeMixin],
	components: { ProfileLayout, Alert, PaginationNav },
	data() {
		return { orders: [] };
	},
	created() {
		this.get_orders();
	},
	methods: {
		get_orders(params = "") {
			get_orders(this.server_url, params).then((response) => {
				this.orders = response;
			});
		},
		remove(id) {
			if (!confirm("Are you sure?")) return;
			remove_order_with_(id, this.server_url).then((response) => {
				this.orders = this.orders.results.filter(
					(order) => order.id != id
				);
			});
		},
		change_page(params) {
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and
			history.pushState(null, document.title, params);
			this.get_orders(params);
		},
	},
};
</script>
