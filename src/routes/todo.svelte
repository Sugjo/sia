<script context="module">
	import { auth, db } from '$lib/tools/firebase';
	import { getDatabase, onValue } from 'firebase/database';
	import { ref } from 'firebase/database';
	import { doc, getDoc } from 'firebase/firestore';

	export const load = async () => {
		function getTodos(cb = () => {}) {
			auth.onAuthStateChanged(async (user) => {
				if (!user?.uid) return;

				const userRef = await getDoc(doc(db, 'users', user.uid));
				const todoRef = ref(getDatabase(), 'todo/');
				let placesId = [user.uid];

				for await (const group of userRef.data().groups) {
					placesId.push(group.id);
				}

				onValue(todoRef, async (todosData) => {
					let allTodosData;

					for await (const placeId of placesId) {
						let todoData = todosData.child(placeId).val();
						Object.keys(todoData).map((key) => {
							todoData[key]['placeId'] = placeId;
						});
						allTodosData = { ...allTodosData, ...todoData };
					}

					cb(
						Object.keys(allTodosData).map((key) => {
							return {
								id: key,
								...allTodosData[key]
							};
						})
					);
				});
			});
		}

		return {
			props: {
				getTodos
			}
		};
	};
</script>

<script>
	import Button from '$lib/generic/Button.svelte';
	import TodoCard from '$lib/cards/TodoCard.svelte';
	import FlyoutButton from '$lib/generic/FlyoutButton.svelte';
	import ModalButton from '$lib/generic/ModalButton.svelte';
	import MdEditor from '$lib/generic/MdEditor.svelte';
	import Input from '$lib/generic/Input.svelte';
	import { closeAllModal } from '$lib/tools/closeAllModal';
	import DefaultPage from '$lib/layout/DefaultPage.svelte';
	import DataOrMessage from '$lib/layout/DataOrMessage.svelte';
	import ModalForm from '$lib/layout/ModalForm.svelte';

	//Get ToDo data

	export let getTodos;

	let todoData;

	let name;
	let text;
	let from = 'Gparty';

	let isLoad = true;
	let canSubmit = true;

	getTodos((e) => {
		if (e) todoData = e;
		isLoad = false;
	});

	const createTodoHandler = async (id) => {
		if (!auth.currentUser) return;
		canSubmit = false;
		await fetch('/api/todo/add', {
			method: 'POST',
			body: JSON.stringify({
				id: auth.currentUser.uid,
				name,
				from,
				text: text || null
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

<svelte:head>
	<title>Задания</title>
</svelte:head>

<DefaultPage title="Задания">
	<svelte:fragment slot="header">
		<ModalButton icon="add" title="Добавить задание">
			<ModalForm on:submit={createTodoHandler}>
				<Input bind:value={name} label="Название задания" isFocus required />
				<FlyoutButton fluid>
					<svelte:fragment slot="button">Все</svelte:fragment>
					<Button fluid variant="simple">Все</Button>
					<Button fluid variant="simple">Личные</Button>
					<Button fluid variant="simple">Из групп</Button>
				</FlyoutButton>
				<MdEditor on:change={(e) => (text = e.detail)} />
				<svelte:fragment slot="buttons">
					<Button on:click={closeModalHandler} variant="gray" fluid>Отмена</Button>
					<Button type="submit" disabled={!canSubmit} fluid>Создать</Button>
				</svelte:fragment>
			</ModalForm>
		</ModalButton>
	</svelte:fragment>

	<FlyoutButton fluid>
		<svelte:fragment slot="button">Все</svelte:fragment>
		<Button fluid variant="simple">Все</Button>
		<Button fluid variant="simple">Личные</Button>
		<Button fluid variant="simple">Из групп</Button>
	</FlyoutButton>

	<div class="content">
		<DataOrMessage {isLoad} data={todoData} message="Заданий нет!">
			{#each todoData as { id, name, from, text, checkedData, placeId }}
				<TodoCard {id} {name} {from} {text} {checkedData} {placeId} />
			{/each}
		</DataOrMessage>
	</div>
</DefaultPage>

<style>
	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		padding: 1rem;
	}
</style>
