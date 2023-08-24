import { get_json_headers, get_auth_headers } from "./api";

export function signin({ username, password }, server_url) {
	return fetch(`${server_url}/auth/token/login/`, {
		method: "POST",
		headers: get_json_headers(),
		body: JSON.stringify({ username, password }),
	}).then((response) => {
		if (!response.ok) throw new Error();
		return response.json();
	});
}

export function signup({ username, email, password }, server_url) {
	return fetch(`${server_url}/auth/users/`, {
		method: "POST",
		headers: get_json_headers(),
		body: JSON.stringify({ username, email, password }),
	}).then((response) => {
		if (!response.ok) throw new Error();
		return response.json();
	});
}

export function signout(server_url) {
	return fetch(`${server_url}/auth/token/logout/`, {
		method: "POST",
		headers: { ...get_json_headers(), ...get_auth_headers() },
	});
}