import { auth, provider } from '$lib/tools/firebase';
import { settings, settingsToDefault } from '../../../store/settings.store';
import { userToDefault, user as userStore } from '../../../store/user.store';
import {
	signInWithRedirect,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

const cookieSettings = {
	httpOnly: true,
	maxAge: 60 * 60 * 24 * 7,
	sameSite: 'Sia',
	path: '/'
};

export const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		//TODO: загрузка пользовательских настроек
	} catch (error) {
		return { type: 'other', message: error.message };
	}
};

export const register = async (email, password) => {
	//✔
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		login(email, password);
	} catch (error) {
		if (error.code == 'auth/email-already-in-use')
			return { type: 'email', message: 'Email уже используется' };
		if (error.code == 'auth/invalid-email')
			return { type: 'email', message: 'Введите существующий Email' };
		if (error.code == 'auth/weak-password')
			return { type: 'password', message: 'Пароль слишком простой' };
		return { type: 'other', message: error.message };
	}
};

export const googleAuth = async () => {
	try {
		let res = await signInWithRedirect(auth, provider);
		return res;
	} catch (error) {
		return { type: 'other', message: error.message };
	}
};
