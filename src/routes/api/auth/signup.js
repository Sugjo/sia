import { auth } from '$lib/tools/firebase';
import { handle } from '$lib/tools/handle';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export async function post({ request }) {
	const { email, password } = await request.json();
	const [, error] = await handle(createUserWithEmailAndPassword(auth, email, password));

	const errorMessages = {
		'auth/email-already-in-use': { input: 'email', message: 'Email уже используется' },
		'auth/invalid-email': { input: 'email', message: 'Введите существующий Email' },
		'auth/weak-password': { input: 'password', message: 'Пароль слишком простой' }
	};

	if (error) {
		const errorMessage = errorMessages[error.code] || {
			input: 'other',
			message: error.message
		};

		return {
			status: 400,
			body: JSON.stringify(errorMessage)
		};
	}

	return {
		status: 200,
		body: {
			message: `Регистрация успешно завершена`
		}
	};
}
