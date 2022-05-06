import { writable } from 'svelte-local-storage-store';

const settingsData = {
	theme: 'light',
	homepage: '/home'
}

export const settings = writable('settings', settingsData);

export const settingsToDefault = () => settings.set(settingsData)

