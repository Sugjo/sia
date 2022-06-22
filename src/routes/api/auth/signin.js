import { auth } from '$lib/tools/firebase';
import { handle } from '$lib/tools/handle';
import { signInWithEmailAndPassword } from 'firebase/auth';

export async function post({ request }) {
	const { email, password } = await request.json();
	const [, error] = await handle(signInWithEmailAndPassword(auth, email, password));

	const errorMessages = {
		'auth/invalid-email': { input: 'email', message: 'Введите существующий Email' },
		'auth/user-not-found': { input: 'other', message: 'Неверный логин или пароль' },
		'auth/wrong-password': { input: 'other', message: 'Неверный логин или пароль' }
	}; //TODO добавить корректные сообщения

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
			message: `Авторизация успешно завершена`
		}
	};
}
