<script>
	import Header from '$lib/Header.svelte';
	import Menu from '$lib/Menu.svelte';
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
<Menu --header-height="78px" />

<style>
	main {
		grid-area: main;
	}

	:global(body) {
		grid-template-rows: min-content 1fr min-content;
		grid-template-columns: 1fr 3fr 1fr;
		grid-template-areas:
			'header header header'
			'. main .'
			'aside aside aside';
	}
</style>
