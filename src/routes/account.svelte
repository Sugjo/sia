<script>
	import Button from '$lib/generic/Button.svelte';
	import FlyoutButton from '$lib/generic/FlyoutButton.svelte';
	import Hr from '$lib/generic/Hr.svelte';
	import { getContext } from 'svelte';
	import DefaultPage from '$lib/layout/DefaultPage.svelte';
	import { deleteUser, signOut, updateEmail, updatePassword } from 'firebase/auth';
	import { auth } from '$lib/tools/firebase';
	import { settingsToDefault } from '../store/settings.store';
	import { userToDefault } from '../store/user.store';
	import ModalButton from '$lib/generic/ModalButton.svelte';
	import Input from '$lib/generic/Input.svelte';
	import { reauthenticate } from '$lib/tools/reauthenticate';
	import ModalForm from '$lib/layout/ModalForm.svelte';
	import { closeAllModal } from '$lib/tools/closeAllModal';

	const settings = getContext('settings');
	let password;
	let newPassword;
	let newEmail;
	let canSubmit = true;
	let canChangeData;
	let error;

	$: theme = () => {
		if ($settings.theme == 'auto') return 'Авто';
		if ($settings.theme == 'dark') return 'Тёмная';
		if ($settings.theme == 'light') return 'Светлая';
	};

	$: auth.onAuthStateChanged((user) => {
		canChangeData = user?.providerData[0]?.providerId == 'password' ? true : false;
	});

	const autoThemeHandler = () => ($settings.theme = 'auto');
	const darkThemeHandler = () => ($settings.theme = 'dark');
	const lightThemeHandler = () => ($settings.theme = 'light');

	const updateEmailHandler = () => {
		reauthenticate(password)
			.then(() => {
				updateEmail(auth.currentUser, newEmail)
					.then(() => {
						logoutHandler();
					})
					.catch((e) => {
						if (e.code == 'auth/invalid-email')
							error = { input: 'email', message: 'Введите существующий Email' };
						if (e.code == 'auth/email-already-in-use')
							error = { input: 'email', message: 'Email уже используется' };
					});
			})
			.catch((e) => {
				if (e.code == 'auth/wrong-password')
					error = { input: 'password', message: 'Неверный пароль' };
			});
	};

	const updatePasswordHandler = () => {
		reauthenticate(password)
			.then(() => {
				updatePassword(auth.currentUser, newPassword)
					.then(() => {
						logoutHandler();
					})
					.catch((e) => {
						if (e.code == 'auth/weak-password')
							error = { input: 'newPassword', message: 'Пароль слишком простой' };
					});
			})
			.catch((e) => {
				if (e.code == 'auth/wrong-password')
					error = { input: 'password', message: 'Неверный пароль' };
			});
	};

	const deleteUserHandler = () => {
		reauthenticate(password)
			.then(() => {
				deleteUser(auth.currentUser)
					.then(() => {
						logoutHandler();
					})
					.catch((e) => {
						console.log(e);
					});
			})
			.catch((e) => {
				if (e.code == 'auth/wrong-password')
					error = { input: 'password', message: 'Неверный пароль' };
			});
	};

	const logoutHandler = () => {
		signOut(auth);
		settingsToDefault();
		userToDefault();
	};

	const clearAllInputs = () => {
		password = null;
		newPassword = null;
		newEmail = null;
		error = null;
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
		{#if canChangeData}
			<Hr />

			<div class="settings-item">
				<div class="title">Email:</div>
				<ModalButton
					on:close={clearAllInputs}
					title="Изменение Email"
					variant="settings"
					fluid
					mini
				>
					<svelte:fragment slot="button">Изменить</svelte:fragment>
					<ModalForm on:submit={updateEmailHandler}>
						<Input
							label="Новый Email"
							name="email"
							inputType="email"
							placeholder="Введите новый Email"
							bind:value={newEmail}
							required
							{error}
						/>
						<Input
							label="Пароль"
							name="password"
							inputType="password"
							placeholder="Введите пароль"
							bind:value={password}
							required
							{error}
						/>
						<svelte:fragment slot="buttons">
							<Button on:click={closeAllModal} variant="gray" fluid>Отмена</Button>
							<Button type="submit" on:click={updateEmailHandler} disabled={!canSubmit} fluid>
								Изменить
							</Button>
						</svelte:fragment>
					</ModalForm>
				</ModalButton>
			</div>
			<Hr />
			<div class="settings-item">
				<div class="title">Пароль:</div>
				<ModalButton
					on:close={clearAllInputs}
					title="Изменение пароля"
					variant="settings"
					fluid
					mini
				>
					<svelte:fragment slot="button">Изменить</svelte:fragment>
					<ModalForm on:submit={updatePasswordHandler}>
						<Input
							label="Пароль"
							name="password"
							inputType="password"
							placeholder="Введите пароль"
							bind:value={password}
							required
							{error}
						/>
						<Input
							label="Новый пароль"
							name="newPassword"
							inputType="password"
							placeholder="Введите новый пароль"
							bind:value={newPassword}
							required
							{error}
						/>
						<svelte:fragment slot="buttons">
							<Button on:click={closeAllModal} variant="gray" fluid>Отмена</Button>
							<Button type="submit" disabled={!canSubmit} fluid>Изменить</Button>
						</svelte:fragment>
					</ModalForm>
				</ModalButton>
			</div>
		{/if}
		<div class="account-action">
			<Button on:click={logoutHandler} fluid>Выйти</Button>

			<ModalButton on:close={clearAllInputs} title="Удалить аккаунт" variant="attention" fluid mini>
				<svelte:fragment slot="button">Удалить аккаунт</svelte:fragment>
				<ModalForm on:submit={deleteUserHandler}>
					<Input
						label="Пароль"
						name="password"
						inputType="password"
						placeholder="Введите пароль"
						bind:value={password}
						required
						{error}
					/>
					<svelte:fragment slot="buttons">
						<Button on:click={closeAllModal} variant="gray" fluid>Отмена</Button>
						<Button type="submit" disabled={!canSubmit} variant="attention" fluid>Удалить</Button>
					</svelte:fragment>
				</ModalForm>
			</ModalButton>
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
