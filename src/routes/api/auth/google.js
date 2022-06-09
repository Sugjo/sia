import { googleAuth } from '$lib/user/auth/auth';
import { getRedirectResult } from 'firebase/auth';

export async function post() {
	try {
		let res = await googleAuth();
		if (res) {
			return {
				status: 200,
				body: {
					message: JSON.stringify(res)
				}
			};
		}
	} catch (error) {
		return {
			status: 409,
			body: {
				message: JSON.stringify(error.message)
			}
		};
	}
}
