<script context="module">
	import { getRedirectResult } from 'firebase/auth';
	import { auth } from '$lib/tools/firebase';
	import { handle } from '$lib/tools/handle';

	export const load = async () => {
		let [redirectHandler, redirectError] = await handle(getRedirectResult(auth));

		return {
			props: {
				error: redirectError || ''
			}
		};
	};
</script>

<script>
	import GoogleAuth from '$lib/user/auth/GoogleAuth.svelte';
	import Error from '$lib/generic/Error.svelte';
	import Input from '$lib/generic/Input.svelte';
	import Button from '$lib/generic/Button.svelte';
	
	export let error;

	let email;
	let password;

	const submitHandler = async () => {
		try {
			const res = await fetch('/auth/signin', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.ok) {
			}
		} catch (err) {
			error = err;
		}
	};
</script>

<svelte:head>
	<title>С возвращением | Sia HomeWork</title>
</svelte:head>

<h1>С возвращением в Sia HomeWork 👋</h1>
<h2>Пристанище ваших домашних заданй</h2>

<GoogleAuth />

<section>
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

		<Error {error} name="other" />

		<Button type="submit">Войти</Button>
	</form>
	<a class="forgotten-password" href="/auth/reset">Забыли пароль?</a>
</section>

<p>Нет аккаунта? <a href="/auth/signup">Зарегистрироваться</a></p>

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

	section,
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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
