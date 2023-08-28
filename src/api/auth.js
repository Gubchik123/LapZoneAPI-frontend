import { get_json_headers, get_json_and_auth_headers } from "./api";

export function signin({ username, password }, server_url) {
	return _process_auth(`${server_url}/auth/token/login/`, {
		username,
		password,
	});
}

export function signup({ username, email, password }, server_url) {
	return _process_auth(`${server_url}/auth/users/`, {
		username,
		email,
		password,
	});
}

function _process_auth(url, data) {
	return fetch(url, {
		method: "POST",
		headers: get_json_headers(),
		body: JSON.stringify(data),
	}).then((response) => {
		if (!response.ok) throw new Error();
		return response.json();
	});
}

export function signout(server_url) {
	return fetch(`${server_url}/auth/token/logout/`, {
		method: "POST",
		headers: get_json_and_auth_headers(),
	});
}
