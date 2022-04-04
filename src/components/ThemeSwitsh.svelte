<script>
	let setTheme;
	let theme = {
		light: '(prefers-color-scheme: light)',
		dark: '(prefers-color-scheme: dark)'
	};

	$: switch (setTheme) {
		case 'light':
			theme.dark = 'not-all';
			theme.light = 'all';
			break;
		case 'auto':
			theme.dark = '(prefers-color-scheme: dark)';
			theme.light = '(prefers-color-scheme: light)';
			break;
		case 'dark':
			theme.dark = 'all';
			theme.light = 'not-all';
			break;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/theme/light.css" media={theme.ligth} />
	<link rel="stylesheet" href="/theme/dark.css" media={theme.dark} />
</svelte:head>

<select bind:value={setTheme}>
	<option value="light">Светлая</option>
	<option value="dark">Тёмная</option>
	<option value="auto">Системная</option>
</select>

<!-- <button on:click={changeThemeHandler}>{themeIsLight ? '🌚' : '🌞'}</button> -->
