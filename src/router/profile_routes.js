import UserDetailView from "@/views/profile/UserDetailView.vue";
import UsernameUpdateView from "@/views/profile/UsernameUpdateView.vue";

export default [
    {
        path: "",
        name: "profile",
        component: UserDetailView,
        meta: { requires_auth: true },
    },
    {
        path: "username",
        name: "update-username",
        component: UsernameUpdateView,
        meta: { requires_auth: true },
    }
]