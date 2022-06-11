<script>
	import Button from '$lib/generic/Button.svelte';
	import FlyoutButton from '$lib/generic/FlyoutButton.svelte';
	import Hr from '$lib/generic/Hr.svelte';
	import { getContext } from 'svelte';

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

<section>
	<div class="container navigation">
		<h1>Настройки</h1>
	</div>
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

		<div class="delete-account">
			<Button fluid variant="primary">Удалить аккаунт</Button>
		</div>
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
			'settings';
		gap: 1rem;
	}

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

	.delete-account {
		margin-top: 4rem;
	}

	.navigation {
		grid-area: navigation;
		display: flex;
		justify-content: space-between;
	}

	h1 {
		margin: 0;
	}
</style>
