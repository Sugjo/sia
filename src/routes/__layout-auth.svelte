<script>
	import Header from '$lib/Header.svelte';
	import ThemeSwitsh from '$lib/ThemeSwitsh.svelte';
	import { settings } from '../store/settings.store';
	import { setContext } from 'svelte';
	import { app } from '../store/app.store';
	import { goto } from '$app/navigation';

	setContext('settings', settings);

	if ($app.loggedIn) goto('/');
</script>

<ThemeSwitsh />

<Header />

<main>
	<section>
		
		<slot />

		<p class="about">Sia HomeWork - OpenSource соцсеть для домашних заданий и учебы</p>
	</section>
</main>

<style>

	section {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;

		max-width: 500px;
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
