<script>
	export let error;
    export let forInput;
</script>

{#if error?.forInput == forInput}
	<span class="error-message">{error.message}</span>
{/if}

<style>
	.error-message {
		color: #f93333;
		margin-bottom: 1rem;
	}
</style>
