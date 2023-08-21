import { get_json_headers } from "./api";

export function add_(email, server_url) {
	return fetch(`${server_url}/mailing/`, {
		method: "POST",
		headers: get_json_headers(),
		body: JSON.stringify({ email: email }),
	}).then((response) => {
		if (!response.ok) throw new Error("Something went wrong");
		return response.json();
	});
}
