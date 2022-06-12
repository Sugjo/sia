<script>
	export let error;
    export let name;
</script>

{#if error?.type == name}
	<small class="error-message control-error">{error.message}</small>
{/if}

<style>
	.error-message {
		color: var(--input-text-color);
		margin-bottom: 1rem;
	}
</style>
