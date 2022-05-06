<script>
	export let error;
    export let name;
</script>

{#if error?.type == name}
	<small class="error-message">{error.message}</small>
{/if}

<style>
	.error-message {
		color: #f93333;
		margin-bottom: 1rem;
	}
</style>
