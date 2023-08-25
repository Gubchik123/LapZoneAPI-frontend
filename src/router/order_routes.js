import OrderCheckoutView from "@/views/order/OrderCheckoutView.vue";
import OrderListView from "@/views/order/OrderListView.vue";
import OrderDetailView from "@/views/order/OrderDetailView.vue";

export default [
	{
		path: "checkout",
		name: "checkout",
		component: OrderCheckoutView,
	},
	{
		path: "list",
		name: "orders",
		component: OrderListView,
		meta: { requires_auth: true },
	},
    {
        path: ":uuid(\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12})",
        name: "order",
        component: OrderDetailView,
        meta: { requires_auth: true },
    }
];
