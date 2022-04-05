<script>
	import Header from '../components/Header.svelte';
	import ThemeSwitsh from '../components/ThemeSwitsh.svelte';
	import ThemeSwitchButton from '../components/ThemeSwitchButton.svelte';
    import { settings } from "../store/settings.store";
	import { setContext } from 'svelte';

	setContext('settings', settings);
</script>

<Header />

<main>
	<slot />
</main>

<ThemeSwitsh />

<ThemeSwitchButton />

<style>
</style>
