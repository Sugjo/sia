import { goto } from '$app/navigation';
import { auth, provider } from './firebase';
import { app, appToDefault } from '../../store/app.store';
import { settings, settingsToDefault } from '../../store/settings.store';
import { get } from 'svelte/store';
import {
	sendPasswordResetEmail,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signOut
} from 'firebase/auth';

export const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		app.update((e) => ({ ...e, loggedIn: true }));
		goto(get(app).homepage || '/home');
	} catch (error) {
		return error;
	}
};

export const passwordReset = (email) => {
	try {
		sendPasswordResetEmail(auth, email);
		goto('/login');
	} catch (error) {
		
	}
};

export const register = async (email, password) => {
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

export const logout = () => {
	signOut(auth);
	appToDefault();
	settingsToDefault();
	goto('/login');
};

export const googleAuth = async () => {
	try {
		await signInWithPopup(auth, provider);
		app.update((e) => ({ ...e, loggedIn: true }));
		goto(get(app).homepage || '/home');
	} catch (error) {}
};