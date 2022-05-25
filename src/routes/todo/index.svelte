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
	import TodoCard from '$lib/cards/TodoCard.svelte';
	import FlyoutButton from '$lib/generic/FlyoutButton.svelte';
	import Hr from '$lib/generic/Hr.svelte';

	export let groups;

	const todoExample = [
		{
			name: 'Экономика',
			from: '9ИСП-42-18',
			text: 'Сделать презинтацию',
			isChecked: false
		},
		{
			name: 'Диполм',
			from: 'Ваши задания',
			text: 'Сверстать ToDo страницу',
			isChecked: true
		},
		{
			name: 'Тестовое задание',
			from: 'Тестовая группа',
			text: 'Протестировать ToDo, а также протестировать переход текста на новый ряд',
			isChecked: true
		}
	];
</script>

<section>
	<div class="container navigation">
		<h1>Задания</h1>
		<Button on:click={createGroup} icon="add" />
	</div>
	<div class="sort">
		<FlyoutButton fluid>
			<div slot="button">Все</div>
			<Button fluid variant="simple">Все</Button>
			<Hr />
			<Button fluid variant="simple">Личные</Button>
			<Hr />
			<Button fluid variant="simple">Из групп</Button>
		</FlyoutButton>
	</div>
	<div class="groups">
		{#each todoExample as group}
			<TodoCard name={group.name} from={group.from} text={group.text} isChecked={group.isChecked} />
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
			'sort'
			'groups';
		gap: 1rem;
	}

	.navigation {
		grid-area: navigation;
		display: flex;
		justify-content: space-between;
	}

	.sore {
		grid-area: sort;
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
