import UserDetailView from "@/views/profile/UserDetailView.vue";

export default [
    {
        path: "",
        name: "profile",
        component: UserDetailView,
        meta: { requires_auth: true },
    }
]