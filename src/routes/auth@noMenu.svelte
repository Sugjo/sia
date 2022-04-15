<script>
	import { getContext } from 'svelte';
	import { auth, provider } from '$lib/auth/firebase';
	import { signInWithPopup } from 'firebase/auth';
	import { app } from '../store/app.store';
	import { goto } from '$app/navigation';

	const settings = getContext('settings');

	function signInWithGoogle() {
		signInWithPopup(auth, provider)
			.then((e) => ($app.user = e.user))
			.then(() => {
				goto('/home');
			});
	}

	if ($app.user) goto('/');
</script>

<svelte:head>
	<title>Добро пожаловать | Sia HomeWork</title>
</svelte:head>

<section>
	<h1>Добро пожаловать в Sia HomeWork 👋</h1>
	<h2>Пристанище ваших домашних заданй</h2>
	<button class="button-google" on:click={signInWithGoogle}>
		<img src="/img/google.png" alt="" width="15" height="15" /> Продолжить с помощю Google
	</button>
	<div class="or">или</div>

	<form class="email" on:submit|preventDefault>
		<label for="email">Email</label>
		<input type="email" name="email" placeholder="Введите свой Email" />
		<button class="next"> Продолжить </button>
	</form>
	<a class="forgotten-password" href="##">Забыли пароль?</a>

	<p class="about">Sia HomeWork - OpenSource соцсеть для домашних заданий и учебы</p>
</section>

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

	section {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;

		max-width: 500px;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;

		padding: 0.5rem;
	}

	.button-google {
		background-color: #fff;
		border-color: #000;
		border-width: 1px;
		border-radius: 5px;
	}

	.or {
		display: flex;
		align-items: center;
		margin: 1rem 0;
	}

	.or::before {
		content: '';
		height: 1px;
		width: 100%;
		border-bottom: 1px #000 solid;
		margin-right: 30px;
	}

	.or::after {
		content: '';
		height: 1px;
		width: 100%;
		border-bottom: 1px #000 solid;
		margin-left: 30px;
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

	.forgotten-password {
		color: #1179b4;
		font-size: 14px;
	}

	.about {
		margin-top: 4rem;
		font-size: 14px;
		text-align: center;
		color: #646464;
	}
</style>
