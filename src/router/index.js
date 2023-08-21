import { createRouter, createWebHistory } from "vue-router";

import FAQsView from "@/views/FAQsView.vue";
import AboutView from "@/views/AboutView.vue";

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
    ],
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requires_auth)) {
		if (localStorage.getItem("access_token")) next();
		else next({ name: "login" });
	} else next();
});

export default router;
