import Vuex from "vuex";
// import Vue from "vue";

import backend from "./backend";
import error from "./error";
import shop from "./shop";
import cart from "./cart";

// Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
        backend: backend,
		error: error,
        shop: shop,
        cart: cart,
	},
});

export default store;
