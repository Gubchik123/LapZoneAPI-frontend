import { get_json_headers } from "@/api/api.js";

export default {
	namespaced: true,
	state: {
		cart_products: [],
	},
	mutations: {
		UPDATE_CART_PRODUCTS(state, cart_products) {
			state.cart_products = cart_products;
		},
	},
	actions: {
		get_cart_products({ commit, getters }) {
			fetch(`${getters.server_url}/cart/`, {
                method: "GET",
                credentials: "include",
            }).then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						commit("UPDATE_CART_PRODUCTS", data);
					});
				}
			});
		},
		add_cart_product({ commit, getters }, product_id) {
			fetch(`${getters.server_url}/cart/`, {
				method: "POST",
                credentials: "include",
				headers: get_json_headers(),
				body: JSON.stringify({
					product_id: product_id,
					quantity: 1,
				}),
			}).then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						commit("UPDATE_CART_PRODUCTS", data);
					});
				}
			});
		},
        update_cart_product({ commit, getters }, { product_id, quantity }) {
            fetch(`${getters.server_url}/cart/`, {
                method: "PUT",
                credentials: "include",
                headers: get_json_headers(),
                body: JSON.stringify({
                    product_id: product_id,
                    quantity: quantity,
                }),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        commit("UPDATE_CART_PRODUCTS", data);
                    });
                }
            });
        },
		delete_cart_product({ commit, getters }, product_id) {
			fetch(`${getters.server_url}/cart/`, {
				method: "DELETE",
                credentials: "include",
				headers: get_json_headers(),
				body: JSON.stringify({ product_id: product_id }),
			}).then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						commit("UPDATE_CART_PRODUCTS", data);
					});
				}
			});
		},
	},
	getters: {
		server_url: (state, getters, rootState, rootGetters) => {
			return rootState.backend.backend_url;
		},
		cart_products: (state) => state.cart_products,
		cart_product_ids: (state) =>
			state.cart_products.map((item) => item.product.id),
		cart_total_price: (state) =>
			state.cart_products.reduce(
				(total, item) => total + item.total_price,
				0
			),
		cart_quantity: (state) =>
			state.cart_products.reduce(
				(total, product) => total + product.quantity,
				0
			),
	},
};
