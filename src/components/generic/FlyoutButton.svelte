<script>
	import Button from '$lib/generic/Button.svelte';

	export let close = true;
	export let icon = null;
	export let fluid = false;
	export let disabled = false;
	export let outlined = false;
	export let variant = 'primary';
	export let position = 'center';

	let closeHandler = () => (close = !close);
	let windowClickHandler = () => {
		if (onFlyout) return;
		close = true;
	};
	let onFlyout;

	let positions = {
		left: 'left',
		right: 'right',
		center: 'center'
	};
</script>

<svelte:window on:click={windowClickHandler} />

<div
	on:mouseenter={() => (onFlyout = true)}
	on:mouseleave={() => (onFlyout = false)}
	class="flyout {positions[position]}"
>
	<Button on:click={closeHandler} {icon} {fluid} {disabled} {outlined} {variant} >
		<slot name="button" />
	</Button>
	<div class="flyout-body" class:close>
		<slot />
	</div>
</div>

<style>
	.flyout {
		display: flex;
		position: relative;
		transition: 0.2s;
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
		top: calc(100% + 0.5rem);
		padding: 0.5rem;
		z-index: 100;
		border-radius: 5px;

		background: var(--body-color);
		box-shadow: var(--app-shadow);
		border: 1px solid var(--second-color);
	}

	.close {
		display: none;
	}
</style>
