import Vuex from "vuex";
// import Vue from "vue";

import backend from "./modules/backend";
import error from "./modules/error";
import shop from "./modules/shop";
import cart from "./modules/cart";
import user from "./modules/user";

// Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
        backend: backend,
		error: error,
        shop: shop,
        cart: cart,
        user: user,
	},
});

export default store;
