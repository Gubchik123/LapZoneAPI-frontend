import { get_json_headers } from "./api";

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
