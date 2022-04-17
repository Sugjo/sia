<script>
	import GoogleAuth from '$lib/auth/GoogleAuth.svelte';
	import { register } from '$lib/auth/auth';

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
	<label for="email">Email</label>
	<input
		type="email"
		name="email"
		class:error={error?.type == 'email'}
		class="input"
		placeholder="Введите свой Email"
		required
		bind:value={email}
	/>
	{#if error?.type == 'email'}
		<span class="error-message">{error.message}</span>
	{/if}
	<label for="password">Пароль</label>
	<input
		type="password"
		name="password"
		class:error={error?.type == 'password'}
		class="input"
		placeholder="Введите пароль"
		required
		bind:value={password}
	/>
	{#if error?.type == 'password'}
		<span class="error-message">{error.message}</span>
	{/if}
	<button class="next" type="submit"> Зарегистрироваться </button>

	{#if error?.type == 'other'}
		<span class="error-message">{error.message}</span>
	{/if}
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

	.email label {
		font-size: 14px;
		color: #575757;
	}

	.input,
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

	.error {
		background-color: #ffe2e2;
		border: 1px #f78a8a solid;
		color: #f93333;
	}

	.error::placeholder {
		color: #f93333;
	}

	.error-message {
		color: #f93333;
		margin-bottom: 1rem;
	}
</style>
