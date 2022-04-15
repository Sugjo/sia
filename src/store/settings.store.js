import { writable } from 'svelte-local-storage-store';

const settingsData = {
	theme: 'light'
}

export const settings = writable('settings', settingsData);

export const settingsToDefault = () => settings.set(settingsData)

