<script>
	import Header from '$lib/Header.svelte';
	import Menu from '$lib/Menu.svelte';
	import ThemeSwitsh from '$lib/ThemeSwitsh.svelte';
	import { settings } from '../store/settings.store';
	import { setContext } from 'svelte';

	setContext('settings', settings);
</script>

<Header />

<main>
	<slot />
	<ThemeSwitsh />
</main>

<Menu />

<style>
</style>
