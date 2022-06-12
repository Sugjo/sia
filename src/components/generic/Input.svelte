<script context="module">
	let counter = 0;
</script>

<script>
	import { onMount } from 'svelte';
	import Error from '$lib/generic/Error.svelte';
	import { browser } from '$app/env';

	export let inputType = 'text';
	export let name = '';
	export let error = null;
	export let label = '';
	export let value = '';
	export let placeholder = '';
	export let required = false;
	export let isFocus = false;

	let inputElement;
	let eltId = 'input_' + counter++;

	$: isError = error?.type == name && error?.message;
	$: if (browser && isFocus) inputElement?.focus();

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
		class="{isError ? 'control-error ' : 'control-input '}input"
		{name}
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

	.input-box input {
		background-color: var(--primary-color);
		color: var(--input-text-color);
	}

	input {
		height: 40px;
		border-radius: 5px;
		padding: 10px;
		border: var(--border);
	}

	input:focus {
		outline: none;
		box-shadow: var(--outline);
	}

	label {
		font-size: 14px;
		color: var(--text-muted);
		margin-bottom: 0.5rem;
	}
</style>
