import { goto } from '$app/navigation';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';
import { app, appToDefault } from '../../store/app.store';
import { settings, settingsToDefault } from '../../store/settings.store';
import { get } from 'svelte/store';

export const login = () => {}

export const register = () => {}

export const logout = () => {
	appToDefault();
	settingsToDefault();
	goto('/home');
}

export const google = async () => {
    await signInWithPopup(auth, provider)
	app.update(e => ({...e, loggedIn: true}))
    goto(get(app).homepage || "/home");
}
