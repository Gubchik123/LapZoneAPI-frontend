import OrderCheckoutView from '@/views/order/OrderCheckoutView.vue'
import OrderListView from '@/views/order/OrderListView.vue'

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
        meta: { requires_auth: true }
    }
]