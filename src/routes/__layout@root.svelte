<script>
	import Header from '$lib/generic/Header.svelte';
	import Menu from '$lib/menu/Menu.svelte';

	import { onMount } from 'svelte';

	let width;
	$: type = width >= 800 ? 'desktop' : 'mobile';

	onMount(() => resizeHandler());
	const resizeHandler = () => (width = window.innerWidth);
</script>

<svelte:window on:resize={resizeHandler} />

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
		--header-height: 62px;

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
