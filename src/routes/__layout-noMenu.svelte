<script>
	import Header from '$lib/Header.svelte';
	import ThemeSwitsh from '$lib/ThemeSwitsh.svelte';
	import { settings } from '../store/settings.store';
	import { setContext } from 'svelte';

	setContext('settings', settings);
</script>

<ThemeSwitsh />

<Header />

<main>
	<slot />
</main>

<style>
	main {
		grid-area: main;
	}

	:global(body) {
		grid-template-rows: min-content 1fr;
	}
</style>
