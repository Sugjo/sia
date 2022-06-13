import { auth } from '$lib/tools/firebase';
import { handle } from '$lib/tools/handle';
import { sendPasswordResetEmail } from 'firebase/auth';

export async function post({ request }) {
	const { email } = await request.json();
	const [, error] = await handle(sendPasswordResetEmail(auth, email));

	const errorMessages = {
		'auth/invalid-email': { input: 'email', message: 'Введите существующий Email' },
		'auth/user-not-found': { input: 'email', message: 'Пользователь не найден' },
		'auth/too-many-requests': {
			input: 'email',
			message: 'Слишком много попыток, пожалуйста, повторите попытку позже'
		}
	};

	if (error) {
		const errorMessage = errorMessages[error.code] || { input: 'other', message: error.message };

		return {
			status: 400,
			body: JSON.stringify(errorMessage)
		};
	}

	return {
		status: 200,
		body: {
			message: `Письмо сброса пароля успешно отправлено`
		}
	};
}
