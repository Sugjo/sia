<script>
	export let theme;

	let darkCss;

	$: switch (theme) {
		case 'light':
			darkCss = 'not-all';
			break;
		case 'auto':
			darkCss = '(prefers-color-scheme: dark)';
			break;
		case 'dark':
			darkCss = 'all';
			break;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/theme/dark.css" media={darkCss} />
</svelte:head>

<slot />
