import { writable } from 'svelte-local-storage-store';

export const app = writable('app', {
	user: null,
    homepage: "/home",
});
