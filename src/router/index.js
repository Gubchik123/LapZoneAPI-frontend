import { createRouter, createWebHistory } from "vue-router";

import FAQsView from "@/views/FAQsView.vue";
import AboutView from "@/views/AboutView.vue";
import ErrorView from "@/views/ErrorView.vue";

import CartDetailView from "@/views/cart/CartDetailView.vue";
import EmailDeleteView from "@/views/mailing/EmailDeleteView.vue";

import shop_routes from "./routes/shop.js";
import auth_routes from "./routes/auth.js";
import order_routes from "./routes/order.js";
import profile_routes from "./routes/profile.js";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
        // Public routes
        {
            path: "/faqs",
            name: "faqs",
            component: FAQsView
        },
        {
            path: "/about",
            name: "about",
            component: AboutView
        },
		{
			path: "/error",
			name: "error",
			component: ErrorView,
		},
        // Shop routes
        {
            path: "/",
            children: shop_routes
        },
        // Auth routes
        {
            path: "/auth",
            name: "auth",
            redirect: "/auth/signin",
            children: auth_routes
        },
        // Profile routes
        {
            path: "/profile",
            children: profile_routes,
        },
        // Order routes
        {
            path: "/order",
            name: "order",
            redirect: "/order/checkout",
            children: order_routes,
        },
        // Cart route
        {
            path: "/cart",
            name: "cart",
            component: CartDetailView,
        },
        // Mailing route
        {
            path: "/mailing/:uuid(\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12})/delete",
            name: "mailing_delete",
            component: EmailDeleteView,
        },
        // All other routes
		{
			path: "/:pathMatch(.*)*",
			redirect: "/error",
		},
    ],
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requires_auth)) {
		if (localStorage.getItem("token")) next();
		else next({ name: "signin" });
	} else next();
});

export default router;
