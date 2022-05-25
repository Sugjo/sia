import { googleAuth, googleAuthHandler } from '$lib/user/auth/auth';

export async function post() {
	try {
		let res = googleAuth();
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
				message: error.message
			}
		};
	}
}

export async function get() {
	googleAuthHandler();

	return {
		status: 200,
		body: {
			result: await getUserToken(),
			message: 'auth success'
		}
	};
}
