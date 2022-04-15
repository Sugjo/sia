import { writable } from 'svelte-local-storage-store';

const appData = {
	loggedIn: false,
	homepage: '/home'
};

export const app = writable('app', appData);

export const appToDefault = () => app.set(appData)