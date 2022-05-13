<script>
	export let href = null;
	export let icon = null;
	export let type = 'button';
	export let fluid = false;
	export let disabled = false;
	export let outlined = false;
	export let variant = 'primary';

	const variants = {
		primary: 'primary'
	};
</script>

{#if href}
	<a on:click {href} {disabled} class={variants[variant] || 'primary'} class:fluid>
		<div class="button-body">
			{#if icon}
				<span class="material-icons{outlined ? '-outlined' : ''}">{icon}</span>
			{/if}
			<slot>Кнопка</slot>
		</div>
	</a>
{:else}
	<button on:click {type} {disabled} class={variants[variant] || 'primary'} class:fluid>
		<div class="button-body">
			{#if icon}
				<span class="material-icons{outlined ? '-outlined' : ''}">{icon}</span>
			{/if}
			<slot>Кнопка</slot>
		</div>
	</button>
{/if}

<style>
	button {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;

		background: var(--background);
		color: var(--color);

		display: flex;
		justify-content: center;

		min-width: 100px;

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

	button span {
		font-size: 20px;
		margin-right: 0.5rem;
	}

	button:hover {
		background-color: var(--background-hover);
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
