import { get_auth_headers, get_json_headers } from "./api";

export function get_carousel_images(server_url) {
	return fetch(`${server_url}/shop/carousel-images/`).then((response) =>
		response.json()
	);
}

export function get_recently_added_products(server_url) {
	return fetch(`${server_url}/shop/recently-added-products/`).then(
		(response) => response.json()
	);
}

export function get_product_by_(slug, server_url) {
	return fetch(`${server_url}/shop/product/${slug}/`).then((response) => {
		if (!response.ok) throw Error("Product not found");
		return response.json();
	});
}

export function get_products(url) {
	return fetch(url, {
        method: "GET",
        credentials: "include",
        headers: get_auth_headers(),
    }).then((response) => response.json());
}

export function add_like(product_id, server_url) {
    return fetch(`${server_url}/shop/like/`, {
        method: "POST",
        credentials: "include",
        headers: {
            ...get_json_headers(), ...get_auth_headers(),
        },
        body: JSON.stringify({product_id}),
    }).then((response) => response.json());
}
 
export function delete_like(product_id, server_url) {
    return fetch(`${server_url}/shop/like/${product_id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            ...get_json_headers(), ...get_auth_headers(),
        },
    })
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
