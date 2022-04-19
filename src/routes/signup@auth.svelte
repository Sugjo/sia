<script>
	import GoogleAuth from '$lib/auth/GoogleAuth.svelte';
	import { register } from '$lib/auth/auth';
	import Input from '$lib/Input.svelte';

	let email;
	let password;
	let error;

	const submitHandler = async () => (error = await register(email, password));
</script>

<svelte:head>
	<title>Добро пожаловать | Sia HomeWork</title>
</svelte:head>

<h1>Добро пожаловать в Sia HomeWork 👋</h1>
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

	<button class="next" type="submit"> Зарегистрироваться </button>
</form>

<p>Есть аккаунт? <a href="/login">Войти</a></p>

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

	button {
		height: 40px;

		background-color: #ffffff;
		border: 1px solid #d0d0d0;
		border-radius: 5px;

		padding: 10px;

		margin: 0.5rem 0;
	}

	.next {
		background: rgba(255, 155, 155, 0.29);
		color: #f93333;
		border: 1px solid #f78a8a;
		border-radius: 5px;
	}

	p {
		opacity: 0.8;
		margin-top: 2rem;
		text-align: center;
	}
</style>
