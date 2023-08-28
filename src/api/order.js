import { get_json_headers, get_auth_headers } from "./api";

export function checkout(order, is_create_profile, user, server_url) {
	return fetch(`${server_url}/order/checkout/`, {
		method: "POST",
		credentials: "include",
		headers: get_json_headers(),
		body: JSON.stringify({ ...order, is_create_profile, ...user }),
	}).then((response) => {
		if (response.ok) return response.json();
		else throw Error();
	});
}

export function auth_checkout(order, server_url) {
	return fetch(`${server_url}/order/auth/checkout/`, {
		method: "POST",
		credentials: "include",
		headers: {
			...get_json_headers(),
			...get_auth_headers(),
		},
		body: JSON.stringify(order),
	}).then((response) => {
		if (response.ok) return response.json();
		else throw Error();
	});
}

export function get_orders(server_url, params) {
	return _fetch_and_get_json(`${server_url}/order/list/${params}`);
}

export function get_order_with_(id, server_url) {
	return _fetch_and_get_json(`${server_url}/order/${id}/`);
}

function _fetch_and_get_json(url) {
	return fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			...get_json_headers(),
			...get_auth_headers(),
		},
	}).then((response) => {
		if (response.ok) return response.json();
		else throw Error();
	});
}

export function remove_order_with_(id, server_url) {
	return fetch(`${server_url}/order/${id}/`, {
		method: "DELETE",
		credentials: "include",
		headers: {
			...get_json_headers(),
			...get_auth_headers(),
		},
	}).then((response) => {
		if (response.ok) return "OK";
		else throw Error();
	});
}
