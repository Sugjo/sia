<script>
	import Button from '$lib/generic/Button.svelte';
	import FlyoutButton from '$lib/generic/FlyoutButton.svelte';

	export let name;
	export let from;
	export let text;
	export let isChecked = false;

	let isExpanded = false;
	const checkHandler = () => (isChecked = !isChecked);
	const showMore = () => (isExpanded = !isExpanded);
</script>

<div class="card">
	<div class="check" on:click={checkHandler}>
		{#if isChecked}
			<span class="material-icons-outlined"> check_box </span>
		{:else}
			<span class="material-icons-outlined"> check_box_outline_blank </span>
		{/if}
	</div>
	<div class="card-body" class:isChecked>
		<div class="body-title">
			{name} из <span>{from}</span>
		</div>
		<div class={!isExpanded ? 'close' : ''} style={text ? '' : 'visibility: hidden'}>
			{text}
		</div>
	</div>
	<Button
		on:click={showMore}
		variant="hidden"
		icon={isExpanded ? 'expand_less' : 'expand_more'}
		fluid={false}
	/>

	<FlyoutButton position="left" icon="more_horiz" variant="hidden">
		<Button variant="simple" fluid>Изменить</Button>
		<Button variant="simple" fluid>Удалить</Button>
	</FlyoutButton>
</div>

<style>
	.card {
		display: grid;
		align-items: start;
		grid-template-columns: min-content 1fr min-content min-content;
		gap: 0.5rem;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		transition: 0.2s;
	}

	.body-title span {
		font-weight: 500;
		color: var(--theme-background);
	}

	.check {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: end;
		position: relative;
		width: 25px;
		height: 25px;
	}

	.isChecked {
		text-decoration: line-through;
	}

	.close {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.material-icons-outlined {
		user-select: none;
		color: var(--theme-background);
	}

	.material-icons-outlined:hover {
		color: var(--theme-background-hover);
	}
</style>
