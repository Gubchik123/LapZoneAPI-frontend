import HomeView from "@/views/shop/HomeView.vue";
import ProductDetailView from "../views/shop/ProductDetailView.vue";
import ProductListView from "../views/shop/ProductListView.vue";
import SearchProductListView from "../views/shop/SearchProductListView.vue";
import ProductListByCategoryView from "../views/shop/ProductListByCategoryView.vue";
import ProductListByBrandView from "../views/shop/ProductListByBrandView.vue";

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
        path: "search",
        name: "search",
        component: SearchProductListView,
    },
    {
        path: "category/:slug",
        name: "category",
        component: ProductListByCategoryView,
    },
    {
        path: "brand/:slug",
        name: "brand",
        component: ProductListByBrandView,
    }
]