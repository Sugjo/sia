import { login } from "$lib/user/auth/auth";

export async function post({ body }) {
	login(body.email, body.password);
}
