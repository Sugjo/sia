<script>
	import { getContext } from 'svelte';
	const settings = getContext('settings');
</script>

<select bind:value={$settings.theme}>
	<option value="light">Светлая</option>
	<option value="dark">Тёмная</option>
	<option value="auto">Системная</option>
</select>
