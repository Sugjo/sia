<script>
	export let href = null;
	export let icon = null;
	export let type = 'button';
	export let fluid = false;
	export let disabled = false;
	export let outlined = false;
	export let variant = 'primary';

	const variants = ['primary', 'gray', 'hidden', 'simple', 'settings', "attention"];
	if (!variants.includes(variant)) throw 'There is no such variant';
	const theme = `control-${variant}`;
</script>

{#if href}
	<a on:click {href} {disabled} class={theme} class:fluid>
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
	<button on:blur on:click {type} {disabled} class={theme} class:fluid>
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

		display: flex;
		justify-content: center;

		background-color: var(--primary-color);
		color: var(--input-text-color);

		padding: 0.5rem;
		border: none;
		border-radius: 5px;
		transition: 0.2s;
	}

	button:hover {
		background-color: var(--primary-color--hover);
		color: var(--input-text-color--hover);
	}

	button:focus {
		outline: none;
		box-shadow: var(--outline);
	}

	button:disabled {
		filter: grayscale(50%);
		cursor: not-allowed;
	}

	.button-body {
		display: flex;
		align-items: center;
		font-weight: 500;
		font-size: 17px;
	}

	button:active .button-body {
		position: relative;
		top: 1px;
	}

	.material-icons {
		font-size: 20px;
	}

	.button-body span:nth-child(2n) {
		margin-left: 0.5rem;
	}

	.fluid {
		width: 100%;
	}
</style>
