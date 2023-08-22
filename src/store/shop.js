export default {
	namespaced: true,
	state: {
		categories: fetch("http://127.0.0.1:8000/api/shop/categories/").then(
            (response) => response.json()
        ),
		brands: fetch("http://127.0.0.1:8000/api/shop/brands/").then(
            (response) => response.json()
        ),
	},
	getters: {
		get_categories: (state) => {
			return state.categories;
		},
		get_brands: (state) => {
			return state.brands;
		},
	},
};
