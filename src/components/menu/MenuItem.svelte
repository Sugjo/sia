<script>
	import { page } from '$app/stores';

	export let type = 'desktop';
	export let href;
	$: active = $page.routeId?.includes(href.replace('/', ''));
</script>

<a {href} class={type == 'desktop' ? 'desktop' : 'mobile'} class:active>
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

		transition: 0.2s;
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
		transition: 0.2s;
		color: rgb(138, 138, 138);
		overflow: hidden;
		height: 24px;
		width: 24px;
	}

	.active .icon {
		color: brown;
	}

	.title {
		color: var(--text-color);
	}

	a.mobile:hover,
	a.mobile:focus {
		background-color: var(--theme-background-second-hover);
	}

	a.desktop:hover,
	a.mobile:focus {
		background-color: var(--theme-background-body-hover);
	}

	a:focus {
		outline: none;
		box-shadow: 0 0 0 4px #0000002f;
	}
</style>
