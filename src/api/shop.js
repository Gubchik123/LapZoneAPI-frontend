export function get_carousel_images(server_url) {
	return fetch(`${server_url}/shop/carousel-images/`).then((response) =>
		response.json()
	);
}
