<script context="module">
	import { auth } from '$lib/tools/firebase';
	import { getDatabase, onValue } from 'firebase/database';
	import { ref } from 'firebase/database';

	export const load = async () => {
		return {
			props: {
				todoCb: function (cb = (e) => {}) {
					auth.onAuthStateChanged((user) => {
						if (!user?.uid) return;
						const todoRef = ref(getDatabase(), 'todo/' + user?.uid);
						onValue(todoRef, (todoData) => {
							const data = todoData.val();
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
	import DefaultPage from '$lib/layout/DefaultPage.svelte';

	//Get ToDo data

	export let todoCb;

	todoCb((e) => {
		todoData = e && Object.entries(e);
		isLoad = false;
	});

	let todoData;

	let name;
	let text;
	let from = 'Gparty';

	let isLoad = true;
	let canSubmit = true;

	const createTodo = async () => {
		if (!auth.currentUser) return;
		canSubmit = false;
		await fetch('/api/todo', {
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

<DefaultPage title="Задания">
	<svelte:fragment slot="header">
		<ModalButton icon="add">
			<svelte:fragment slot="title">Добавить задание</svelte:fragment>
			<div class="form-layout">
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
			</div>
		</ModalButton>
	</svelte:fragment>

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
</DefaultPage>

<style>
	.form-layout {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.buttons {
		display: flex;
		margin-top: 3rem;
		gap: 0.5rem;
		width: 100%;
	}

	form {
		max-width: 800px;
		width: 100%;
		display: flex;
		flex-direction: column;
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
</style>
