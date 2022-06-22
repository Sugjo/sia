<script>
	import Button from '$lib/generic/Button.svelte';
	import { getContext } from 'svelte';

	export let close = true;
	export let icon = null;
	export let fluid = false;
	export let disabled = false;
	export let outlined = false;
	export let variant = 'primary';
	export let position = 'center';

	let closeHandler = () => (close = !close);

	let bodyHeight;
	let bodyWidth;

	let positions = {
		left: 'left',
		right: 'right',
		center: 'center'
	};
</script>

<div class="flyout {positions[position]}{close ? ' closeed' : ''}">
	<div class="flyout-button">
		{#if $$slots.button}
			<Button on:click={closeHandler} {icon} {fluid} {disabled} {outlined} {variant}>
				<slot name="button" />
			</Button>
		{:else}
			<Button on:click={closeHandler} {icon} {fluid} {disabled} {outlined} {variant} />
		{/if}
	</div>
	<div class="flyout-body" class:close bind:clientHeight={bodyHeight} bind:clientWidth={bodyWidth}>
		<slot />
	</div>
	<div
		class="flyout-body-overlay"
		class:close
		style="height: calc(100% + 0.5rem + {bodyHeight}px) ; width: {bodyWidth}px"
	/>
	<div class="flyout-overlay" class:close on:mouseenter={closeHandler} />
</div>

<style>
	.flyout {
		display: flex;
		position: relative;
		transition: 0.2s;
		opacity: 1;
	}

	.flyout.right {
		justify-content: start;
	}
	.flyout.left {
		justify-content: end;
	}
	.flyout.center {
		justify-content: center;
	}

	.flyout-body {
		position: absolute;
		min-width: 100%;
		top: calc(100% + 0.5rem);
		padding: 0.5rem;
		border-radius: 5px;

		background: var(--main-color);
		box-shadow: var(--app-shadow);
		border: var(--input-border);
		z-index: 12;
	}

	.flyout-button {
		width: 100%;
		z-index: 12;
	}

	.flyout-body-overlay {
		position: absolute;
		width: 100%;
		z-index: 11;
	}

	.flyout-overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
	}

	.closeed {
		z-index: 0;
	}

	.close {
		display: none;
	}
</style>
