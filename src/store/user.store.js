import { writable } from 'svelte-local-storage-store';

const settingsData = {
	uid: null
};

export const user = writable('user', settingsData);

export const userToDefault = () => user.set(settingsData);
