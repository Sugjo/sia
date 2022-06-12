<script>
	import { logout } from '$lib/user/auth/auth'; //TODO refactoring
	import Button from '$lib/generic/Button.svelte';
	import FlyoutButton from '$lib/generic/FlyoutButton.svelte';
	import Hr from '$lib/generic/Hr.svelte';
	import { getContext } from 'svelte';
	import DefaultPage from '$lib/layout/DefaultPage.svelte';

	const settings = getContext('settings');

	$: theme = () => {
		if ($settings.theme == 'auto') return 'Авто';
		if ($settings.theme == 'dark') return 'Тёмная';
		if ($settings.theme == 'light') return 'Светлая';
	};

	const autoThemeHandler = () => ($settings.theme = 'auto');
	const darkThemeHandler = () => ($settings.theme = 'dark');
	const lightThemeHandler = () => ($settings.theme = 'light');
</script>

<DefaultPage title="Аккаунт">
	<div class="settings">
		<div class="settings-item">
			<div class="title">Тема:</div>
			<FlyoutButton fluid variant="settings">
				<svelte:fragment slot="button">{theme()}</svelte:fragment>
				<Button fluid variant="simple" on:click={autoThemeHandler}>Авто</Button>
				<Hr />
				<Button fluid variant="simple" on:click={darkThemeHandler}>Тёмная</Button>
				<Hr />
				<Button fluid variant="simple" on:click={lightThemeHandler}>Светлая</Button>
			</FlyoutButton>
		</div>
		<Hr />
		<div class="settings-item">
			<div class="title">Отображаемое имя:</div>
			<Button fluid variant="settings">Изменить</Button>
		</div>
		<Hr />
		<div class="settings-item">
			<div class="title">Аватар:</div>
			<Button fluid variant="settings">Изменить</Button>
		</div>
		<Hr />

		<div class="settings-item">
			<div class="title">Email:</div>
			<Button fluid variant="settings">Изменить</Button>
		</div>
		<Hr />
		<div class="settings-item">
			<div class="title">Пароль:</div>
			<Button fluid variant="settings">Изменить</Button>
		</div>
		<Hr />

		<div class="account-action">
			<Button fluid on:click={logout}>Выйти</Button>
			<Button fluid>Удалить аккаунт</Button>
		</div>
	</div>
</DefaultPage>

<style>
	.settings {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		width: 100%;
		padding: 1rem;
		grid-area: settings;
	}

	.settings-item {
		display: grid;
		align-items: center;
		grid-template-columns: 1fr 100px;
	}

	.account-action {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 4rem;
	}
</style>
