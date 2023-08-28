import { get_json_headers, get_auth_headers } from "@/api/api.js";

export default {
	namespaced: true,
	state: {
		user: null,
	},
	mutations: {
		UPDATE_USER(state, user) {
			state.user = user;
		},
		UPDATE_USER_USERNAME(state, username) {
			state.user.username = username;
		},
		UPDATE_USER_LIKED_PRODUCT_IDS(state, liked_product_ids) {
			state.user.liked_product_ids = liked_product_ids;
		},
        ADD_LIKE(state, product_id) {
            state.user.liked_product_ids.push(product_id);
        },
        DELETE_LIKE(state, product_id) {
            state.user.liked_product_ids = state.user.liked_product_ids.filter(
                (id) => id !== product_id
            );
        }
	},
	actions: {
		get_user({ commit, getters }) {
			fetch(`${getters.server_url}/auth/users/me/`, {
				method: "GET",
				credentials: "include",
				headers: get_auth_headers(),
			}).then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						commit("UPDATE_USER", data);
					});
				}
			});
		},
        get_user_liked_product_ids({ commit, getters }) {
            fetch(
				`${getters.server_url}/profile/wish/list/ids/`,
				{
					method: "GET",
					credentials: "include",
					headers: get_auth_headers(),
				}
			).then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						commit("UPDATE_USER_LIKED_PRODUCT_IDS", data);
					});
				}
			});
        },
		update_user_email({ commit, getters }, email) {
			fetch(`${getters.server_url}/auth/users/me/`, {
				method: "PUT",
				credentials: "include",
				headers: {
					...get_json_headers(),
					...get_auth_headers(),
				},
				body: JSON.stringify({ email }),
			}).then((response) => {
				if (response.ok) {
					alert("Email updated successfully!");
					response.json().then((data) => {
						commit("UPDATE_USER", data);
					});
				}
			});
		},
		update_user_username(
			{ commit, getters },
			{ username, current_password }
		) {
			return fetch(`${getters.server_url}/auth/users/set_username/`, {
				method: "POST",
				credentials: "include",
				headers: {
					...get_json_headers(),
					...get_auth_headers(),
				},
				body: JSON.stringify({
					new_username: username,
					current_password: current_password,
				}),
			}).then((response) => {
				if (response.ok) commit("UPDATE_USER_USERNAME", username);
				else return response.json();
			});
		},
	},
	getters: {
		server_url: (state, getters, rootState, rootGetters) => {
			return rootState.backend.backend_url;
		},
		user: (state) => {
			return state.user;
		},
		user_id: (state) => {
			return state.user.id;
		},
	},
};
