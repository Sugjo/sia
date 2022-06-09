import { writable } from 'svelte-local-storage-store';

const settingsData = {
	theme: 'light',
	homepage: '/todo',
	deviceType: 'mobile',
	closeModal: false
};

export const settings = writable('settings', settingsData);

export const settingsToDefault = () => settings.set(settingsData);
