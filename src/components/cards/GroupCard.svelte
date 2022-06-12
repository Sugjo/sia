<script>
	import Button from '$lib/generic/Button.svelte';
	import FlyoutButton from '$lib/generic/FlyoutButton.svelte';
	import { auth } from '$lib/tools/firebase';

	export let icon = '/img/group.png';
	export let userCount = 0;
	export let name;
	export let id;
	export let prewiew = false;

	const delGroupOnUser = async () => {
		if (!auth.currentUser) logout();
		await fetch('/api/groups/on-user-del', {
			method: 'DELETE',
			body: JSON.stringify({ id, uid: auth.currentUser.uid })
		});
	};
</script>

<div class="card">
	<img src={icon} alt="Аватарка группы" />
	<div class="card-body">
		<div class="body-title">
			{name}
		</div>
		<div class="body-title">
			Участников {userCount}
		</div>
	</div>
	<div class="card-footer">
		<FlyoutButton position="left" icon="more_horiz" variant="hidden">
			{#if !prewiew}
				<Button variant="simple" fluid>Изменить</Button>
				<Button on:click={delGroupOnUser} variant="simple" fluid>Выйти</Button>
			{:else}
				<Button variant="simple" fluid>Изменить</Button>
				<Button variant="simple" fluid>Выйти</Button>
			{/if}
		</FlyoutButton>
	</div>
</div>

<style>
	.card {
		display: grid;
		grid-template-columns: min-content 1fr min-content;
	}

	.card img {
		object-fit: cover;
		border-radius: 25px;
		width: 50px;
		height: 50px;
	}

	.card-body {
		margin-left: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.card-footer {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: end;
	}
</style>
