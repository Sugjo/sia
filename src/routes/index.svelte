<script>
	import { getContext } from 'svelte';
	const settings = getContext('settings');

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/test">test</a>

{$settings.theme}
