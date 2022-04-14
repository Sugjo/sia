<script>
	import Header from '$lib/Header.svelte';
	import Menu from '$lib/Menu.svelte';
	import ThemeSwitsh from '$lib/ThemeSwitsh.svelte';
	import { settings } from '../store/settings.store';
	import { onMount, setContext } from 'svelte';

	setContext('settings', settings);

	let width;

	function resizeHandler() {
		width = window.innerWidth
	}

	onMount(() => {
		resizeHandler();
	});
</script>

<svelte:window on:resize={resizeHandler} />

<ThemeSwitsh />

<Header />

<main>
	<slot />
</main>

<Menu type={width >= 800 ? 'desktop' : 'mobile'} />

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
