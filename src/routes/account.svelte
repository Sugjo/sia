<script>
	import Button from '$lib/generic/Button.svelte';
	import FlyoutButton from '$lib/generic/FlyoutButton.svelte';
	import Hr from '$lib/generic/Hr.svelte';
	import { getContext } from 'svelte';
	import DefaultPage from '$lib/layout/DefaultPage.svelte';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/tools/firebase';
	import { settingsToDefault } from '../store/settings.store';
	import { userToDefault } from '../store/user.store';
	import ModalButton from '$lib/generic/ModalButton.svelte';
	import Input from '$lib/generic/Input.svelte';
	import { reauthenticate } from '$lib/tools/reauthenticate';
	import ModalForm from '$lib/layout/ModalForm.svelte';
	import { closeAllModal } from '$lib/tools/closeAllModal';

	const settings = getContext('settings');
	let oldPassword;
	let newPassword;
	let canSubmit = true;

	$: theme = () => {
		if ($settings.theme == 'auto') return 'Авто';
		if ($settings.theme == 'dark') return 'Тёмная';
		if ($settings.theme == 'light') return 'Светлая';
	};

	const autoThemeHandler = () => ($settings.theme = 'auto');
	const darkThemeHandler = () => ($settings.theme = 'dark');
	const lightThemeHandler = () => ($settings.theme = 'light');

	const updateEmailHandler = () => {
		reauthenticate(oldPassword)
			
	};
	const updatePasswordHandler = () => {};
	const deleteUserHandler = () => {};
	const logoutHandler = () => {
		signOut(auth);
		settingsToDefault();
		userToDefault();
	};
	const closeModalHandler = () => {
		oldPassword = null;
		newPassword = null;
		closeAllModal();
	};
</script>

<svelte:head>
	<title>Аккаунт</title>
</svelte:head>

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
			<div class="title">Email:</div>
			<ModalButton title="Изменение Email" variant="settings" fluid mini>
				<svelte:fragment slot="button">Изменить</svelte:fragment>
				<ModalForm on:submit>
					<Input
						label="Пароль"
						name="password"
						inputType="password"
						placeholder="Введите пароль"
						bind:value={oldPassword}
						required
					/>
					<Input
						label="Пароль"
						name="password"
						inputType="password"
						placeholder="Введите новый пароль"
						bind:value={newPassword}
						required
					/>
					<svelte:fragment slot="buttons">
						<Button on:click={closeModalHandler} variant="gray" fluid>Отмена</Button>
						<Button type="submit" on:click={updateEmailHandler} disabled={!canSubmit} fluid
							>Изменить</Button
						>
					</svelte:fragment>
				</ModalForm>
			</ModalButton>
			<!-- <Button on:click={updateEmailHandler} fluid variant="settings">Изменить</Button> -->
		</div>
		<Hr />
		<div class="settings-item">
			<div class="title">Пароль:</div>
			<ModalButton title="Изменение пароля" variant="settings" fluid mini>
				<svelte:fragment slot="button">Изменить</svelte:fragment>
			</ModalButton>
			<!-- <Button on:click={updatePasswordHandler} fluid variant="settings">Изменить</Button> -->
		</div>
		<div class="account-action">
			<Button on:click={logoutHandler} fluid>Выйти</Button>
			<Button on:click={deleteUserHandler} variant="attention" fluid>Удалить аккаунт</Button>
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
