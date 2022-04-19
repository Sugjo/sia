<script context="module">
	let counter = 0;
</script>

<script>
	import { onMount } from 'svelte';
	import Error from '$lib/Error.svelte';

	export let inputType = 'text';
	export let name = '';
	export let error;
	export let label;
	export let value = '';
	export let placeholder = '';
	export let required = false;

	let eltId = 'input_' + counter++;
	let inputElement;
	onMount(() => {
		inputElement.type = inputType;
	});
</script>

<div class="input-box">
	{#if label}
		<label for={eltId}>{label}</label>
	{/if}
	<input
		id={eltId}
		class:error={error?.type == name}
		class="input"
		{placeholder}
		{required}
		bind:value
		bind:this={inputElement}
	/>

	<Error {error} {name} />
</div>

<style>
	.input-box {
		display: flex;
		flex-direction: column;
	}

	.error {
		background-color: #ffe2e2;
		border: 1px #f78a8a solid;
		color: #f93333;
	}

	.error::placeholder {
		color: #f93333;
	}

	input {
		height: 40px;

		background: #ffffff;
		border: 1px solid #d0d0d0;
		border-radius: 5px;

		padding: 10px;

		margin: 0.5rem 0;
	}

	label {
		font-size: 14px;
		color: #575757;
	}
</style>
