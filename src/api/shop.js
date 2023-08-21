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

export function get_product_by_(slug, server_url) {
    return fetch(`${server_url}/shop/product/${slug}/`).then((response) => {
        if (!response.ok) throw Error("Product not found");
        return response.json();
    });
}

export function get_all_products(server_url) {
    return fetch(`${server_url}/shop/products/`).then((response) =>
        response.json()
    );
}

export function get_products_by_category_(slug, server_url) {
    return fetch(`${server_url}/shop/category/${slug}/`).then((response) =>
        response.json()
    );
}
