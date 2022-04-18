import { goto } from '$app/navigation';
import { auth, provider } from './firebase';
import { app, appToDefault } from '../../store/app.store';
import { settings, settingsToDefault } from '../../store/settings.store';
import { get } from 'svelte/store';
import {
	sendPasswordResetEmail,
	signInWithRedirect,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signOut,
	getRedirectResult
} from 'firebase/auth';

export const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		app.update((e) => ({ ...e, loggedIn: true }));
		//TODO: загрузка пользовательских настроек
		goto(get(app).homepage || '/home');
	} catch (error) {
		return error;
	}
};

export const passwordReset = async (email) => {
	//✔
	try {
		await sendPasswordResetEmail(auth, email);
		goto('/login');
	} catch (error) {
		if (error.code == 'auth/invalid-email') return 'Введите существующий Email';
		if (error.code == 'auth/user-not-found') return 'Пользователь не найден';
		return error.message;
	}
};

export const register = async (email, password) => {
	//✔
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		login(email, password);
	} catch (error) {
		if (error.code == 'auth/email-already-in-use')
			return { forInput: 'email', message: 'Email уже используется' };
		if (error.code == 'auth/invalid-email')
			return { forInput: 'email', message: 'Введите существующий Email' };
		if (error.code == 'auth/weak-password')
			return { forInput: 'password', message: 'Пароль слишком простой' };
		return { forInput: 'other', message: error.message };
	}
};

export const logout = () => {
	//✔
	signOut(auth);
	appToDefault();
	settingsToDefault();
	goto('/login');
};

export const googleAuth = async () => {
	try {
		await signInWithRedirect(auth, provider);
	} catch (error) {
		console.error(error);
	}
};

export const googleAuthHandler = () => {
	try {
		getRedirectResult(auth);
		app.update((e) => ({ ...e, loggedIn: true }));
		goto(get(app).homepage || '/home');
	} catch (error) {
		if (error.code == 'auth/account-exists-with-different-credential')
			return 'TODO: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithpopup';
		if (error.code == 'auth/cancelled-popup-request')
			return 'Одновременно допускается только один запрос всплывающего окна';
		if (error.code == 'auth/popup-blocked') return 'Всплывающее окно было заблокировано браузером';
		if (error.code == 'auth/popup-closed-by-user') return 'Всплывающее окно закрыто пользователем';
		return error.message;
	}
};
