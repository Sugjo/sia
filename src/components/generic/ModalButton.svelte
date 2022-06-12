<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import Button from '$lib/generic/Button.svelte';
	import { fade, fly } from 'svelte/transition';
	import { browser } from '$app/env';

	export let title = '';
	export let icon = null;
	export let fluid = false;
	export let isOpen = false;
	export let disabled = false;
	export let outlined = false;
	export let variant = 'primary';

	const settings = getContext('settings');
	const dispatch = createEventDispatcher();

	$: if ($settings.closeModal == true) {
		console.log('close');
		$settings.closeModal = false;
		closeModal();
	}

	const closeModal = () => {
		isOpen = false;
		browser && (document.body.style = null);
		dispatch('open');
	};
	const openModal = () => {
		isOpen = true;
		browser && (document.body.style.overflow = 'hidden');
		dispatch('close');
	};
</script>

{#if isOpen}
	<div in:fade={{ duration: 300 }} out:fade={{ duration: 300 }} on:click={closeModal} class="modal">
		<div
			in:fly={{ duration: 300, y: 500 }}
			out:fly={{ duration: 300, y: 500 }}
			on:click|stopPropagation
			class="modal-dialog {$settings?.deviceType}"
		>
			<div class="modal-header">
				<div class="modal-title">{title}</div>
				<Button variant="hidden" icon="close" on:click={closeModal} />
			</div>
			<div class="modal-body">
				<slot />
			</div>
		</div>
	</div>
{/if}

{#if $$slots.button}
	<Button on:click={openModal} {icon} {fluid} {disabled} {outlined} {variant}>
		<slot name="button" />
	</Button>
{:else}
	<Button on:click={openModal} {icon} {fluid} {disabled} {outlined} {variant} />
{/if}

<style>
	.modal-title {
		font-size: larger;
	}

	.modal-body {
		padding: 0.5rem 1rem;
	}

	.modal-header {
		display: flex;
		position: sticky;
		top: 0;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 1rem;
		background-color: var(--second-color);
		box-shadow: var(--app-shadow);
		width: 100%;
		z-index: 100;
	}

	.modal-dialog {
		display: grid;
		grid-template-rows: min-content 1fr;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background-color: var(--body-color);
	}

	.dragable-line {
		display: flex;
		justify-content: center;

		width: 100%;
	}

	.modal {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;

		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(41, 41, 41, 0.808);
		z-index: 100;
	}
</style>
