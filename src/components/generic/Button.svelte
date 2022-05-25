<script>
	export let href = null;
	export let icon = null;
	export let type = 'button';
	export let fluid = false;
	export let disabled = false;
	export let outlined = false;
	export let variant = 'primary';

	const variants = {
		primary: 'primary',
		hidden: 'hidden',
		simple: 'simple',
		settings: 'settings'
	};
</script>

{#if href}
	<a on:click {href} {disabled} class={variants[variant] || 'primary'} class:fluid>
		<div class="button-body">
			{#if icon}
				<span class="material-icons{outlined ? '-outlined' : ''}">{icon}</span>
			{/if}
			{#if $$slots.default}
				<span><slot /></span>
			{/if}
		</div>
	</a>
{:else}
	<button on:blur on:click {type} {disabled} class={variants[variant] || 'primary'} class:fluid>
		<div class="button-body">
			{#if icon}
				<span class="material-icons{outlined ? '-outlined' : ''}">{icon}</span>
			{/if}
			{#if $$slots.default}
				<span><slot /></span>
			{/if}
		</div>
	</button>
{/if}

<style>
	button {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;

		background: var(--theme-background);
		color: var(--theme-color);

		display: flex;
		justify-content: center;

		padding: 0.5rem;
		border: none;
		border-radius: 5px;
		transition: 0.2s;
	}

	.fluid {
		width: 100%;
	}

	.button-body {
		display: flex;
		align-items: center;
		font-weight: 500;
		font-size: 17px;
	}

	.material-icons {
		font-size: 20px;
	}

	.button-body span:nth-child(2n) {
		margin-left: 0.5rem;
	}

	button:hover {
		background-color: var(--theme-background-hover);
		color: var(--theme-color-hover);
	}

	button:focus {
		outline: none;
		box-shadow: 0 0 0 4px #0000002f;
	}

	button:disabled {
		filter: grayscale(50%);
		cursor: not-allowed;
	}

	button:active .button-body {
		position: relative;
		top: 1px;
	}
</style>
