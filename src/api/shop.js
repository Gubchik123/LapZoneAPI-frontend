export function get_carousel_images(server_url) {
	return fetch(`${server_url}/shop/carousel-images/`).then((response) =>
		response.json()
	);
}

export function get_categories(server_url) {
	return fetch(`${server_url}/shop/categories/`).then((response) =>
		response.json()
	);
}

export function get_recently_added_products(server_url) {
	return fetch(`${server_url}/shop/recently-added-products/`).then(
		(response) => response.json()
	);
}

export function get_brands(server_url) {
	return fetch(`${server_url}/shop/brands/`).then((response) =>
		response.json()
	);
}
