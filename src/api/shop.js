import { get_json_headers } from "./api";

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

export function get_products(url) {
	return fetch(url).then((response) => response.json());
}

export function create_review(new_review, server_url) {
    return fetch(`${server_url}/shop/review/`, {
        method: "POST",
        headers: get_json_headers(),
        body: JSON.stringify({
            "name": new_review.name,
            "body": new_review.body,
            "parent": new_review.parent_id,
            "product": new_review.product_id,
        }),
    }).then((response) => response.json())
}
