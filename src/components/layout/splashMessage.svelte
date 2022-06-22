<script>
	import { fly } from 'svelte/transition';

	export let message;
	export let type = null;

	const types = ['error', 'success'];
	$: if (message) {
		setTimeout(() => (message = null), 5000);
	}
</script>

{#if message}
	<div
		class="splash-message {types.includes(type) ? ` splash-${type}` : ''}"
		in:fly={{ duration: 120, y: 20 }}
		out:fly={{ duration: 120, y: 20 }}
	>
		{message}
	</div>
{/if}

<style>
	.splash-message {
		position: fixed;
        text-align: center;
		bottom: 12%;
        left: 10%;
        right: 10%;
		z-index: 50;
        font-weight: 600;
	}

	.splash-success {
        color: var(--success-color);
	}

	.splash-error {
		color: var(--error-color);
	}
</style>
