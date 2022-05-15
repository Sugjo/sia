<script context="module">
	import { getGroups } from '$lib/user/groups/groups';

	export async function load() {
		const userGroups = await getGroups();

		console.log(userGroups);

		return {
			props: {
				groups: userGroups && (await userGroups)
			}
		};
	}
</script>

<script>
	import { createGroup } from '$lib/user/groups/groups';
	import Button from '$lib/generic/Button.svelte';
	import GroupCard from '$lib/GroupCard.svelte';

	export let groups;
</script>

<section>
	<div class="container navigation">
		<h1>Группы</h1>
		<Button on:click={createGroup}>Создать группу</Button>
	</div>
	<div class="groups">
		{#each groups as group}
			<GroupCard name={group.name} />
		{/each}
	</div>
</section>

<style>
	section {
		height: 100%;
		width: 100%;

		display: grid;
		grid-template-rows: min-content min-content;
		grid-template-areas:
			'navigation'
			'groups';
		gap: 1rem;
	}

	.navigation {
		grid-area: navigation;
		display: flex;
		justify-content: space-between;
	}

	.groups {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		padding: 1rem;
		grid-area: groups;
	}

	h1 {
		margin: 0;
	}
</style>
