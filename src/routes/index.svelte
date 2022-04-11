<script>
	import { getContext } from 'svelte';
	const settings = getContext('settings');
</script>

<section>
	<h1>Добро пожаловать в Sia HomeWork 👋</h1>
	<h2>Пристанище ваших домашних заданй</h2>
	<button class="button-google">
		<img src="/img/google.png" alt="" width="15" height="15" /> Продолжить с помощю Google
	</button>
	<div class="or">
		или
	</div>
</section>

<style>
	h1,
	h2 {
		text-align: center;
	}

	h1 {
		font-size: 24px;
		font-weight: 400;
	}

	h2 {
		font-size: 14px;
		font-weight: 400;
	}

	section {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 30px;
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

	.button-google:focus {
		background-color: tomato;
	}

	.button-google:hover {
		background-color: tomato;
	}

	.or {
		display: flex;
		align-items: center;
		margin: 1rem 0;
	}

	.or::before {
		content: "";
		height: 1px;
		width: 100%;
		border-bottom: 1px #000 solid;
		margin-right: 30px;
	}

	.or::after {
		content: "";
		height: 1px;
		width: 100%;
		border-bottom: 1px #000 solid;
		margin-left: 30px;
	}


</style>
