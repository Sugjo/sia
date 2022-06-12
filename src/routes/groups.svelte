<script context="module">
	import { auth, db } from '$lib/tools/firebase';
	import { doc, getDoc } from 'firebase/firestore';
</script>

<script>
	import Button from '$lib/generic/Button.svelte';
	import GroupCard from '$lib/cards/GroupCard.svelte';
	import ModalButton from '$lib/generic/ModalButton.svelte';
	import Input from '$lib/generic/Input.svelte';
	import { closeAllModal } from '$lib/tools/closeAllModal';
	import DefaultPage from '$lib/layout/DefaultPage.svelte';
	import DataOrMessage from '$lib/layout/DataOrMessage.svelte';
	import ModalForm from '$lib/layout/ModalForm.svelte';

	let isLoad = false;
	let canSubmit = true;
	let groupsData;
	let name;
	let imgUrl;

	$: console.log(groupsData);
	const closeModalHandler = () => {
		name = null;
		imgUrl = null;
		closeAllModal();
	};

	const checkURL = (url) => {
		if (url?.match(/\.(jpeg|jpg|gif|png)$/) != null) {
			return url;
		} else {
			return 'http://cdn.onlinewebfonts.com/svg/img_218950.png';
		}
	};
</script>

<DefaultPage title="Группы">
	<svelte:fragment slot="header">
		<ModalButton icon="add" title="Создание группы">
			<ModalForm>
				<div class="avatar">
					<GroupCard
						icon={checkURL(imgUrl)}
						userCount="много"
						name={name || 'Ваше название группы'}
						prewiew
					/>
				</div>
				<Input type="text" label="Название" bind:value={name} required />
				<Input type="url" label="Ссылка на аватарку группы" bind:value={imgUrl} required />
				<svelte:fragment slot="buttons">
					<Button on:click={closeModalHandler} variant="gray" fluid>Отмена</Button>
					<Button type="submit" disabled={!canSubmit} fluid>Создать</Button>
				</svelte:fragment>
			</ModalForm>
		</ModalButton>
	</svelte:fragment>

	<div class="content">
		<DataOrMessage
			message="У вас нет подписок! Попросите добавить вас в группу, или созадйте свою."
			data={groupsData}
			{isLoad}
		>
			{#each groupsData as { icon, userCount, name, id }}
				<GroupCard {icon} {userCount} {name} {id} />
			{/each}
		</DataOrMessage>
	</div>
</DefaultPage>

<style>
	.avatar {
		margin-bottom: 3rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		padding: 1rem;
	}
</style>
