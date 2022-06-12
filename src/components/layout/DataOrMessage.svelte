<script>
	import { browser } from '$app/env';
	import { onMount } from 'svelte';

	export let isLoad = true;
	export let data;
	export let message;

	let frame = 0;
	const frames = ['', '.', '..', '...'];

	onMount(() => {
		if (!browser) return;
		function loadAnimation() {
			frame < 3 ? frame++ : (frame = 0);
            !isLoad && clearInterval(loadAnimetionInterval);
		}
		let loadAnimetionInterval = setInterval(loadAnimation, 300);
	});
</script>

{#if data}
	<slot />
{:else if isLoad}
	Загрузка{frames[frame]}
{:else}
	{message}
{/if}

