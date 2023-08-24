import { get_json_headers, get_auth_headers } from "./api";

export function update_user_password(new_password, current_password, server_url) {
    return fetch(`${server_url}/auth/users/set_password/`, {
        method: "POST",
        headers: { ...get_json_headers(), ...get_auth_headers() },
        body: JSON.stringify({ current_password, new_password }),
    }).then((response) => {
        if (!response.ok) throw new Error();
        return response;
    });
}

export function delete_user(current_password, server_url) {
    return fetch(`${server_url}/auth/users/me/`, {
        method: "DELETE",
        headers: { ...get_json_headers(), ...get_auth_headers() },
        body: JSON.stringify({ current_password }),
    }).then((response) => {
        if (!response.ok) throw new Error();
        return response;
    });
}
