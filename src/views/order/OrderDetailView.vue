<template>
	<BaseLayout
		v-if="order == null"
		title="Loading..."
		content_title="Loading..."
	>
		Loading...
	</BaseLayout>
	<BaseLayout
		v-else
		:title="'Order ' + order.id"
		:content_title="'Order ' + order.id"
	>
		<template #to_right_of_content_title>
			<router-link
				:to="{ name: 'orders' }"
				title="Back to order list"
				class="d-inline-flex content-center btn btn-dark opacity-75 rounded-circle border"
			>
				<ion-icon name="arrow-back-outline"></ion-icon>
			</router-link>
		</template>
		<template #default>
			<div class="d-flex align-items-center fs-4 mb-3">
				<b>Order date: </b> &nbsp;
				<span>{{ format_date_time(order.created) }}</span>
			</div>
			<div class="fs-4 mb-1">
				<b class="mb-4">Order items</b>
			</div>

			<items-table
                :collection="order.order_items"
                :is_changeable="false"
            />

			<div
				class="d-flex justify-content-between align-items-center fs-4 mt-3"
			>
				<b>Order total price: </b>
				<span>{{ order.total_price }}$</span>
			</div>
			<div class="d-flex justify-content-end mt-4">
				<button
					@click="remove(order.id)"
					class="remove btn btn-danger btn-lg"
				>
					Remove order
				</button>
			</div>
		</template>
	</BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import ItemsTable from "@/components/ItemsTable.vue";

import DateTimeMixin from "@/mixins/DateTimeMixin.js";
import BackendMixin from "@/mixins/BackendMixin.js";

import { get_order_with_, remove_order_with_ } from "@/api/order.js";

export default {
	name: "OrderDetailView",
	mixins: [BackendMixin, DateTimeMixin],
	components: { BaseLayout, ItemsTable },
	data() {
		return { order: null };
	},
	created() {
		get_order_with_(this.$route.params.uuid, this.server_url)
			.then((response) => {
				this.order = response;
			})
			.catch((error) => {
				this.$router.push({ name: "error" });
			});
	},
	methods: {
		remove(id) {
			if (!confirm("Are you sure?")) return;
			remove_order_with_(id, this.server_url).then((response) => {
				this.$router.push({ name: "orders" });
			});
		},
	},
};
</script>
