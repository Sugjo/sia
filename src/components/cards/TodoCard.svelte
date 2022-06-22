<script>
	import { auth } from '$lib/tools/firebase';
	import Button from '$lib/generic/Button.svelte';
	import FlyoutButton from '$lib/generic/FlyoutButton.svelte';
	import ModalButton from '$lib/generic/ModalButton.svelte';
	import { onDestroy } from 'svelte';
	import Input from '$lib/generic/Input.svelte';
	import ModalForm from '$lib/layout/ModalForm.svelte';
	import MdEditor from '$lib/generic/MdEditor.svelte';

	export let id;
	export let placeId;
	export let name;
	export let from;
	export let text;
	export let checkedData = [];

	$: isChecked = checkedData?.includes(auth.currentUser.uid);

	let isExpanded = false;
	let flyout;

	const checkHandler = async () => {
		auth.onAuthStateChanged(async (user) => {
			if (!user?.uid) return;
			const check = await fetch('/api/todo/check', {
				method: 'POST',
				body: JSON.stringify({ uid: user.uid, path: `todo/${placeId}/${id}` })
			});

			if (check.ok) {
				const checkState = await check.json();
				checkedData = checkState.message;
			}
		});
	};

	const showMore = () => (isExpanded = !isExpanded);

	const deleteHandler = async () => {
		auth.onAuthStateChanged(async (user) => {
			if (!user?.uid) return;
			fetch('/api/todo/delete', {
				method: 'DELETE',
				body: JSON.stringify({ id, uid: user.uid })
			});
		});
	};
</script>

<div class="card" class:isChecked>
	<div class="check" on:click={checkHandler}>
		{#if isChecked}
			<span class="material-icons-outlined"> check_box </span>
		{:else}
			<span class="material-icons-outlined"> check_box_outline_blank </span>
		{/if}
	</div>
	<div class="card-body">
		<div class="body-title">
			{name} из <span>{from}</span>
		</div>
		<div class="text {!isExpanded ? 'close' : ''}" style={text ? '' : 'visibility: hidden'}>
			{@html text || ''}
		</div>
	</div>
	<Button
		on:click={showMore}
		variant="hidden"
		icon={isExpanded ? 'expand_less' : 'expand_more'}
		fluid={false}
	/>

	<FlyoutButton position="left" icon="more_horiz" variant="hidden" bind:this={flyout}>
		<ModalButton title="Изменение задания" variant="simple" fluid>
			<svelte:fragment slot="button">Изменить</svelte:fragment>
			<ModalForm on:submit>
				<Input bind:value={name} label="Название задания" isFocus required />
				<FlyoutButton fluid>
					<svelte:fragment slot="button">Все</svelte:fragment>
					<Button fluid variant="simple">Все</Button>
					<Button fluid variant="simple">Личные</Button>
					<Button fluid variant="simple">Из групп</Button>
				</FlyoutButton>
				<MdEditor on:change={(e) => (text = e.detail)} />
				<svelte:fragment slot="buttons">
					<Button variant="gray" fluid>Отмена</Button>
					<Button type="submit" fluid>Изменить</Button>
				</svelte:fragment>
			</ModalForm>
		</ModalButton>
		<Button on:click={deleteHandler} variant="simple" fluid>Удалить</Button>
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
		color: var(--primary-color);
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

	.text {
		overflow-wrap: anywhere;
	}

	.isChecked .card-body {
		text-decoration: line-through;
	}

	.isChecked {
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
		color: var(--primary-color);
	}

	.material-icons-outlined:hover {
		color: var(--primary-color--hover);
	}
</style>
