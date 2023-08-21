import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [],
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requires_auth)) {
		if (localStorage.getItem("access_token")) next();
		else next({ name: "login" });
	} else next();
});

export default router;
