import UserDetailView from "@/views/profile/UserDetailView.vue";
import UsernameUpdateView from "@/views/profile/UsernameUpdateView.vue";
import PasswordUpdateView from "@/views/profile/PasswordUpdateView.vue";
import UserWishListView from "@/views/profile/UserWishListView.vue";

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
    },
    {
        path: "password",
        name: "update-password",
        component: PasswordUpdateView,
        meta: { requires_auth: true },
    },
    {
        path: "wish-list",
        name: "wishes",
        component: UserWishListView,
        meta: { requires_auth: true },
    }
]