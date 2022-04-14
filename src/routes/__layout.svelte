<script>
	import Header from '$lib/Header.svelte';
	import Menu from '$lib/Menu.svelte';
	import ThemeSwitsh from '$lib/ThemeSwitsh.svelte';
	import { onMount } from 'svelte';

	let width;

	onMount(() => resizeHandler());
	const resizeHandler = () => width = window.innerWidth
</script>


<ThemeSwitsh />

<Header />

<main>
	<slot />
</main>

<svelte:window on:resize={resizeHandler} />
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
