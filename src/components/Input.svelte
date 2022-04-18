<script context="module">
	let counter = 0;
</script>

<script>
	export let type;
	export let value;
	export let error;
	export let label;
	export let placeholder = '';
	export let required = false;

	let eltId = 'input_' + counter++;

	const handleInput = (event) => {
		value = event.target.value;
	};
</script>

<div class="input-box">
	{#if label}
		<label for={eltId}>{label}</label>
	{/if}
	<input
		{type}
		id={eltId}
		class:error
		class="input"
		{placeholder}
		{required}
		on:change={handleInput}
	/>

	{#if error}
		<small class="error-message">{error}</small>
	{/if}
</div>

<style>
	.input-box {
		display: flex;
		flex-direction: column;
	}
	.error-message {
		color: #f93333;
		margin-bottom: 1rem;
	}
</style>
