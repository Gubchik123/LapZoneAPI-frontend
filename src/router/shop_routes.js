import HomeView from "@/views/shop/HomeView.vue";
import ProductDetailView from "../views/shop/ProductDetailView.vue";
import ProductListView from "../views/shop/ProductListView.vue";
import ProductListByCategoryView from "../views/shop/ProductListByCategoryView.vue";

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
    },
    {
        path: "category/:slug",
        name: "category",
        component: ProductListByCategoryView,
    }
]