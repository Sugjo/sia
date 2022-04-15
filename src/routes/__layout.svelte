<script>
	import Header from '$lib/Header.svelte';
	import Menu from '$lib/Menu.svelte';
	import ThemeSwitsh from '$lib/ThemeSwitsh.svelte';
	import { settings } from '../store/settings.store';
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { app } from '../store/app.store';
	import { goto } from '$app/navigation';

	setContext('settings', settings);
	setContext('app', app);

	afterNavigate(() => {
		if (!$app.loggedIn) {
			goto('/login');
		}
	});

	let width;
	$: type = width >= 800 ? 'desktop' : 'mobile'

	onMount(() => resizeHandler());
	const resizeHandler = () => (width = window.innerWidth);
</script>

<svelte:window on:resize={resizeHandler} />

<ThemeSwitsh />

<Header />

<main>
	<slot />
</main>


<Menu {type} />

<style>
	main {
		grid-area: main;
	}

	:global(body) {
		--header-height: 78px;

		grid-template-rows: min-content 1fr min-content;
		grid-template-areas:
			'header'
			'main'
			'aside';
	}

	@media (min-width: 800px) {
		:global(body) {
			grid-template-rows: min-content 1fr;
			grid-template-columns: 1fr 3fr 1fr;
			grid-template-areas:
				'header header header'
				'aside main  .';
		}
	}
</style>
