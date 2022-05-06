<script>
	export let type = 'desktop';
	export let href;
</script>

<a {href} class={type == 'desktop' ? 'desktop' : 'mobile'}>
	{#if type == 'desktop'}
		<div class="icon"><slot name="icon" /></div>
		<div class="title"><slot name="title" /></div>
	{:else}
		<div class="icon"><slot name="icon" /></div>
	{/if}
</a>

<style>
	a {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		width: 100%;
		height: 100%;
	}

	.desktop {
		padding: 0.5rem 0;
		padding-left: 10px;
		border-radius: 5px;
	}

	.mobile {
		padding: 1rem 0;
		justify-content: space-around;
	}

	.icon {
		color: brown;
		overflow: hidden;
		height: 24px;
		width: 24px;
	}

	.title {
		color: var(--text-color);
	}

	a:hover {
		background-color: rgb(228, 228, 228);
	}
</style>
