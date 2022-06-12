import { login } from "$lib/user/auth/auth"; //TODO refactoring

export async function post({ body }) {
	login(body.email, body.password);
}
