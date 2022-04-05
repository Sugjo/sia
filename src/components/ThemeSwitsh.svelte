<script>
	import { getContext } from 'svelte';
	const settings = getContext('settings');
	let darkCss;
	let lightCss;

	$: switch ($settings.theme) {
		case 'light':
			darkCss = 'not-all';
			lightCss = 'all';
			break;
		case 'auto':
			darkCss = '(prefers-color-scheme: dark)';
			lightCss = '(prefers-color-scheme: light)';
			break;
		case 'dark':
			darkCss = 'all';
			lightCss = 'not-all';
			break;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/theme/light.css" media={lightCss} />
	<link rel="stylesheet" href="/theme/dark.css" media={darkCss} />
</svelte:head>

<!-- <button on:click={changeThemeHandler}>{themeIsLight ? '🌚' : '🌞'}</button> -->
