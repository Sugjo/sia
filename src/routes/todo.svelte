<script context="module">
	import { auth } from '$lib/user/firebase';
	import { getDatabase, onValue } from 'firebase/database';
	import { ref } from 'firebase/database';

	export const load = async () => {
		return {
			props: {
				todoCb: function (cb = (e) => {}) {
					auth.onAuthStateChanged(async (user) => {
						if (!user?.uid) return;
						const db = getDatabase();
						const starCountRef = ref(db, 'todo/' + user?.uid);
						onValue(starCountRef, (snapshot) => {
							const data = snapshot.val();
							cb(data);
						});
					});
				}
			}
		};
	};
</script>

<script>
	import Button from '$lib/generic/Button.svelte';
	import TodoCard from '$lib/cards/TodoCard.svelte';
	import FlyoutButton from '$lib/generic/FlyoutButton.svelte';
	import Hr from '$lib/generic/Hr.svelte';
	import ModalButton from '$lib/generic/ModalButton.svelte';
	import MdEditor from '$lib/generic/MdEditor.svelte';
	import Input from '$lib/generic/Input.svelte';
	import { closeAllModal } from '$lib/tools/closeAllModal';
	import { logout } from '$lib/user/auth/auth';

	export let todoCb;

	let todoData;
	let isLoad = true;

	$: console.log(todoData);

	$: todoCb((e) => {
		todoData = e && Object.entries(e);
		isLoad = false;
	});

	let name;
	let text;
	let from = 'Gparty';
	let canSubmit = true;

	const createTodo = async () => {
		canSubmit = false;
		if (!auth.currentUser) logout();
		let req = await fetch('/api/todo', {
			method: 'POST',
			body: JSON.stringify({
				uid: auth.currentUser.uid,
				name,
				from,
				text
			})
		});
		canSubmit = true;
		closeModalHandler();
	};

	const closeModalHandler = () => {
		name = null;
		closeAllModal();
	};
</script>

<section>
	<div class="container navigation">
		<h1>Задания</h1>
		<ModalButton icon="add">
			<svelte:fragment slot="title">Добавить задание</svelte:fragment>
			<form on:submit|preventDefault={createTodo}>
				<Input bind:value={name} label="Название задания" isFocus required />
				<Input type="password" />
				<select />
				<MdEditor on:change={(e) => (text = e.detail)} />
				<div class="buttons">
					<Button on:click={closeModalHandler} variant="secondary" fluid>Отмена</Button>
					<Button type="submit" disabled={!canSubmit} fluid>Создать</Button>
				</div>
			</form>
		</ModalButton>
	</div>
	<div class="sort">
		<FlyoutButton fluid>
			<svelte:fragment slot="button">Все</svelte:fragment>
			<Button fluid variant="simple" on:click={createTodo}>Все</Button>
			<Hr />
			<Button fluid variant="simple">Личные</Button>
			<Hr />
			<Button fluid variant="simple">Из групп</Button>
		</FlyoutButton>
	</div>
	<div class="groups">
		{#if todoData}
			{#each todoData as items}
				<TodoCard
					id={items[0]}
					name={items[1].name}
					from={items[1].from}
					text={items[1].text}
					isChecked={items[1].isChecked}
				/>
			{/each}
		{:else if isLoad}
			Загрузка...
		{:else}
			Заданий нет!
		{/if}
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

	.buttons {
		position: fixed;
		display: flex;
		background-color: var(--second-color);
		box-shadow: var(--app-shadow);
		gap: 0.5rem;
		width: 100%;
		padding: 0.5rem 2rem;
		bottom: 0;
		left: 0;
	}

	.navigation {
		grid-area: navigation;
		display: flex;
		justify-content: space-between;
	}

	form {
		display: grid;
		grid-template-rows: min-content min-content min-content;
		height: 100%;
		gap: 0.5rem;
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
