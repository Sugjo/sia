<script>
	import GoogleAuth from '$lib/user/auth/GoogleAuth.svelte';
	import Button from '$lib/generic/Button.svelte';
	import Input from '$lib/generic/Input.svelte';
	import { register } from '$lib/user/auth/auth';

	let email;
	let password;
	let error;

	const submitHandler = async () => (error = await register(email, password));
</script>

<svelte:head>
	<title>Добро пожаловать | Sia HomeWork</title>
</svelte:head>

<h1>Добро пожаловать в Sia HomeWork 👋</h1>
<h2>Пристанище ваших домашних заданй</h2>

<GoogleAuth />

<form class="email" on:submit|preventDefault={submitHandler}>
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

	<Button type="submit">Зарегистрироваться</Button>
</form>

<p>Есть аккаунт? <a href="/auth/signin">Войти</a></p>

<style>
	h1,
	h2 {
		text-align: center;
		font-weight: 400;
	}

	h1 {
		font-size: 24px;
		margin: 0;
	}

	h2 {
		font-size: 14px;
		margin-bottom: 2rem;
	}

	a {
		text-decoration: none;
	}
	.email {
		display: flex;
		flex-direction: column;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	p {
		opacity: 0.8;
		margin-top: 2rem;
		text-align: center;
	}
</style>
