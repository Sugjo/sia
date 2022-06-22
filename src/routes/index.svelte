<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	
	const settings = getContext('settings');

	if (browser) goto($settings.homepage || '/todo');
</script>
