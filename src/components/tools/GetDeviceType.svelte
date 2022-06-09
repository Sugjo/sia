<script>
	import { getContext, onMount } from 'svelte';

	const settings = getContext('settings');
	const resizeHandler = () =>
		($settings.deviceType = window.innerWidth >= 800 ? 'desktop' : 'mobile');
	onMount(() => resizeHandler());
</script>

<svelte:window on:resize={resizeHandler} />
