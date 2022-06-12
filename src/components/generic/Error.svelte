<script>
	export let error;
	export let name;
</script>

{#if error?.input == name}
	<small class="error-message control-error">{error.message}</small>
{/if}

<style>
	.error-message {
		color: var(--input-text-color);
	}
</style>
