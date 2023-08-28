import { get_json_and_auth_headers } from "./api";

export function update_user_password(
	new_password,
	current_password,
	server_url
) {
	return _process_user("POST", `${server_url}/auth/users/set_password/`, {
		current_password,
		new_password,
	});
}

export function delete_user(current_password, server_url) {
	return _process_user("DELETE", `${server_url}/auth/users/me/`, {
		current_password,
	});
}

function _process_user(method, url, data) {
	return fetch(url, {
		method,
		headers: get_json_and_auth_headers(),
		body: JSON.stringify(data),
	}).then((response) => {
		if (!response.ok) throw new Error();
		return response.json();
	});
}
