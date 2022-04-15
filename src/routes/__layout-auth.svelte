<script>
	import Header from '$lib/Header.svelte';
	import ThemeSwitsh from '$lib/ThemeSwitsh.svelte';
	import { google } from "$lib/auth/auth";
	import { settings } from '../store/settings.store';
	import { setContext } from 'svelte';
	import { app } from '../store/app.store';
	import { goto } from '$app/navigation';

	setContext('settings', settings);

	if ($app.loggedIn) goto('/');
</script>

<ThemeSwitsh />

<Header />

<svelte:head>
	<title>Добро пожаловать | Sia HomeWork</title>
</svelte:head>

<main>
	<section>
		<h1>Добро пожаловать в Sia HomeWork 👋</h1>
		<h2>Пристанище ваших домашних заданй</h2>
		<button class="button-google" on:click={google}>
			<img src="/img/google.png" alt="" width="15" height="15" /> Продолжить с помощю Google
		</button>
		<div class="or">или</div>

		<slot />

		<p class="about">Sia HomeWork - OpenSource соцсеть для домашних заданий и учебы</p>
	</section>
</main>

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

	.about {
		margin-top: 4rem;
		font-size: 14px;
		text-align: center;
		color: #646464;
	}

	main {
		grid-area: main;
	}

	:global(body) {
		grid-template-rows: min-content 1fr;
	}
</style>
