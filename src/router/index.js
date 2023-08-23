import { createRouter, createWebHistory } from "vue-router";

import FAQsView from "@/views/FAQsView.vue";
import AboutView from "@/views/AboutView.vue";
import ErrorView from "@/views/ErrorView.vue";

import EmailDeleteView from "@/views/mailing/EmailDeleteView.vue";

import shop_routes from "./shop_routes.js";

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
		if (localStorage.getItem("access_token")) next();
		else next({ name: "login" });
	} else next();
});

export default router;
