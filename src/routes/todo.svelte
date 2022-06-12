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
	import DataOrMessage from '$lib/layout/DataOrMessage.svelte';
	import ModalForm from '$lib/layout/ModalForm.svelte';

	//Get ToDo data

	export let todoCb;

	todoCb((e) => {
		if (e) {
			todoData = Object.keys(e).map((key) => {
				return { id: key, ...e[key] };
			});
		}
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

<svelte:head>
	<title>Задания</title>
</svelte:head>

<DefaultPage title="Задания">
	<svelte:fragment slot="header">
		<ModalButton icon="add" title="Добавить задание">
			<ModalForm on:submit={createTodo}>
				<Input bind:value={name} label="Название задания" isFocus required />
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
		<Button fluid variant="simple" on:click={createTodo}>Все</Button>
		<Hr />
		<Button fluid variant="simple">Личные</Button>
		<Hr />
		<Button fluid variant="simple">Из групп</Button>
	</FlyoutButton>

	<div class="content">
		<DataOrMessage {isLoad} data={todoData} message="Заданий нет!">
			{#each todoData as { id, name, from, text, isChecked }}
				<TodoCard {id} {name} {from} {text} {isChecked} />
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
