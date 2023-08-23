import SignInView from "@/views/auth/SignInView.vue";

function reject_if_user_is_authenticated(to, from, next) {
    if (localStorage.getItem("token")) {
        next({ name: "home" }); // TODO: Change to profile route name
    } else next();
}

export default [
    {
        path: "signin",
        name: "signin",
        component: SignInView,
		beforeEnter: [reject_if_user_is_authenticated],
    },
]