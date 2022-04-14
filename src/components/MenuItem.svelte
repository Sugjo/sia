<script>
	export let type = 'desktop';
</script>

<a href="##" class={type == 'desktop'? "desktop" : ""}>
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

		padding: 5px 20px;
	}

    .desktop {
        width: 100%;
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
