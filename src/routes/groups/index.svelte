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
	import GroupCard from '$lib/cards/GroupCard.svelte';

	export let groups;

	const groupExemple = [
		{
			name: '9ИСП-42-18',
			icon: 'https://4tololo.ru/sites/default/files/images/20181503125447.jpg',
			userCount: 30
		},
		{
			name: 'Дипломники 2022',
			icon: 'http://hayastannews.com/wp-content/uploads/2021/12/kak-proverit-diplom-v-antiplagiat-vuz-2-2048x1365-1.jpg',
			userCount: 10
		},
		{
			name: 'Тестовая группа',
			icon: 'https://www.pngjoy.com/pngm/177/14873604_usaf-logo-learn-about-testing-methods-transparent-png.png',
			userCount: 1
		}
	];
</script>

<section>
	<div class="container navigation">
		<h1>Группы</h1>
		<Button on:click={createGroup} icon="add" />
	</div>
	<div class="groups">
		{#each groupExemple as group}
			<GroupCard icon={group.icon} userCount={group.userCount} name={group.name} />
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
