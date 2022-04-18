<script>
	import { passwordReset } from '$lib/auth/auth';

	let email;
	let error;
	const submitHandler = async () => (error = await passwordReset(email));
</script>

<h1>Sia HomeWork</h1>
<h2>Востановление пароля</h2>

<form class="email" on:submit|preventDefault={submitHandler}>
	<label for="email">Email</label>
	<input type="email" name="email" placeholder="Введите свой Email" bind:value={email} required />
	{#if error?.type == 'email'}
		<small class="error-message">{error.message}</small>
	{/if}
	<button class="next" type="submit"> Востановить </button>
</form>

<a href="/login">Назад</a>

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

	.email label {
		font-size: 14px;
		color: #575757;
	}

	.email input,
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

	a {
		opacity: 0.8;
		margin-top: 2rem;
		text-align: center;
		text-decoration: none;
	}
	.error-message {
		color: #f93333;
		margin-bottom: 1rem;
	}
</style>
