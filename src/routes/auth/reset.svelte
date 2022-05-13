<script>
	import Button from '$lib/generic/Button.svelte';
	import Input from '$lib/generic/Input.svelte';
	import Error from '$lib/generic/Error.svelte';
	import { passwordReset } from '$lib/user/auth/auth';


	let email;
	let error;
	const submitHandler = async () => (error = await passwordReset(email));
</script>

<h1>Востановление пароля 🔏 <br> Sia HomeWork </h1>
<h2>Пристанище ваших домашних заданй</h2>

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

	<Error name="other" {error} />
	<Button type="submit"> Востановить </Button>
</form>

<a href="/auth/signin">Назад</a>

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

	.email {
		display: flex;
		flex-direction: column;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	a {
		opacity: 0.8;
		margin-top: 2rem;
		text-align: center;
		text-decoration: none;
	}
</style>
