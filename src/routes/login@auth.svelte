<script>
	import GoogleAuth from '$lib/auth/GoogleAuth.svelte';
	import { login } from '$lib/auth/auth';
	import Error from '$lib/Error.svelte';
	import Input from '$lib/Input.svelte';

	let email;
	let password;
	let error;

	const submitHandler = () => login(email, password).then((e) => (error = e));
</script>

<svelte:head>
	<title>С возвращением | Sia HomeWork</title>
</svelte:head>

<h1>С возвращением в Sia HomeWork 👋</h1>
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
		bind:value={email}
		required
	/>

	<Error {error} name="other" />

	<button class="next" type="submit"> Войти </button>
</form>
<a class="forgotten-password" href="/reset">Забыли пароль?</a>

<p>Нет аккаунта? <a href="/signup">Зарегистрироваться</a></p>

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

		background: #ffffff;
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

	.forgotten-password {
		opacity: 0.8;
		font-size: 14px;
	}

	p {
		opacity: 0.8;
		margin-top: 2rem;
		text-align: center;
	}
</style>
