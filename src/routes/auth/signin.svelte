<script>
	import GoogleAuth from '$lib/user/auth/GoogleAuth.svelte';
	import Error from '$lib/generic/Error.svelte';
	import Input from '$lib/generic/Input.svelte';
	import Button from '$lib/generic/Button.svelte';
	import AuthLayout from '$lib/layout/AuthLayout.svelte';
	import { handle } from '$lib/tools/handle';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/tools/firebase';

	export let error;

	let email;
	let password;

	const submitHandler = async () => {
		const [, e] = await handle(signInWithEmailAndPassword(auth, email, password));

		const errorMessages = {
			'auth/invalid-email': { input: 'email', message: 'Введите существующий Email' },
			'auth/user-not-found': { input: 'other', message: 'Неверный логин или пароль' },
			'auth/wrong-password': { input: 'other', message: 'Неверный логин или пароль' }
		}; //TODO добавить корректные сообщения

		if (e) {
			error = errorMessages[e.code] || {
				input: 'other',
				message: e.message
			};
		}
	};
</script>

<svelte:head>
	<title>С возвращением | Sia HomeWork</title>
</svelte:head>

<AuthLayout on:submit={submitHandler}>
	<svelte:fragment slot="h1">С возвращением в Sia HomeWork 👋</svelte:fragment>
	<svelte:fragment slot="h2">Пристанище ваших домашних заданй</svelte:fragment>
	<GoogleAuth />
	<Input
		label="Email"
		name="email"
		inputType="email"
		placeholder="Введите свой Email"
		{error}
		bind:value={email}
		required
	/>
	<Input
		label="Пароль"
		name="password"
		inputType="password"
		placeholder="Введите пароль"
		{error}
		bind:value={password}
		required
	/>
	<Button type="submit">Войти</Button>
	<Error {error} name="other" />
	<div class="forget-pass">
		<Button href="/auth/reset" variant="link">Забыли пароль?</Button>
	</div>
	<svelte:fragment slot="footer">
		Нет аккаунта? <Button href="/auth/signup" variant="link">Зарегистрироватся</Button>
	</svelte:fragment>
</AuthLayout>

<style>
	.forget-pass {
		display: flex;
	}
</style>
