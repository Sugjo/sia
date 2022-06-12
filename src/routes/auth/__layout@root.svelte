<main>
	<section>
		<slot />
		<p class="about">Sia HomeWork - OpenSource соцсеть для домашних заданий и учебы</p>
	</section>
</main>

<style>
	main {
		grid-area: main;
	}

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
		color: var(--text-muted);
	}

	:global(body) {
		grid-template-rows: min-content 1fr;
	}

	:global(body main) {
		display: flex;
		justify-content: center;
	}
</style>
