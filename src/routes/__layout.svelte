<script>
	import Header from '../components/Header.svelte';
	import ThemeSwitsh from '../components/ThemeSwitsh.svelte';
	import { settings } from '../store/settings.store';
	import { setContext } from 'svelte';

	setContext('settings', settings);
</script>

<Header />

<main>
	<slot />
	<ThemeSwitsh />
</main>

<style>
	:global(*) {
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;
	}

	:global(body) {
		min-height: 100vh;
	}

	main {
		width: 100%;
	}
</style>
