<script context="module">
	import { auth, db } from '$lib/user/firebase';
	import { doc, getDoc } from 'firebase/firestore';
</script>

<script>
	import Button from '$lib/generic/Button.svelte';
	import GroupCard from '$lib/cards/GroupCard.svelte';
	import ModalButton from '$lib/generic/ModalButton.svelte';
	import Input from '$lib/generic/Input.svelte';
	import { closeAllModal } from '$lib/tools/closeAllModal';
	import DefaultPage from '$lib/layout/DefaultPage.svelte';

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
		}
	};
</script>

<DefaultPage title="Группы">
	<svelte:fragment slot="header">
		<ModalButton icon="add">
			<svelte:fragment slot="title">Создание группы</svelte:fragment>
			<div class="form-layout">
				<form on:submit|preventDefault>
					<div class="avatar">
						<GroupCard
							icon={checkURL(imgUrl) || 'http://cdn.onlinewebfonts.com/svg/img_218950.png'}
							userCount="много"
							name={name || 'Ваше название группы'}
							prewiew
						/>
					</div>
					<Input type="text" label="Название" bind:value={name} required />
					<Input type="url" label="Ссылка на аватарку группы" bind:value={imgUrl} required />
					<div class="buttons">
						<Button on:click={closeModalHandler} variant="secondary" fluid>Отмена</Button>
						<Button type="submit" disabled={!canSubmit} fluid>Создать</Button>
					</div>
				</form>
			</div>
		</ModalButton>
	</svelte:fragment>

	<div class="groups">
		{#if groupsData}
			{#each groupsData as { icon, userCount, name, id }}
				<GroupCard {icon} {userCount} {name} {id} />
			{/each}
		{:else if isLoad}
			Загрузка...
		{:else}
			У вас нет подписок! Попросите добавить вас в группу, или созадйте свою.
		{/if}
	</div>
</DefaultPage>

<style>
	form {
		max-width: 800px;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

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

	.avatar {
		margin-bottom: 3rem;
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
