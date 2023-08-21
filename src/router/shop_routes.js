import HomeView from "@/views/shop/HomeView.vue";
import ProductDetailView from "../views/shop/ProductDetailView.vue";
import ProductListView from "../views/shop/ProductListView.vue";

export default [
    {
        path: "",
        name: "home",
        component: HomeView,
    },
    {
        path: "product/:slug",
        name: "product",
        component: ProductDetailView,
    },
    {
        path: "products",
        name: "products",
        component: ProductListView,
    }
]